import { Issue, ResourceId, RESOURCES } from "@/lib/gameTypes";

type Props = {
  issue: Issue;
  assembly: ResourceId[];
  onResolve: (id: string) => void;
};

export default function IssueCard({ issue, assembly, onResolve }: Props) {
  const patiencePercent = (issue.patience / issue.maxPatience) * 100;
  const patienceColor =
    patiencePercent > 60 ? "bg-green-400" :
    patiencePercent > 30 ? "bg-yellow-400" : "bg-red-400";

  const isChaos = issue.department === "전 총장 유산";

  const isMatch =
    assembly.length === issue.requiredResources.length &&
    assembly.every((r, i) => r === issue.requiredResources[i]);

  return (
    <div className={`bg-white rounded-xl border-2 p-4 shadow-sm transition-all ${
      isChaos
        ? "border-red-400 bg-red-50"
        : isMatch
        ? "border-blue-400 shadow-blue-100"
        : "border-gray-200"
    }`}>
      {/* 혼란 안건 뱃지 */}
      {isChaos && (
        <div className="text-xs font-bold text-red-600 bg-red-100 rounded-full px-2 py-0.5 inline-block mb-2">
          🌀 전 총장 미결 유산
        </div>
      )}

      {/* Issue header */}
      <div className="flex items-start gap-2 mb-2">
        <span className="text-xl">{isChaos ? "🌀" : issue.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className={`font-semibold text-sm leading-tight ${isChaos ? "text-red-700" : "text-gray-800"}`}>
            {issue.title}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{issue.department}</div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5">
            <div className={`h-1.5 rounded-full transition-all ${patienceColor}`} style={{ width: `${patiencePercent}%` }} />
          </div>
        </div>
        <div className={`text-xs font-bold whitespace-nowrap ${isChaos ? "text-red-500" : "text-blue-600"}`}>
          +{issue.reward}%
        </div>
      </div>

      {/* Required resources */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-1">필요 자원</div>
        <div className="flex gap-1 flex-wrap">
          {issue.requiredResources.map((resId, i) => {
            const res = RESOURCES.find((r) => r.id === resId)!;
            const isCurrentMatch = assembly[i] === resId;
            const isPlaced = i < assembly.length;
            return (
              <span
                key={i}
                className={`text-base px-1.5 py-0.5 rounded transition-all ${res.color} ${
                  isPlaced
                    ? isCurrentMatch
                      ? "ring-2 ring-green-400"
                      : "ring-2 ring-red-400"
                    : "opacity-60"
                }`}
                title={res.label}
              >
                {res.emoji}
              </span>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onResolve(issue.id)}
        disabled={!isMatch}
        className={`w-full py-1.5 rounded-lg text-sm font-medium transition-colors ${
          isMatch
            ? isChaos
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isMatch ? (isChaos ? "혼란 수습 ✓" : "결재 승인 ✓") : "검토 중..."}
      </button>
    </div>
  );
}
