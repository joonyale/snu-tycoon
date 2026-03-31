"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GameState,
  ResourceId,
  Issue,
  ISSUE_TEMPLATES,
  UPGRADES,
} from "@/lib/gameTypes";

function makeIssue(id: string, patienceBonus: number): Issue {
  const template = ISSUE_TEMPLATES[Math.floor(Math.random() * ISSUE_TEMPLATES.length)];
  const maxPatience = 100 + patienceBonus * 20;
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
    phase: "playing",
    approval: 50,
    term: 1,
    resolved: 0,
    failed: 0,
    totalResolved: 0,
    issues: [makeIssue("i0", 0), makeIssue("i1", 0)],
    assembly: [],
    upgradeLevels: { patience: 0, bonus: 0, queue: 0 },
    termTarget: 5,
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
        const updatedIssues = prev.issues
          .map((issue) => ({ ...issue, patience: issue.patience - 1 }))
          .filter((issue) => {
            if (issue.patience <= 0) {
              newFailed += 1;
              return false;
            }
            return true;
          });

        const maxQueue = 2 + (prev.upgradeLevels.queue ?? 0);
        while (updatedIssues.length < maxQueue) {
          updatedIssues.push(makeIssue(`i${issueCounter++}`, prev.upgradeLevels.patience ?? 0));
        }

        return { ...prev, issues: updatedIssues, failed: newFailed };
      });
    }, 200);

    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state.phase]);

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

      const remaining = prev.issues.filter((i) => i.id !== issueId);
      remaining.push(makeIssue(`i${issueCounter++}`, prev.upgradeLevels.patience ?? 0));

      const goShop = newResolved >= prev.termTarget;

      return {
        ...prev,
        approval: newApproval,
        resolved: newResolved,
        totalResolved: prev.totalResolved + 1,
        issues: goShop ? [] : remaining,
        assembly: [],
        phase: goShop ? "shop" : "playing",
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
      const newTarget = prev.termTarget + 3;
      const maxQueue = 2 + (prev.upgradeLevels.queue ?? 0);
      const newIssues: Issue[] = [];
      for (let i = 0; i < maxQueue; i++) {
        newIssues.push(makeIssue(`t${newTerm}i${i}`, prev.upgradeLevels.patience ?? 0));
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
    addResource,
    removeLastResource,
    clearAssembly,
    resolveIssue,
    buyUpgrade,
    nextTerm,
    restart,
  };
}
