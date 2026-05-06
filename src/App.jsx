import React, { useState } from 'react';
import { Home, LineChart, CheckCircle, User as UserIcon, Bell, Apple, MessageCircle, BookOpen, CheckCircle2, Circle, XCircle, Moon, Code2, GraduationCap, Trophy, ExternalLink, BrainCircuit, Blocks, Target, Lightbulb, CalendarHeart, Dna, ArrowRight, LogOut } from 'lucide-react';
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

// HomePage has been moved to AnalysisPage and index.html

function AppContent() {
  const getInitialPage = () => {
    const path = window.location.pathname;
    if (path.includes('/mypage')) return 'mypage';
    if (path.includes('/coaching')) return 'coaching';
    if (path.includes('/analysis')) return 'analysis';
    if (path.includes('/edu')) return 'edu';
    if (path.includes('/diary')) return 'diary';
    if (path.includes('/home')) return 'analysis';
    return 'landing';
  };
  const [page, setPage] = useState(getInitialPage());
  const [selectedKit, setSelectedKit] = useState(null);
  const { currentUser, logout } = useAuth();

  // Spring Boot에서 임베드된 모드인지 감지
  const isEmbedded = window.location.pathname.startsWith('/app') || 
                     new URLSearchParams(window.location.search).get('embedded') === 'true';

  React.useEffect(() => {
    // 임베드 모드: Spring Boot에서 이미 인증됨 → 바로 분석으로
    if (isEmbedded && ['landing', 'login', 'signup'].includes(page)) {
      setPage('analysis');
      return;
    }
    // 이미 인증된 유저가 퍼블릭 페이지에 있다면 분석으로
    if (currentUser && ['landing', 'login', 'signup'].includes(page)) {
      setPage('analysis');
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
          onLogin={() => setPage('analysis')}
          onGoToSignup={() => setPage('signup')}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'signup' && (
        <SignupPage
          onComplete={() => setPage('analysis')}
          onGoToLogin={() => setPage('login')}
          onBack={() => setPage('login')}
        />
      )}
      {/* HomePage is removed */}
      {page === 'analysis' && <AnalysisPage onBack={() => setPage('analysis')} />}
      {page === 'coaching' && <CoachingPage onBack={() => setPage('analysis')} />}
      {page === 'edu' && <EduPage onBack={() => setPage('analysis')} />}
      {page === 'health' && <HealthPage onBack={() => setPage('analysis')} />}
      {page === 'diary' && <DiaryPage onBack={() => setPage('analysis')} />}
      {page === 'mypage' && (
        <MyPage 
          onBack={() => setPage('analysis')} 
          onGoToShop={() => setPage('shop')} 
          onLogout={async () => { await logout(); window.location.href = '/'; }} 
        />
      )}
      
      {/* 쇼핑 및 결제 라우팅 */}
      {page === 'shop' && (
        <ShopPage 
          onBack={() => setPage('analysis')} 
          onCheckout={(kit) => { setSelectedKit(kit); setPage('checkout'); }} 
        />
      )}
      {page === 'checkout' && (
        <CheckoutPage 
          kit={selectedKit} 
          onBack={() => setPage('shop')} 
          onComplete={() => setPage('analysis')} 
        />
      )}

      {/* AI 코칭 챗봇 — 메인 앱 페이지에서만 표시 */}
      {!['landing','login','signup'].includes(page) && <ChatBot />}

      {/* Bottom Navigation — 인증/결제 플로우에서는 숨김 */}
      {!['landing','login','signup','checkout'].includes(page) && (
      <nav className="bottom-nav">
        <div className={`nav-item`} onClick={() => window.location.href = '/'}>
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
        {/*
        <div className={`nav-item ${page === 'diary' ? 'active' : ''}`} onClick={() => setPage('diary')}>
          <CalendarHeart size={22} />
          <span className="nav-label">성장일기</span>
        </div>
        */}
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
