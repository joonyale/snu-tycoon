import { UPGRADES, GameState } from "@/lib/gameTypes";

type Props = {
  state: GameState;
  onBuy: (id: string) => void;
  onNextTerm: () => void;
};

export default function UpgradeShop({ state, onBuy, onNextTerm }: Props) {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏛️</div>
          <h2 className="text-2xl font-bold text-gray-800">{state.term}기 학기 마감!</h2>
          <p className="text-gray-500 mt-1">
            {state.resolved}건 처리 완료 • {state.failed}건 미처리
          </p>
          <div className="mt-3 text-2xl font-bold text-blue-700">
            📣 현재 지지율: {state.approval}%
          </div>
        </div>

        <h3 className="font-bold text-gray-700 mb-3">행정 역량 강화</h3>
        <div className="space-y-3 mb-6">
          {UPGRADES.map((upgrade) => {
            const level = state.upgradeLevels[upgrade.id] ?? 0;
            const cost = upgrade.cost * (level + 1);
            const maxed = level >= upgrade.maxLevel;
            const canAfford = state.approval >= cost;

            return (
              <div
                key={upgrade.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl"
              >
                <span className="text-2xl">{upgrade.emoji}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">{upgrade.label}</div>
                  <div className="text-xs text-gray-500">{upgrade.description}</div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: upgrade.maxLevel }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-1.5 rounded-full ${
                          i < level ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onBuy(upgrade.id)}
                  disabled={maxed || !canAfford}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    maxed
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : canAfford
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {maxed ? "MAX" : `-${cost}%`}
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={onNextTerm}
          className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-colors text-lg"
        >
          {state.term + 1}기 학기 시작 →
        </button>
      </div>
    </div>
  );
}
