// 학습 교육 & 진로·직업 성공 로드맵 데이터
export const eduData = {
  // 4.1 유전자강점 맞춤형 + 롤모델매칭 성공로드맵 (평생 포트폴리오 3가지)
  roleModelRoadmap: {
    title: '유전자 강점 기반 평생 포트폴리오',
    subtitle: '윤서의 유전적 강점 3가지를 극대화하는 롤모델 매칭 성공 로드맵',
    portfolios: [
      {
        id: 1,
        strength: '논리력 · 패턴 인식',
        gene: 'Working Memory + Processing Speed',
        icon: '🧠',
        color: '#6366F1',
        portfolioName: '전략적 문제해결 포트폴리오',
        description: '복잡한 문제를 구조화하고 최적의 해법을 찾아내는 능력. 이 포트폴리오는 수학·과학·코딩·전략 게임에서 축적됩니다.',
        roleModel: {
          name: '일론 머스크',
          title: 'SpaceX & Tesla CEO',
          photo: '🚀',
          earlyStart: '9세 프로그래밍 독학 시작 (BASIC 언어)',
          matchReason: '논리적 사고 + 패턴 인식 → 복잡한 시스템 설계 능력',
        },
        milestones: [
          { age: '7~9세', action: '코딩 블록 놀이 + 수학 퍼즐', status: 'current' },
          { age: '10~12세', action: '파이썬 기초 + 수학 경시대회', status: 'future' },
          { age: '13~15세', action: 'AI 프로젝트 제작 + 해커톤 참가', status: 'future' },
          { age: '16~18세', action: '오픈소스 기여 + 포트폴리오 구축', status: 'future' },
        ],
        recommendedActivities: ['스크래치 코딩', '루빅스 큐브', '체스', '수학 올림피아드'],
      },
      {
        id: 2,
        strength: '공간지각력 · 창의성',
        gene: 'Spatial Ability + Creativity',
        icon: '🎨',
        color: '#EC4899',
        portfolioName: '창의적 설계·디자인 포트폴리오',
        description: '3차원 공간을 직관적으로 이해하고, 새로운 것을 만들어내는 능력. 건축·디자인·발명·예술에서 빛납니다.',
        roleModel: {
          name: '스티브 잡스',
          title: 'Apple 공동창업자',
          photo: '🍎',
          earlyStart: '10세 전자키트 조립, 차고에서 첫 컴퓨터 만들기',
          matchReason: '공간 감각 + 미적 직관 → 제품 디자인 혁명',
        },
        milestones: [
          { age: '7~9세', action: '레고 테크닉 + 그림 그리기', status: 'current' },
          { age: '10~12세', action: '3D프린팅 + 메이커 프로젝트', status: 'future' },
          { age: '13~15세', action: 'CAD 설계 + 발명 대회', status: 'future' },
          { age: '16~18세', action: '디자인 포트폴리오 + UX/UI 프로젝트', status: 'future' },
        ],
        recommendedActivities: ['레고 테크닉', '클레이 조형', '건축 모형', '앱 디자인'],
      },
      {
        id: 3,
        strength: '과제집중력 · 끈기',
        gene: 'Task Persistence + Inhibitory Control',
        icon: '🎯',
        color: '#10B981',
        portfolioName: '몰입형 전문가 포트폴리오',
        description: '한 가지 분야에 깊이 몰입하여 전문성을 쌓는 능력. 과학 연구·의학·공학·예술 분야의 최고 전문가로 성장합니다.',
        roleModel: {
          name: '김연아',
          title: '올림픽 피겨 금메달리스트',
          photo: '⛸️',
          earlyStart: '5세 피겨스케이팅 시작, 매일 새벽 연습 루틴',
          matchReason: '과제집중력 + 끈기 → 단일 분야 세계 최고 달성',
        },
        milestones: [
          { age: '7~9세', action: '관심 분야 3가지 체험 + 꾸준한 반복 훈련', status: 'current' },
          { age: '10~12세', action: '핵심 1가지 분야 선택 + 전문 코치 연결', status: 'future' },
          { age: '13~15세', action: '전국 대회 도전 + 멘토링', status: 'future' },
          { age: '16~18세', action: '국제 대회 / 연구 논문 / 특허', status: 'future' },
        ],
        recommendedActivities: ['과학 실험 일지', '악기 연습', '운동 루틴', '독서 마라톤'],
      },
    ],
  },

  // 4.2 맞춤형 학습 스타일 & 생활패턴
  learningStyle: {
    type: '체험형 + 시각형 학습자',
    icon: '🧪',
    description: '직접 만져보고, 실험하고, 눈으로 확인해야 이해가 빠른 유형입니다. 단순 강의식 수업보다 프로젝트 기반 학습에서 몰입도가 높습니다.',
    details: [
      { label: '최적 학습 모달리티', value: '체험 > 시각 > 청각', icon: '📐' },
      { label: '최적 집중 시간대', value: '오전 9~11시 (아침형 유전자)', icon: '⏰' },
      { label: '집중 유형', value: '단기 집중형 (25분 단위 최적)', icon: '⚡' },
      { label: '정보 처리 강점', value: '패턴 인식 → 공간 추론 순', icon: '🧠' },
    ],
  },

  lifePattern: {
    items: [
      { name: '수면 유형', gene: 'Long Sleep Preference', status: 'normal', value: '8~9시간 권장',
        solution: '밤 9시 이전 취침 루틴을 만들고, 침실에서 블루라이트 기기를 차단하세요.' },
      { name: '낮잠 필요도', gene: 'Nap Preference', status: 'strength', value: '낮잠 선호 유전자 보유',
        solution: '점심 식후 20분 파워냅은 오후 학습 효율을 40% 이상 높여줍니다.' },
      { name: '스크린 타임 민감도', gene: 'Leisure Screen Time', status: 'attention', value: '높은 민감도',
        solution: '하루 1시간 이내로 엄격히 제한하세요. 대안으로 오디오북이나 보드게임을 활용하세요.' },
      { name: '좌식 선호도', gene: 'Sedentary Preference', status: 'attention', value: '좌식 경향 높음',
        solution: '매 45분마다 5분 스트레칭 타이머를 설정하고, 서서 공부하는 스탠딩 데스크도 고려해보세요.' },
    ],
  },

  dailySchedule: [
    { time: '07:00', activity: '기상 & 스트레칭', type: 'health' },
    { time: '07:30', activity: '아침 식사 (오메가-3 포함)', type: 'health' },
    { time: '09:00', activity: '핵심 학습 1 (수학/과학 - 집중력 최고 시간)', type: 'study' },
    { time: '09:25', activity: '5분 뇌 휴식 (창밖 보기)', type: 'break' },
    { time: '09:30', activity: '핵심 학습 2 (언어/독서)', type: 'study' },
    { time: '10:00', activity: '야외 체험 활동 / 실험', type: 'activity' },
    { time: '12:00', activity: '점심 식사', type: 'health' },
    { time: '12:30', activity: '파워냅 20분', type: 'break' },
    { time: '14:00', activity: '창의 활동 (코딩/미술/음악)', type: 'activity' },
    { time: '15:30', activity: '야외 운동 30분', type: 'health' },
    { time: '17:00', activity: '자유 놀이 시간', type: 'activity' },
    { time: '19:00', activity: '저녁 식사 & 가족 대화', type: 'health' },
    { time: '20:00', activity: '그림책 읽기 & 감정 일기', type: 'study' },
    { time: '21:00', activity: '취침 루틴 시작', type: 'health' },
  ],

  // 4.2 학원 매칭
  academyMatches: [
    { name: '씽크매쓰 사고력 수학', type: '수학', match: 95, distance: '도보 10분',
      reason: '패턴 인식 ✅ + 공간 추론 ✅ 강점에 최적화된 사고력 중심 커리큘럼',
      curriculum: '교구 활용 수학, 문제 해결 전략, 수학 올림피아드 준비',
      rating: 4.8 },
    { name: '리틀 코더스 코딩 학원', type: '코딩', match: 92, distance: '차량 5분',
      reason: '작업 기억 ✅ + 처리 속도 ✅ 강점 활용. 체험형 학습자에 최적',
      curriculum: '스크래치 → 파이썬 기초, 로봇 코딩, AI 프로젝트',
      rating: 4.7 },
    { name: '과학나라 실험 교실', type: '과학', match: 88, distance: '도보 15분',
      reason: '새로움 추구 ✅ + 과학 창의성 ✅ 유전자형에 맞는 실험 중심 수업',
      curriculum: '주간 실험 프로젝트, 자연 관찰, 발명 대회 준비',
      rating: 4.6 },
  ],

  // 4.3 진로 & 직업
  careerRoadmap: {
    current: { age: 7, stage: '초등 저학년', phase: '적성 발견기' },
    stages: [
      { period: '7~9세 (초등 저학년)', phase: '다양한 체험으로 적성 발견', color: '#6366F1',
        actions: ['과학 실험 키트 체험', '코딩 기초 놀이', '미술/음악 감성 자극', '자연 관찰 일기'],
        goal: '호기심 영역 3가지 이상 발견하기' },
      { period: '10~12세 (초등 고학년)', phase: '관심 분야 심화 탐색', color: '#3B82F6',
        actions: ['수학/과학 경시대회 도전', '코딩 프로젝트 제작', '메이커 스페이스 활동', '독서 토론 참여'],
        goal: '핵심 관심 분야 1~2개로 좁히기' },
      { period: '13~15세 (중학생)', phase: '전문성 기초 구축', color: '#10B981',
        actions: ['심화 프로그래밍 학습', '과학 탐구 보고서 작성', '멘토 연결 (관심 직업인)', '자기소개서 연습'],
        goal: '전공 방향 2~3개 후보 선정' },
      { period: '16~18세 (고등학생)', phase: '전공·학과 선택 확정', color: '#F59E0B',
        actions: ['대학 전공 탐색 캠프', '포트폴리오 구축', '인턴십/봉사 경험', '입시 전략 수립'],
        goal: '최종 진로 방향 확정 & 실행' },
    ],
    recommendedMajors: ['컴퓨터공학', '데이터사이언스', '인공지능', '생명공학', '산업디자인'],
  },

  // 4.4 커뮤니티 위클리 이슈
  weeklyIssues: {
    week: '2026년 4월 1주차',
    parenting: [
      { rank: 1, title: '7세 아이 게임 중독 징후, 어떻게 대처해야 할까요?', comments: 234, hot: true },
      { rank: 2, title: '형제간 싸움이 너무 잦아요. 편들지 않는 중재법', comments: 189 },
      { rank: 3, title: '아이가 거짓말을 하기 시작했어요. 발달 과정일까요?', comments: 156 },
      { rank: 4, title: '편식이 심한 아이, 유전일까 습관일까?', comments: 142 },
      { rank: 5, title: '친구에게 맞고 와도 말 안 하는 아이, 어떻게 대화할까요?', comments: 128 },
    ],
    admission: [
      { rank: 1, title: '2027 초등 입학 준비, 올해 꼭 해야 할 3가지', comments: 312, hot: true },
      { rank: 2, title: '영재원 선발 기준 변경! 달라진 점 총정리', comments: 278 },
      { rank: 3, title: '사립초 vs 공립초, 우리 아이에게 맞는 선택은?', comments: 201 },
      { rank: 4, title: '수학 선행 어디까지? 전문가 의견 모음', comments: 187 },
      { rank: 5, title: '방과후 학교 vs 학원, 가성비 비교 분석', comments: 165 },
    ],
    education: [
      { rank: 1, title: 'AI 코딩 교육 의무화, 우리 아이는 몇 살부터?', comments: 356, hot: true },
      { rank: 2, title: '하브루타 교육법, 가정에서 실천하는 5가지 방법', comments: 243 },
      { rank: 3, title: '그림책 vs 학습지, 7세에 진짜 필요한 교육은?', comments: 198 },
      { rank: 4, title: '유아 영어 교육 메타분석: 효과 있는 방법 vs 시간낭비', comments: 176 },
      { rank: 5, title: '감정 코칭 프로그램 비교 리뷰 (2026 최신판)', comments: 154 },
    ],
  },
};
