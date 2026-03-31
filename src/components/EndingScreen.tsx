import { GameState } from "@/lib/gameTypes";

type Props = { state: GameState; onRestart: () => void };

export default function EndingScreen({ state, onRestart }: Props) {
  const isGoodEnding = state.approval >= 60 && state.chaos <= 40;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">

        {/* Result */}
        <div className="text-center">
          <div className="text-6xl mb-4">{isGoodEnding ? "🎓" : "😔"}</div>
          <h1 className="text-3xl font-bold">
            {isGoodEnding ? "차기 총장, 서울대를 바로 세우다" : "혼란은 아직 끝나지 않았다"}
          </h1>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
            <span>최종 지지율 <strong className="text-white text-lg">{state.approval}%</strong></span>
            <span>혼란도 <strong className={`text-lg ${state.chaos <= 40 ? "text-green-400" : "text-red-400"}`}>{state.chaos}%</strong></span>
            <span>처리 안건 <strong className="text-white text-lg">{state.totalResolved}건</strong></span>
          </div>
        </div>

        {/* Message */}
        {isGoodEnding ? (
          <div className="bg-blue-950 border border-blue-700 rounded-2xl p-7 space-y-5">
            <div className="text-blue-400 font-bold text-sm uppercase tracking-wider">📜 차기 총장 취임사</div>
            <blockquote className="text-gray-100 leading-relaxed text-lg italic border-l-4 border-blue-500 pl-5">
              "AI가 모든 것을 계산할 수 있는 시대일수록,
              우리는 더 깊이 물어야 합니다.
              <br /><br />
              <em>무엇을 위한 AI인가.</em>
              <br /><br />
              서울대학교는 기술의 도구가 아닌
              인간의 가치를 묻는 대학이 되어야 합니다.
              수백 년 인문학의 질문 위에,
              AI 시대의 새로운 답을 쌓겠습니다."
            </blockquote>
            <div className="text-right text-gray-400 text-sm">— 제28대 서울대학교 총장</div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "🧠", title: "AI × 인문학 융합", desc: "기술과 철학이 함께하는 커리큘럼" },
                { icon: "🤝", title: "결정하는 리더십", desc: "혼란 없는 명확한 의사결정 체계" },
                { icon: "🌱", title: "학생 중심 대학", desc: "구성원이 신뢰하는 열린 행정" },
              ].map((v) => (
                <div key={v.title} className="bg-blue-900/40 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{v.icon}</div>
                  <div className="text-xs font-bold text-blue-300">{v.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-7 space-y-4">
            <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider">⚠️ 혼란은 계속된다</div>
            <p className="text-gray-300 leading-relaxed">
              전임 총장의 미결 유산을 충분히 수습하지 못했습니다.
              학부대학, 첨단융합학부, AI대학원의 혼란은
              여전히 구성원들을 흔들고 있습니다.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              차기 총장의 비전 — <em>"AI 시대의 휴머니티"</em> — 을 실현하려면
              먼저 혼란도를 낮추고 지지율을 높여야 합니다.
              다시 도전해보세요.
            </p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition-colors"
        >
          다시 시작하기
        </button>
      </div>
    </div>
  );
}
