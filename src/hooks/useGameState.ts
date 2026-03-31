"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GameState,
  ResourceId,
  Issue,
  ISSUE_TEMPLATES,
  CHAOS_TEMPLATES,
  UPGRADES,
} from "@/lib/gameTypes";

function makeIssue(id: string, patienceBonus: number, chaos: number): Issue {
  // 혼란도가 40 이상이면 혼란 안건이 30% 확률로 섞임
  const isChaos = chaos >= 40 && Math.random() < (chaos / 100) * 0.6;
  const pool = isChaos ? CHAOS_TEMPLATES : ISSUE_TEMPLATES;
  const template = pool[Math.floor(Math.random() * pool.length)];
  // 혼란 안건은 patience 짧게
  const maxPatience = isChaos
    ? 60 + patienceBonus * 10
    : 100 + patienceBonus * 20;
  return {
    id,
    title: template.title,
    emoji: template.emoji,
    department: template.department,
    requiredResources: template.requiredResources,
    reward: template.baseReward,
    patience: maxPatience,
    maxPatience,
  };
}

function initialState(): GameState {
  return {
    phase: "intro",
    approval: 50,
    chaos: 60,        // 전 총장 유산으로 이미 혼란도 높음
    term: 1,
    resolved: 0,
    failed: 0,
    totalResolved: 0,
    issues: [],
    assembly: [],
    upgradeLevels: { patience: 0, bonus: 0, queue: 0 },
    termTarget: 5,
    maxTerms: 4,      // 4학기(임기) 버티면 엔딩
  };
}

let issueCounter = 10;

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Patience tick
  useEffect(() => {
    if (state.phase !== "playing") {
      if (tickRef.current) clearInterval(tickRef.current);
      return;
    }

    tickRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;

        let newFailed = prev.failed;
        let newChaos = prev.chaos;

        const updatedIssues = prev.issues
          .map((issue) => ({ ...issue, patience: issue.patience - 1 }))
          .filter((issue) => {
            if (issue.patience <= 0) {
              newFailed += 1;
              // 혼란 안건 미처리 시 혼란도 급등
              if (issue.department === "전 총장 유산") {
                newChaos = Math.min(100, newChaos + 8);
              } else {
                newChaos = Math.min(100, newChaos + 3);
              }
              return false;
            }
            return true;
          });

        const maxQueue = 2 + (prev.upgradeLevels.queue ?? 0);
        while (updatedIssues.length < maxQueue) {
          updatedIssues.push(makeIssue(`i${issueCounter++}`, prev.upgradeLevels.patience ?? 0, newChaos));
        }

        return { ...prev, issues: updatedIssues, failed: newFailed, chaos: newChaos };
      });
    }, 200);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.phase]);

  const startGame = useCallback(() => {
    const chaos = 60;
    const maxQueue = 2;
    const startIssues: Issue[] = [];
    for (let i = 0; i < maxQueue; i++) {
      startIssues.push(makeIssue(`start${i}`, 0, chaos));
    }
    setState((prev) => ({ ...prev, phase: "playing", issues: startIssues }));
  }, []);

  const addResource = useCallback((id: ResourceId) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      return { ...prev, assembly: [...prev.assembly, id] };
    });
  }, []);

  const removeLastResource = useCallback(() => {
    setState((prev) => ({ ...prev, assembly: prev.assembly.slice(0, -1) }));
  }, []);

  const clearAssembly = useCallback(() => {
    setState((prev) => ({ ...prev, assembly: [] }));
  }, []);

  const resolveIssue = useCallback((issueId: string) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const issue = prev.issues.find((i) => i.id === issueId);
      if (!issue) return prev;

      const match =
        prev.assembly.length === issue.requiredResources.length &&
        prev.assembly.every((r, i) => r === issue.requiredResources[i]);
      if (!match) return prev;

      const bonusLevel = prev.upgradeLevels.bonus ?? 0;
      const earned = issue.reward + bonusLevel * 5;
      const newResolved = prev.resolved + 1;
      const newApproval = Math.min(100, prev.approval + earned);
      // 안건 처리 시 혼란도 감소
      const chaosReduction = issue.department === "전 총장 유산" ? 10 : 3;
      const newChaos = Math.max(0, prev.chaos - chaosReduction);

      const remaining = prev.issues.filter((i) => i.id !== issueId);
      remaining.push(makeIssue(`i${issueCounter++}`, prev.upgradeLevels.patience ?? 0, newChaos));

      const goShop = newResolved >= prev.termTarget;
      const isLastTerm = prev.term >= prev.maxTerms;

      return {
        ...prev,
        approval: newApproval,
        chaos: newChaos,
        resolved: newResolved,
        totalResolved: prev.totalResolved + 1,
        issues: goShop ? [] : remaining,
        assembly: [],
        phase: goShop ? (isLastTerm ? "ending" : "shop") : "playing",
      };
    });
  }, []);

  const buyUpgrade = useCallback((upgradeId: string) => {
    setState((prev) => {
      const upgrade = UPGRADES.find((u) => u.id === upgradeId);
      if (!upgrade) return prev;
      const currentLevel = prev.upgradeLevels[upgradeId] ?? 0;
      const cost = upgrade.cost * (currentLevel + 1);
      if (prev.approval < cost || currentLevel >= upgrade.maxLevel) return prev;
      return {
        ...prev,
        approval: prev.approval - cost,
        upgradeLevels: { ...prev.upgradeLevels, [upgradeId]: currentLevel + 1 },
      };
    });
  }, []);

  const nextTerm = useCallback(() => {
    setState((prev) => {
      const newTerm = prev.term + 1;
      const newTarget = prev.termTarget + 2;
      const maxQueue = 2 + (prev.upgradeLevels.queue ?? 0);
      const newIssues: Issue[] = [];
      for (let i = 0; i < maxQueue; i++) {
        newIssues.push(makeIssue(`t${newTerm}i${i}`, prev.upgradeLevels.patience ?? 0, prev.chaos));
      }
      return {
        ...prev,
        phase: "playing",
        term: newTerm,
        resolved: 0,
        failed: 0,
        termTarget: newTarget,
        issues: newIssues,
        assembly: [],
      };
    });
  }, []);

  const restart = useCallback(() => {
    issueCounter = 10;
    setState(initialState());
  }, []);

  return {
    state,
    startGame,
    addResource,
    removeLastResource,
    clearAssembly,
    resolveIssue,
    buyUpgrade,
    nextTerm,
    restart,
  };
}
