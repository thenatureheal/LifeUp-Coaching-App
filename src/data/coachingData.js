// 마음 코칭 액션 데이터 (기질·성격·심리 유전자 기반)
export const coachingData = {
  // 3.1 성장단계별 마음의 표출 모습
  temperamentProfile: {
    type: '호기심 탐험가형',
    description: '새로운 것에 강하게 끌리고, 규칙보다 자유로운 탐색을 선호하는 유형입니다. 논리적으로 세상을 이해하려 하며, 실험과 시행착오를 통해 학습합니다.',
    traits: [
      { name: '외향성', eng: 'Extraversion', score: 62, status: 'normal' },
      { name: '개방성', eng: 'Openness', score: 85, status: 'strength' },
      { name: '친화성', eng: 'Agreeableness', score: 45, status: 'attention' },
      { name: '성실성', eng: 'Conscientiousness', score: 58, status: 'normal' },
      { name: '정서안정성', eng: 'Emotional Stability', score: 40, status: 'attention' },
    ]
  },

  schoolLife: {
    title: '학교생활 유형 예측',
    predictions: [
      { category: '교사 관계', type: '존중하되 질문이 많은 학생', icon: '🏫',
        detail: '규칙을 무조건 따르기보다 "왜?"라고 묻는 경향. 논리적 설명을 해주면 잘 따릅니다.',
        coaching: '"선생님이 왜 그렇게 말씀하셨는지 같이 생각해볼까?" 라고 이유를 함께 찾아주세요.' },
      { category: '친구 관계', type: '소수 심층형 교우 관계', icon: '👫',
        detail: '많은 친구보다 마음이 잘 맞는 1~2명과 깊은 우정을 나누는 스타일입니다.',
        coaching: '아이가 선택한 친구를 존중하고, "오늘 OO이랑 뭐 했어?" 하고 관심을 보여주세요.' },
      { category: '수업 스타일', type: '체험형 + 시각형 학습자', icon: '📖',
        detail: '직접 만지고, 해보고, 눈으로 확인해야 이해가 빠릅니다. 청각 강의식 수업은 집중도가 낮을 수 있습니다.',
        coaching: '학원 선택 시 실험/체험/토론 위주의 수업을 우선 고려하세요.' },
      { category: '갈등 대처', type: '회피 후 폭발형', icon: '⚡',
        detail: '처음에는 감정을 참고 넘어가지만, 누적되면 한 번에 크게 표출할 수 있습니다.',
        coaching: '"지금 기분이 어떤지 말해줄 수 있어?" 라고 감정을 중간중간 확인해주세요.' },
    ]
  },

  socialLife: {
    title: '사회생활 유형 예측',
    predictions: [
      { category: '또래 관계 형성', type: '관찰 후 진입형', icon: '👀',
        detail: '새로운 집단에서 바로 어울리기보다, 먼저 관찰한 후 자기 자리를 찾아 들어갑니다.',
        coaching: '새 환경(전학, 학원 등)에서 "천천히 알아가도 괜찮아"라고 안심시켜 주세요.' },
      { category: '스트레스 반응', type: '내재화형 (속으로 삼김)', icon: '🫧',
        detail: '힘든 감정을 밖으로 잘 드러내지 않습니다. 겉으로 괜찮아 보여도 속은 힘들 수 있습니다.',
        coaching: '매일 저녁 "오늘 하루 제일 힘들었던 거 1개만 말해볼까?" 루틴을 만들어주세요.' },
    ]
  },

  ageTimeline: [
    { age: '0~3세', phase: '애착 형성기', color: '#EC4899',
      trigger: '분리 불안이 유전적으로 강할 수 있음',
      action: '일관된 반응과 스킨십으로 안전 기지를 확보해 주세요' },
    { age: '4~6세', phase: '자아 인식기', color: '#8B5CF6',
      trigger: '"싫어!" "내가 할 거야!" 자기 주장이 강해지는 시기',
      action: '선택권을 주되, 명확한 한계를 정해 자율성과 규칙의 균형을 잡으세요' },
    { age: '7~12세', phase: '사회성 발달기', color: '#3B82F6',
      trigger: '친구 관계에서 상처받기 쉬움. 감정적 내재화 경향 주의',
      action: '감정 일기 쓰기를 통해 자기 감정을 언어화하는 연습을 시작하세요' },
    { age: '13~15세', phase: '정체성 탐색기', color: '#10B981',
      trigger: '부모 통제에 강하게 저항. 새로움 추구 유전자가 위험 행동으로 표출 가능',
      action: '통제보다 "너는 어떻게 생각해?" 대화로 존중의 신호를 보내세요' },
    { age: '16~20세', phase: '자립 준비기', color: '#F59E0B',
      trigger: '진로 스트레스와 자존감 흔들림',
      action: 'AI 대체 불가능 역량 기반의 진로 방향을 함께 탐색하세요' },
  ],

  // 3.2 AI 시대 대체 불가능 역량
  aiCapabilities: [
    { name: '창의성', icon: '🎨', score: 78, status: 'strength',
      genes: ['Scientific Creativity ✅', 'Artistic Creativity ✅', 'Novelty Seeking ✅', 'Managerial Creativity ⚠️'],
      desc: '새로운 아이디어를 만들어내고, 기존 것을 다르게 조합하는 능력. AI는 패턴을 학습하지만, 진짜 "0에서 1"의 창조는 인간만 가능합니다.',
    },
    { name: '공감 능력', icon: '💗', score: 52, status: 'attention',
      genes: ['Empathy ⚠️', 'Emotional Stability ⚠️', 'Agreeableness ⚠️', 'Positive Emotion 📊'],
      desc: '타인의 감정을 이해하고 함께 느끼는 능력. 상담, 교육, 의료, 리더십 등 모든 휴먼 서비스의 핵심입니다.',
    },
    { name: '전략적 사고', icon: '🧠', score: 82, status: 'strength',
      genes: ['Decision Intelligence ✅', 'Pattern Recognition ✅', 'Fluid Intelligence ⚠️', 'Processing Speed ✅'],
      desc: '복잡한 상황에서 핵심을 파악하고, 최적의 의사결정을 내리는 능력. 경영, 투자, 정책 분야에서 필수입니다.',
    },
    { name: '협업 능력', icon: '🤝', score: 48, status: 'attention',
      genes: ['Cognitive Flexibility ⚠️', 'Task Switching ⚠️', 'Inhibitory Control ✅', 'Agreeableness ⚠️'],
      desc: '다양한 사람과 함께 시너지를 만드는 능력. 인지 유연성과 감정 조절이 핵심 기반입니다.',
    },
    { name: '리더십 잠재력', icon: '👑', score: 65, status: 'normal',
      genes: ['Extraversion 📊', 'Risk Tolerance 📊', 'Executive Capacity 📊', 'Conscientiousness 📊'],
      desc: '비전을 제시하고 사람을 이끄는 능력. 타고난 성향과 후천적 경험이 함께 만들어갑니다.',
    },
  ],

  careerTypes: [
    { type: '창업가형', match: 92, icon: '🚀', color: '#6366F1',
      conditions: '창의성↑ + 위험감수↑ + 전략적 사고↑',
      jobs: ['스타트업 CEO', '소셜벤처 창업가', '프로덕트 매니저', '콘텐츠 크리에이터'],
      guide: '어릴 때부터 "작은 프로젝트"를 스스로 기획하고 실행하는 경험을 쌓게 해주세요. 레모네이드 가게, 중고장터 등 실전 경험이 가장 좋은 훈련입니다.' },
    { type: '연구자형', match: 88, icon: '🔬', color: '#3B82F6',
      conditions: '과학 창의성↑ + 집중력↑ + 인지능력↑',
      jobs: ['AI 연구원', '생명공학 연구자', '데이터 사이언티스트', '우주공학 엔지니어'],
      guide: '"왜?"라는 질문을 절대 막지 마세요. 관찰 일기, 실험 키트, 과학관 방문을 통해 탐구심을 자극해주세요.' },
    { type: '예술가형', match: 75, icon: '🎭', color: '#EC4899',
      conditions: '예술 창의성↑ + 감성 개방성↑ + 신경가소성↑',
      jobs: ['영화/드라마 감독', 'UX 디자이너', '음악 프로듀서', '공간 디자이너'],
      guide: '다양한 예술적 자극(미술관, 공연, 음악)을 어릴 때부터 경험시키고, "네가 느낀 대로 표현해봐"라는 자유를 주세요.' },
    { type: '기술전문가형', match: 85, icon: '💻', color: '#10B981',
      conditions: '논리력↑ + 처리속도↑ + 작업기억↑',
      jobs: ['풀스택 개발자', '사이버보안 전문가', '로보틱스 엔지니어', '퀀트 트레이더'],
      guide: '코딩 교육을 놀이처럼 시작하세요. 스크래치 → 파이썬 → 프로젝트 기반 학습 순서가 이상적입니다.' },
    { type: '사회공헌형', match: 60, icon: '🌍', color: '#F59E0B',
      conditions: '공감↑ + 친화성↑ + 긍정감정↑',
      jobs: ['사회복지사', 'NGO 활동가', '심리상담사', '교육 혁신가'],
      guide: '봉사활동, 동물 돌봄, 어린이 캠프 리더 등 "누군가를 돕는 경험"을 자주 만들어주세요.' },
  ],

  futureActions: [
    '매주 1회 "왜 그럴까?" 과학 실험 놀이로 탐구 습관 형성',
    '월 2회 새로운 환경 체험 (박물관, 캠프, 워크숍)으로 개방성 강화',
    '매일 감정 일기를 통해 공감·정서 조절 능력 훈련',
  ]
};
