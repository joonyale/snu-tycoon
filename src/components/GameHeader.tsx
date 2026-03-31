import { GameState } from "@/lib/gameTypes";

export default function GameHeader({ state }: { state: GameState }) {
  const progress = Math.min(state.resolved / state.termTarget, 1);

  const approvalColor =
    state.approval >= 70 ? "text-green-300" :
    state.approval >= 40 ? "text-yellow-300" : "text-red-300";

  return (
    <header className="bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏫</span>
        <div>
          <div className="font-bold text-lg leading-tight">서울대 총장 타이쿤</div>
          <div className="text-blue-300 text-xs">Seoul National University President</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-xs opacity-75">임기</div>
          <div className="font-bold text-lg">{state.term}기</div>
        </div>

        <div className="text-center min-w-[140px]">
          <div className="text-xs opacity-75 mb-1">
            이번 학기 목표: {state.resolved}/{state.termTarget} 안건
          </div>
          <div className="w-full h-2 bg-blue-800 rounded-full">
            <div
              className="h-2 bg-green-400 rounded-full transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs opacity-75">📣 지지율</div>
          <div className={`font-bold text-lg ${approvalColor}`}>{state.approval}%</div>
        </div>

        <div className="text-center">
          <div className="text-xs opacity-75">❌ 미처리</div>
          <div className="font-bold text-lg text-red-300">{state.failed}</div>
        </div>
      </div>
    </header>
  );
}
