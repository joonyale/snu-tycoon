import { GameState } from "@/lib/gameTypes";

export default function GameHeader({ state }: { state: GameState }) {
  const progress = Math.min(state.resolved / state.termTarget, 1);
  const approvalColor = state.approval >= 70 ? "text-green-300" : state.approval >= 40 ? "text-yellow-300" : "text-red-300";
  const chaosColor = state.chaos >= 70 ? "text-red-400" : state.chaos >= 40 ? "text-yellow-300" : "text-green-300";
  const chaosBarColor = state.chaos >= 70 ? "bg-red-500" : state.chaos >= 40 ? "bg-yellow-400" : "bg-green-400";

  return (
    <header className="bg-blue-900 text-white px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏫</span>
          <div>
            <div className="font-bold text-base leading-tight">서울대 총장 타이쿤</div>
            <div className="text-blue-300 text-xs">Seoul National University President Simulator</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-xs opacity-75">임기</div>
            <div className="font-bold">{state.term}/{state.maxTerms}기</div>
          </div>

          <div className="text-center min-w-[130px]">
            <div className="text-xs opacity-75 mb-1">목표: {state.resolved}/{state.termTarget}건</div>
            <div className="w-full h-1.5 bg-blue-800 rounded-full">
              <div className="h-1.5 bg-green-400 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs opacity-75">📣 지지율</div>
            <div className={`font-bold ${approvalColor}`}>{state.approval}%</div>
          </div>

          {/* 혼란도 */}
          <div className="text-center min-w-[100px]">
            <div className="text-xs opacity-75 mb-1">
              🌀 혼란도 <span className={`font-bold ${chaosColor}`}>{state.chaos}%</span>
            </div>
            <div className="w-full h-1.5 bg-blue-800 rounded-full">
              <div className={`h-1.5 rounded-full transition-all ${chaosBarColor}`} style={{ width: `${state.chaos}%` }} />
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs opacity-75">❌ 미처리</div>
            <div className="font-bold text-red-300">{state.failed}</div>
          </div>
        </div>
      </div>

      {/* 혼란도 경고 배너 */}
      {state.chaos >= 70 && (
        <div className="mt-2 bg-red-900/60 border border-red-700 rounded-lg px-3 py-1 text-xs text-red-300 text-center animate-pulse">
          🌀 혼란도 위험 — 전 총장 유산 안건이 폭발적으로 증가하고 있습니다!
        </div>
      )}
    </header>
  );
}
