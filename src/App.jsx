import React, { useState } from 'react';
import { Home, LineChart, CheckCircle, User as UserIcon, Bell, Apple, MessageCircle, BookOpen, CheckCircle2, Circle, XCircle, Moon, Code2, GraduationCap, Trophy, ExternalLink, BrainCircuit, Blocks, Target, Lightbulb, CalendarHeart, Dna, ArrowRight } from 'lucide-react';
import AnalysisPage from './pages/AnalysisPage';
import CoachingPage from './pages/CoachingPage';
import EduPage from './pages/EduPage';
import HealthPage from './pages/HealthPage';
import DiaryPage from './pages/DiaryPage';
import MyPage from './pages/MyPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatBot from './components/ChatBot';
import AdBanner from './components/AdBanner';
import { ToastProvider } from './components/Toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';

function HomePage({ onNavigate }) {
  const { userData } = useAuth();

  if (userData && userData.hasAnalysis === false) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', height: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Dna size={48} color="#D4D4D4" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: '#1A1C1C' }}>아직 분석과 코칭을 신청하지 않았습니다</h2>
        <p style={{ fontSize: 14, color: '#74777F', marginBottom: 32, lineHeight: 1.6 }}>
          아이의 유전자 속에 숨겨진 가능성,<br/>
          지금 바로 확인하고 맞춤 코칭을 시작해 보세요.
        </p>
        <div onClick={() => onNavigate('shop')} style={{
          background: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
          color: 'white',
          padding: '16px 32px',
          borderRadius: 99,
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(99,102,241,0.3)'
        }}>
          분석 키트 구매/신청하기 <ArrowRight size={18} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header Profile & Role Model Section */}
      <header className="header">
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start'}}>
          <div>
            <div className="welcome-title">환영합니다, 윤서 어머님</div>
            <h1 className="child-profile">
              윤서 <span className="child-badge">7세 / 유아기</span>
            </h1>
          </div>
          <div onClick={() => onNavigate('health')} style={{cursor:'pointer', background:'#EFF6FF', borderRadius:99, padding:8}}>
            <Bell color="var(--primary)" size={22} />
          </div>
        </div>

        {/* 3 Genetic Strengths + Role Model Card */}
        <div className="role-model-card">
          <div className="strengths-row">
            <span className="strength-chip"><BrainCircuit size={14}/> 논리력 상위 1%</span>
            <span className="strength-chip"><Blocks size={14}/> 공간지각력 탁월</span>
            <span className="strength-chip"><Target size={14}/> 과제집중력 강력</span>
          </div>
          
          <div className="role-model-content">
            <div className="role-model-avatar"><UserIcon size={24}/></div>
            <div className="role-model-text">
              <div className="role-model-label">윤서의 유전자형 성공 롤모델</div>
              <div className="role-model-name">데미스 허사비스 (구글 딥마인드 CEO)</div>
              <div className="role-model-fact"><Lightbulb size={14} style={{display:'inline', marginBottom:'-2px'}}/> 뉴스 보도: "4세 체스 시작, 8세 프로그래밍 독학"</div>
            </div>
          </div>
        </div>
      </header>

      {/* 7세 맞춤 고민 & 솔루션 */}
      <section className="section">
        <h3 className="section-header">7세 또래 학부모 상담소</h3>
        <div className="scroll-row">
          <div className="concern-card">
            <span className="concern-tag">양육</span>
            <div className="concern-title">고집이 너무 쎄졌어요, 무조건 안 한대요.</div>
            <div className="concern-solution">
              자아가 강해지는 시기입니다. 억지로 시키기보다 "이거 먼저 할래? 저거 먼저 할래?" 와 같이 선택권을 주어 통제감을 느끼게 해주세요.
            </div>
          </div>
          <div className="concern-card">
            <span className="concern-tag">교육</span>
            <div className="concern-title">논리력이 뛰어난데, 한글 떼기가 느려요.</div>
            <div className="concern-solution">
              원리가 먼저 이해되어야 하는 성향입니다. 통글자 암기보다는 자음, 모음의 결합 원리를 자석 블록 등으로 보여주면 습득이 빠릅니다.
            </div>
          </div>
          <div className="concern-card">
            <span className="concern-tag">대화</span>
            <div className="concern-title">친구 물건을 자꾸 말 없이 가져가요.</div>
            <div className="concern-solution">
              빌려주는 개념을 아직 정확히 모를 수 있습니다. "이건 친구 꺼라 빌려달라고 먼저 말해야 해" 라고 명확한 룰을 알려주세요.
            </div>
          </div>
        </div>
      </section>

      {/* Main Coaching Section */}
      <section className="section">
        <div className="coaching-board">
          <div className="coaching-header">
            <h3>오늘 저녁의 코칭</h3>
            <div className="coaching-subtitle">맞춤형 플랜: 유아기 + 논리력 발달형</div>
          </div>

          <div className="task-group">
            <div className="task-group-title"><Apple size={18} /> 오늘의 활동 미션</div>
            <div className="checklist-item">
              <Circle size={20} color="var(--text-muted)" />
              <div className="checklist-text">종류 섞인 장난감 바구니에서, 크고 작은 것 2그룹으로만 분류해보기</div>
            </div>
            <div className="checklist-item">
              <Circle size={20} color="var(--text-muted)" />
              <div className="checklist-text">저녁 식사 준비할 때 수저 3세트 직접 짝맞춰 놓아보기</div>
            </div>
            <div className="checklist-item">
              <CheckCircle2 size={20} color="var(--secondary)" />
              <div className="checklist-text" style={{textDecoration: 'line-through', color: 'var(--text-muted)'}}>
                오늘 입은 옷 스스로 바구니에 골인시키기
              </div>
            </div>
          </div>

          <div className="task-group">
            <div className="task-group-title"><MessageCircle size={18} /> 오늘의 대화법</div>
            <div className="ba-container">
              <div className="ba-card ba-before">
                <XCircle size={20} color="#991B1B" />
                <div className="ba-content">
                  <div className="ba-label">Before</div>
                  <div className="ba-text">"그냥 엄마가 하라는 대로 해!"</div>
                </div>
              </div>
              <div className="ba-card ba-after">
                <CheckCircle2 size={20} color="#166534" />
                <div className="ba-content">
                  <div className="ba-label">After</div>
                  <div className="ba-text">"윤서는 어떻게 생각해서 그렇게 한 거야? 이유를 말해줄래?"</div>
                </div>
              </div>
            </div>
          </div>

          <div className="task-group">
            <div className="task-group-title"><BookOpen size={18} /> 오늘의 학습 미션</div>
            <div className="checklist-item">
              <Circle size={20} color="var(--text-muted)" />
              <div className="checklist-text">잠들기 전 인과관계가 뚜렷한(왜 그럴까?) 그림책 1권 읽기</div>
            </div>
            <div className="checklist-item">
              <Circle size={20} color="var(--text-muted)" />
              <div className="checklist-text">재미있는 퍼즐 20피스짜리 함께 맞추기</div>
            </div>
            <div className="checklist-item">
              <Circle size={20} color="var(--text-muted)" />
              <div className="checklist-text">오늘 하루 제일 재미있었던 순서대로 3가지 말해보기</div>
            </div>
          </div>

          <div className="task-group" style={{marginBottom: 0}}>
            <div className="health-card">
              <Moon size={20} />
              <div className="health-text">오늘의 건강 체크: 저녁 공복에 유산균 꼭 챙겨먹이기</div>
            </div>
          </div>
        </div>
      </section>

      {/* 맞춤형 진로 로드맵 */}
      <section className="section">
        <div style={{background:'linear-gradient(135deg,#1A365D,#2D4A7A)', borderRadius:20, padding:20, color:'white'}}>
          <div style={{fontSize:12, opacity:0.8, marginBottom:4}}>🧬 유전자형 강점 기반</div>
          <h3 style={{fontSize:18, margin:'0 0 6px', color:'white'}}>맞춤형 진로 로드맵</h3>
          <div style={{fontSize:13, opacity:0.9, lineHeight:1.5, marginBottom:16}}>
            윤서의 유전적 강점인 <strong>논리력 · 공간지각력 · 과제집중력</strong>을 극대화하는 성장 방향입니다.
          </div>
          <div style={{display:'flex', gap:8}}>
            {[{label:'현재', value:'적성 발견기', color:'#22C55E'},{label:'5년후', value:'심화 탐색기', color:'#3B82F6'},{label:'10년후', value:'전문성 구축', color:'#F59E0B'}].map((s,i)=>(
              <div key={i} style={{flex:1, background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 8px', textAlign:'center'}}>
                <div style={{fontSize:10, opacity:0.8}}>{s.label}</div>
                <div style={{fontSize:12, fontWeight:700, marginTop:2}}>{s.value}</div>
                <div style={{width:6, height:6, borderRadius:99, background:s.color, margin:'6px auto 0'}}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이달의 주요 목표 (유전자형 강점 기반) */}
      <section className="timeline-section">
        <h2 className="timeline-header">이달의 주요 목표</h2>
        <div style={{fontSize:12, color:'#6366F1', fontWeight:600, margin:'-8px 0 16px 0', padding:'0 24px'}}>
          🧬 논리력 · 공간지각력 · 과제집중력 강점을 갈고닦는 목표
        </div>
        
        {/* 추천 활동 */}
        <div className="timeline-item">
          <div className="timeline-icon-container icon-green">
            <Code2 size={20} />
          </div>
          <div className="timeline-card">
            <span className="timeline-tag tag-activity">추천 활동</span>
            <div className="timeline-title">스크래치 코딩 + 레고 테크닉</div>
            <div className="timeline-desc">
              <strong>🧬 논리력 상위 1%</strong>를 살리는 활동입니다. 블록 코딩으로 인과관계와 순차적 사고를 훈련하고, 레고 테크닉으로 공간지각력을 입체적으로 확장합니다.
            </div>
          </div>
        </div>

        {/* 추천 학원 */}
        <div className="timeline-item">
          <div className="timeline-icon-container icon-navy">
            <GraduationCap size={20} />
          </div>
          <div className="timeline-card">
            <span className="timeline-tag tag-academy">추천 학원</span>
            <div className="timeline-title">사고력 수학 + 과학 실험 교실</div>
            <div className="timeline-desc">
              <strong>🧬 패턴 인식 ✅ + 공간 추론 ✅</strong> 강점에 최적화된 교구 활용 수학과, 가설 → 실험 → 결론의 과학적 사고 훈련을 병행합니다.
            </div>
            <div className="timeline-btn">
              학원 매칭 상세보기 <ExternalLink size={14} />
            </div>
          </div>
        </div>

        {/* 추천 건강 체크 */}
        <div className="timeline-item">
          <div className="timeline-icon-container icon-yellow">
            <Trophy size={20} />
          </div>
          <div className="timeline-card">
            <span className="timeline-tag tag-health">추천 건강 체크</span>
            <div className="timeline-title">예방접종 (DTaP 5차, MMR 2차) + 성장 지표</div>
            <div className="timeline-desc">
              <strong>🧬 면역 반응 유전자 보통</strong> — 접종 스케줄을 지연 없이 지켜주세요. 키·몸무게 성장곡선 상위 30% 유지 여부도 함께 체크합니다.
            </div>
            <div className="timeline-btn">
              우리동네 소아과 예약하기 <ExternalLink size={14} />
            </div>
          </div>
        </div>

        {/* 추천 독서 */}
        <div className="timeline-item">
          <div className="timeline-icon-container" style={{background:'#8B5CF6', color:'white'}}>
            <BookOpen size={20} />
          </div>
          <div className="timeline-card">
            <span className="timeline-tag" style={{background:'#F3E8FF', color:'#7C3AED'}}>추천 독서</span>
            <div className="timeline-title">논리·탐구 사고력을 키우는 그림책</div>
            <div className="timeline-desc">
              <strong>🧬 과제집중력 강력</strong>한 윤서에게 인과관계와 추론이 요구되는 스토리를 추천합니다.
            </div>
            <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
              {[
                {title:'「왜 그럴까?」 시리즈 (과학 탐구 그림책)', reason:'논리력 강점 → 원인과 결과를 탐구하는 습관 강화'},
                {title:'「이상한 나라의 수학 여행」', reason:'공간지각력 강점 → 수학적 상상력과 패턴 발견 훈련'},
                {title:'「누가 내 머리 위에 똥을 쌌어?」', reason:'추론 능력 → 단서로 범인을 찾아가는 탐정식 사고'},
              ].map((b,i) => (
                <div key={i} style={{background:'#F9FAFB', borderRadius:10, padding:'8px 12px'}}>
                  <div style={{fontSize:13, fontWeight:700, color:'#1A1C1C'}}>{b.title}</div>
                  <div style={{fontSize:11, color:'#6366F1', marginTop:2}}>🧬 {b.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추천 학습 교재 */}
        <div className="timeline-item">
          <div className="timeline-icon-container" style={{background:'#EC4899', color:'white'}}>
            <Target size={20} />
          </div>
          <div className="timeline-card">
            <span className="timeline-tag" style={{background:'#FCE7F3', color:'#DB2777'}}>추천 학습 교재</span>
            <div className="timeline-title">유전자형 강점 심화 교재</div>
            <div className="timeline-desc">
              <strong>🧬 논리력 + 공간지각력 + 집중력</strong>을 동시에 키우는 학습 교재를 엄선했습니다.
            </div>
            <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
              {[
                {title:'플레이팩토 「사고력 수학」 7세 단계', reason:'패턴 인식 강점 → 교구 활용 문제해결력 심화', type:'수학'},
                {title:'「한글이 야호」 원리 학습 워크북', reason:'논리 우선형 → 자모 결합 원리 이해 방식', type:'국어'},
                {title:'코딩 학습지 「엔트리 첫걸음」', reason:'논리력 상위 1% → 프로그래밍 사고 체계 구축', type:'코딩'},
              ].map((b,i) => (
                <div key={i} style={{background:'#F9FAFB', borderRadius:10, padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontSize:13, fontWeight:700, color:'#1A1C1C'}}>{b.title}</div>
                    <div style={{fontSize:11, color:'#EC4899', marginTop:2}}>🧬 {b.reason}</div>
                  </div>
                  <span style={{fontSize:10, padding:'2px 8px', borderRadius:99, background:'#F3F3F3', fontWeight:700, flexShrink:0}}>{b.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 광고 배너 */}
      <AdBanner pageKey="home"/>
    </>
  );
}

function AppContent() {
  const [page, setPage] = useState('landing');
  const [selectedKit, setSelectedKit] = useState(null);
  const { currentUser, logout } = useAuth();

  // Spring Boot에서 임베드된 모드인지 감지
  const isEmbedded = window.location.pathname.startsWith('/app') || 
                     new URLSearchParams(window.location.search).get('embedded') === 'true';

  React.useEffect(() => {
    // 임베드 모드: Spring Boot에서 이미 인증됨 → 바로 홈으로
    if (isEmbedded && ['landing', 'login', 'signup'].includes(page)) {
      setPage('home');
      return;
    }
    // 이미 인증된 유저가 퍼블릭 페이지에 있다면 홈으로
    if (currentUser && ['landing', 'login', 'signup'].includes(page)) {
      setPage('home');
    }
    // 미인증 유저가 보호된 페이지에 있다면 랜딩으로 (임베드 모드에서는 제외)
    else if (!currentUser && !isEmbedded && !['landing', 'login', 'signup', 'shop', 'checkout'].includes(page)) {
      // (스토어 관련은 로그인하지 않아도 볼 수 있도록 허용하거나, 로그인 요구 시 includes에서 빼기. 일단 로그인 안 해도 접근 불가로 통일)
      setPage('landing');
    }
  }, [currentUser, page, isEmbedded]);

  return (
    <div className="app-container">
      {page === 'landing' && <LandingPage onEnter={() => setPage('login')} />}
      {page === 'login' && (
        <LoginPage
          onLogin={() => setPage('home')}
          onGoToSignup={() => setPage('signup')}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'signup' && (
        <SignupPage
          onComplete={() => setPage('home')}
          onGoToLogin={() => setPage('login')}
          onBack={() => setPage('login')}
        />
      )}
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'analysis' && <AnalysisPage onBack={() => setPage('home')} />}
      {page === 'coaching' && <CoachingPage onBack={() => setPage('home')} />}
      {page === 'edu' && <EduPage onBack={() => setPage('home')} />}
      {page === 'health' && <HealthPage onBack={() => setPage('home')} />}
      {page === 'diary' && <DiaryPage onBack={() => setPage('home')} />}
      {page === 'mypage' && (
        <MyPage 
          onBack={() => setPage('home')} 
          onGoToShop={() => setPage('shop')} 
          onLogout={() => { logout(); setPage('landing'); }} 
        />
      )}
      
      {/* 쇼핑 및 결제 라우팅 */}
      {page === 'shop' && (
        <ShopPage 
          onBack={() => setPage('home')} 
          onCheckout={(kit) => { setSelectedKit(kit); setPage('checkout'); }} 
        />
      )}
      {page === 'checkout' && (
        <CheckoutPage 
          kit={selectedKit} 
          onBack={() => setPage('shop')} 
          onComplete={() => setPage('home')} 
        />
      )}

      {/* AI 코칭 챗봇 — 메인 앱 페이지에서만 표시 */}
      {!['landing','login','signup'].includes(page) && <ChatBot />}

      {/* Bottom Navigation — 인증/결제 플로우에서는 숨김 */}
      {!['landing','login','signup','checkout'].includes(page) && (
      <nav className="bottom-nav">
        <div className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>
          <Home size={22} />
          <span className="nav-label">홈</span>
        </div>
        <div className={`nav-item ${page === 'analysis' ? 'active' : ''}`} onClick={() => setPage('analysis')}>
          <LineChart size={22} />
          <span className="nav-label">분석</span>
        </div>
        <div className={`nav-item ${page === 'coaching' ? 'active' : ''}`} onClick={() => setPage('coaching')}>
          <CheckCircle size={22} />
          <span className="nav-label">코칭</span>
        </div>
        <div className={`nav-item ${page === 'edu' ? 'active' : ''}`} onClick={() => setPage('edu')}>
          <BookOpen size={22} />
          <span className="nav-label">학습</span>
        </div>
        <div className={`nav-item ${page === 'diary' ? 'active' : ''}`} onClick={() => setPage('diary')}>
          <CalendarHeart size={22} />
          <span className="nav-label">성장일기</span>
        </div>
        <div className={`nav-item ${page === 'mypage' ? 'active' : ''}`} onClick={() => setPage('mypage')}>
          <UserIcon size={22} />
          <span className="nav-label">MY</span>
        </div>
      </nav>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
