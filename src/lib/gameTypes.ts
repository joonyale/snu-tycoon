// 7대 대학 운영 변수 (재료 역할)
export type ResourceId =
  | "professor"    // 교수 티오 — 교수진 충원/개발
  | "student"      // 학생 선발 — 우수 학생 모집
  | "budget"       // 예산 확보 — 재정 건전성
  | "facility"     // 공간/시설 — 캠퍼스 인프라
  | "research"     // 연구 성과 — 논문·특허·펀딩
  | "recognition"  // 외부 인지도 — 대학 순위/브랜드
  | "employment";  // 취업률 — 졸업생 진로 성과

export type Resource = {
  id: ResourceId;
  label: string;
  emoji: string;
  color: string;
  description: string;
};

export const RESOURCES: Resource[] = [
  { id: "professor",   label: "교수 충원",   emoji: "👨‍🏫", color: "bg-blue-200",   description: "신규 교수 임용" },
  { id: "student",     label: "학생 선발",   emoji: "🎓",   color: "bg-green-200",  description: "우수 학생 모집" },
  { id: "budget",      label: "예산 확보",   emoji: "💰",   color: "bg-yellow-200", description: "재정 건전성 강화" },
  { id: "facility",    label: "시설 확충",   emoji: "🏛️",   color: "bg-orange-200", description: "캠퍼스 인프라 개선" },
  { id: "research",    label: "연구 성과",   emoji: "🔬",   color: "bg-purple-200", description: "논문·특허·펀딩" },
  { id: "recognition", label: "외부 인지도", emoji: "🏆",   color: "bg-red-200",    description: "대학 순위/브랜드" },
  { id: "employment",  label: "취업 지원",   emoji: "💼",   color: "bg-teal-200",   description: "졸업생 진로 성과" },
];

// 안건(손님) — 총장에게 결재·해결을 요청하는 대학 현안
export type Issue = {
  id: string;
  title: string;
  emoji: string;
  requiredResources: ResourceId[]; // 해결에 필요한 변수 순서
  reward: number;                   // 해결 시 지지율 포인트
  patience: number;
  maxPatience: number;
  department: string;               // 요청 부서
};

// 안건 템플릿
export type IssueTemplate = {
  title: string;
  emoji: string;
  department: string;
  requiredResources: ResourceId[];
  baseReward: number;
};

export const ISSUE_TEMPLATES: IssueTemplate[] = [
  {
    title: "AI 연구소 신설",
    emoji: "🤖",
    department: "연구처",
    requiredResources: ["professor", "budget", "facility", "research"],
    baseReward: 40,
  },
  {
    title: "글로벌 장학생 유치",
    emoji: "🌏",
    department: "입학처",
    requiredResources: ["student", "budget", "recognition"],
    baseReward: 25,
  },
  {
    title: "노후 건물 리모델링",
    emoji: "🏗️",
    department: "시설팀",
    requiredResources: ["budget", "facility"],
    baseReward: 20,
  },
  {
    title: "스타 교수 영입",
    emoji: "⭐",
    department: "인사처",
    requiredResources: ["professor", "budget", "recognition"],
    baseReward: 30,
  },
  {
    title: "산학협력 MOU 체결",
    emoji: "🤝",
    department: "산학협력단",
    requiredResources: ["employment", "research", "recognition"],
    baseReward: 30,
  },
  {
    title: "취업지원센터 확대",
    emoji: "📋",
    department: "취업팀",
    requiredResources: ["employment", "budget", "facility"],
    baseReward: 25,
  },
  {
    title: "QS 세계 대학 순위 대응",
    emoji: "📊",
    department: "기획처",
    requiredResources: ["research", "recognition", "professor", "student"],
    baseReward: 45,
  },
  {
    title: "기부금 캠페인 기획",
    emoji: "🎁",
    department: "발전기금팀",
    requiredResources: ["budget", "recognition"],
    baseReward: 20,
  },
  {
    title: "도서관 24시간 개방",
    emoji: "📚",
    department: "학생처",
    requiredResources: ["facility", "student", "budget"],
    baseReward: 22,
  },
  {
    title: "정부 R&D 과제 수주",
    emoji: "📝",
    department: "연구처",
    requiredResources: ["research", "professor", "budget"],
    baseReward: 35,
  },

  // ── 단과대 요청 ──────────────────────────────────────────
  {
    title: "공과대 반도체 연구동 증축 요청",
    emoji: "⚙️",
    department: "공과대학",
    requiredResources: ["facility", "budget", "research"],
    baseReward: 35,
  },
  {
    title: "의과대 임상실습 병원 협약 요청",
    emoji: "🏥",
    department: "의과대학",
    requiredResources: ["budget", "employment", "recognition"],
    baseReward: 38,
  },
  {
    title: "인문대 전임교원 충원 요청",
    emoji: "📖",
    department: "인문대학",
    requiredResources: ["professor", "budget"],
    baseReward: 22,
  },
  {
    title: "경영대 MBA 커리큘럼 개편 요청",
    emoji: "📈",
    department: "경영대학",
    requiredResources: ["professor", "student", "employment"],
    baseReward: 30,
  },
  {
    title: "자연과학대 슈퍼컴퓨팅 인프라 지원 요청",
    emoji: "🖥️",
    department: "자연과학대학",
    requiredResources: ["facility", "budget", "research"],
    baseReward: 40,
  },
  {
    title: "사범대 교육실습 확대 요청",
    emoji: "✏️",
    department: "사범대학",
    requiredResources: ["student", "facility", "employment"],
    baseReward: 25,
  },
  {
    title: "법학전문대학원 모의법정 시설 요청",
    emoji: "⚖️",
    department: "법학전문대학원",
    requiredResources: ["facility", "budget"],
    baseReward: 20,
  },
  {
    title: "농생대 스마트팜 실험 공간 요청",
    emoji: "🌾",
    department: "농업생명과학대학",
    requiredResources: ["facility", "research", "budget"],
    baseReward: 32,
  },
  {
    title: "미술대 국제 전시 예산 지원 요청",
    emoji: "🎨",
    department: "미술대학",
    requiredResources: ["budget", "recognition"],
    baseReward: 18,
  },
  {
    title: "음악대 콘서트홀 방음 공사 요청",
    emoji: "🎵",
    department: "음악대학",
    requiredResources: ["facility", "budget"],
    baseReward: 18,
  },
  {
    title: "사회과학대 정책 싱크탱크 설립 요청",
    emoji: "🏛️",
    department: "사회과학대학",
    requiredResources: ["research", "professor", "recognition"],
    baseReward: 33,
  },
  {
    title: "약학대 신약개발 연구비 지원 요청",
    emoji: "💊",
    department: "약학대학",
    requiredResources: ["budget", "research", "professor"],
    baseReward: 36,
  },
  {
    title: "수의대 동물병원 장비 교체 요청",
    emoji: "🐾",
    department: "수의과대학",
    requiredResources: ["facility", "budget"],
    baseReward: 20,
  },
  {
    title: "생활과학대 창업보육센터 입주 공간 요청",
    emoji: "🏢",
    department: "생활과학대학",
    requiredResources: ["facility", "employment", "student"],
    baseReward: 27,
  },
];

