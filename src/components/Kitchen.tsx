import { ResourceId, RESOURCES } from "@/lib/gameTypes";

type Props = {
  assembly: ResourceId[];
  onAdd: (id: ResourceId) => void;
  onRemoveLast: () => void;
  onClear: () => void;
};

export default function ResourcePanel({ assembly, onAdd, onRemoveLast, onClear }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <h2 className="font-bold text-gray-700 mb-1 text-sm uppercase tracking-wider">총장실 자원 패널</h2>
      <p className="text-xs text-gray-400 mb-4">안건에 맞는 자원을 순서대로 배분하세요</p>

      {/* Resource buttons */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {RESOURCES.map((res) => (
          <button
            key={res.id}
            onClick={() => onAdd(res.id)}
            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border-2 border-transparent hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-95 text-left`}
          >
            <span className="text-2xl">{res.emoji}</span>
            <div>
              <div className="text-xs font-semibold text-gray-700 leading-tight">{res.label}</div>
              <div className="text-xs text-gray-400 leading-tight">{res.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Assembly tray */}
      <div className="bg-blue-50 rounded-xl p-3 min-h-[64px]">
        <div className="text-xs text-blue-700 font-medium mb-2">현재 배분 계획</div>
        <div className="flex items-center gap-1 flex-wrap min-h-[36px]">
          {assembly.length === 0 ? (
            <span className="text-gray-400 text-sm">자원을 선택하세요</span>
          ) : (
            assembly.map((id, i) => {
              const res = RESOURCES.find((r) => r.id === id)!;
              return (
                <span key={i} className={`text-xl px-1.5 py-0.5 rounded ${res.color}`} title={res.label}>
                  {res.emoji}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onRemoveLast}
          disabled={assembly.length === 0}
          className="flex-1 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← 되돌리기
        </button>
        <button
          onClick={onClear}
          disabled={assembly.length === 0}
          className="flex-1 py-2 text-sm border border-red-200 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          🗑 전체 취소
        </button>
      </div>
    </div>
  );
}
