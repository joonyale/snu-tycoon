"use client";

import { useGameState } from "@/hooks/useGameState";
import GameHeader from "@/components/GameHeader";
import IssueCard from "@/components/CustomerCard";
import ResourcePanel from "@/components/Kitchen";
import UpgradeShop from "@/components/UpgradeShop";
import IntroScreen from "@/components/IntroScreen";
import EndingScreen from "@/components/EndingScreen";

export default function Home() {
  const {
    state,
    startGame,
    addResource,
    removeLastResource,
    clearAssembly,
    resolveIssue,
    buyUpgrade,
    nextTerm,
    restart,
  } = useGameState();

  if (state.phase === "intro") return <IntroScreen onStart={startGame} />;
  if (state.phase === "ending") return <EndingScreen state={state} onRestart={restart} />;
  if (state.phase === "shop") return <UpgradeShop state={state} onBuy={buyUpgrade} onNextTerm={nextTerm} />;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <GameHeader state={state} />

      <div className="flex-1 grid grid-cols-[1fr_340px] gap-6 p-6 max-w-5xl mx-auto w-full">
        <div>
          <h2 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-3">
            결재 대기 안건
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {state.issues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                assembly={state.assembly}
                onResolve={resolveIssue}
              />
            ))}
          </div>
        </div>

        <ResourcePanel
          assembly={state.assembly}
          onAdd={addResource}
          onRemoveLast={removeLastResource}
          onClear={clearAssembly}
        />
      </div>
    </div>
  );
}
