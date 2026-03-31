type Props = { onStart: () => void };

export default function IntroScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">

        {/* Title */}
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h1 className="text-3xl font-bold text-white">서울대 총장 타이쿤</h1>
          <p className="text-gray-400 mt-2 text-sm">Seoul National University President Simulator</p>
        </div>

        {/* Current situation */}
        <div className="bg-red-950 border border-red-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider">
            <span>🌀</span> 현재 상황
          </div>
          <p className="text-gray-200 leading-relaxed">
            현 총장은
            재임 중 <span className="text-yellow-300">학부대학</span>,{" "}
            <span className="text-yellow-300">첨단융합학부</span>,{" "}
            <span className="text-yellow-300">AI대학원</span> 등
            굵직한 사업들을 연달아 발표했습니다.
          </p>
          <p className="text-gray-300 leading-relaxed">
            그러나 구체적 방향 결정 없이 사업을 벌이기만 해
            교수·학생·직원 모두 혼란에 빠졌습니다.
            처리되지 못한 안건들이 산더미처럼 쌓인 채 임기가 끝났습니다.
          </p>
          <div className="bg-red-900/50 rounded-lg px-4 py-2 text-red-300 text-sm">
            ⚠️ 혼란도 60%인 상태에서 게임이 시작됩니다
          </div>
        </div>

        {/* Your mission */}
        <div className="bg-blue-950 border border-blue-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
            <span>🎯</span> 당신의 임무
          </div>
          <p className="text-gray-200 leading-relaxed">
            차기 총장 후보로서,
            전임 총장이 남긴 혼란을 수습하고 대학을 바로 세워야 합니다.
          </p>
          <p className="text-gray-300 leading-relaxed">
            AI 시대, 기술 만능주의에 휩쓸린 대학에
            <span className="text-blue-300 font-semibold"> 휴머니티의 가치</span>를 되살리는 것이
            차기 총장 후보의 비전입니다.
          </p>
        </div>

        {/* How to play */}
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 space-y-2">
          <div className="text-gray-400 font-bold text-sm uppercase tracking-wider mb-3">게임 방법</div>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex gap-3"><span>1️⃣</span><span>결재 대기 안건의 <strong className="text-white">필요 자원 순서</strong>를 확인하세요</span></div>
            <div className="flex gap-3"><span>2️⃣</span><span>오른쪽 패널에서 <strong className="text-white">같은 순서로 클릭</strong>하세요</span></div>
            <div className="flex gap-3"><span>3️⃣</span><span>일치하면 <strong className="text-white">결재 승인</strong> → 지지율 상승</span></div>
            <div className="flex gap-3"><span>🌀</span><span><strong className="text-red-300">혼란 안건(빨간 테두리)</strong>을 처리할수록 혼란도 감소</span></div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-2xl text-xl transition-colors"
        >
          총장직 수락 →
        </button>
      </div>
    </div>
  );
}