export type Upgrade = {
  id: string;
  label: string;
  description: string;
  emoji: string;
  cost: number;
  maxLevel: number;
};

export const UPGRADES: Upgrade[] = [
  {
    id: "patience",
    label: "행정 효율화",
    description: "안건 처리 마감 시간이 늘어납니다",
    emoji: "⏱️",
    cost: 60,
    maxLevel: 5,
  },
  {
    id: "bonus",
    label: "리더십 향상",
    description: "안건 해결 시 지지율 보너스 증가",
    emoji: "📣",
    cost: 80,
    maxLevel: 5,
  },
  {
    id: "queue",
    label: "비서실 확대",
    description: "동시에 처리할 수 있는 안건 수 증가",
    emoji: "🗂️",
    cost: 100,
    maxLevel: 3,
  },
];

// 혼란 안건 — 이전 총장의 미결정 유산
export const CHAOS_TEMPLATES: IssueTemplate[] = [
  {
    title: "🚨 학부대학 설립 방향 또 바뀜",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["student", "professor", "facility", "budget"],
    baseReward: 10,
  },
  {
    title: "🚨 첨단융합학부 정원·교수 미확정",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["professor", "student", "budget"],
    baseReward: 10,
  },
  {
    title: "🚨 AI대학원 예산 집행 근거 없음",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["budget", "research", "professor"],
    baseReward: 10,
  },
  {
    title: "🚨 학부대학 교수 보직 공석 사태",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["professor", "budget"],
    baseReward: 8,
  },
  {
    title: "🚨 첨단융합학부 학생들 소속 혼란",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["student", "facility"],
    baseReward: 8,
  },
  {
    title: "🚨 AI대학원 입학생 커리큘럼 공백",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["research", "professor", "student"],
    baseReward: 10,
  },
  {
    title: "🚨 미결 사업 3개 동시 감사 착수",
    emoji: "🌀",
    department: "전 총장 유산",
    requiredResources: ["budget", "recognition", "professor", "facility"],
    baseReward: 12,
  },
];

export type GamePhase = "intro" | "playing" | "shop" | "ending";

export type GameState = {
  phase: GamePhase;
  approval: number;
  chaos: number;       // 혼란도 0~100 — 높을수록 혼란 안건 폭탄
  term: number;
  resolved: number;
  failed: number;
  totalResolved: number;
  issues: Issue[];
  assembly: ResourceId[];
  upgradeLevels: Record<string, number>;
  termTarget: number;
  maxTerms: number;    // 총 임기 수 (이걸 다 채우면 엔딩)
};
