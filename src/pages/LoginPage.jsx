import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage({ onLogin, onGoToSignup, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle, resetPassword } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      onLogin && onLogin();
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // 1. 인앱 브라우저 감지 (Google OAuth 차단 대응)
    const userAgent = navigator.userAgent.toLowerCase();
    const isKakaotalk = /kakaotalk/i.test(userAgent);
    const isInApp = /kakaotalk|instagram|fbav|line|naver/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);

    if (isInApp) {
      if (isKakaotalk && isAndroid) {
        // 안드로이드 카카오톡: 즉시 외부 크롬 브라우저로 이탈
        window.location.href = `intent://${window.location.href.replace(/https?:\/\//i, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
        return;
      }
      // 그 외 인앱 브라우저 (iOS 카카오, 인스타 등): 외부 브라우저 사용 안내
      alert(`[안내] 현재 브라우저에서는 구글 보안 정책으로 인해 로그인이 제한됩니다.\n\n화면 우측 하단(또는 상단)의 [⠇] 메뉴 버튼을 눌러 '다른 브라우저로 열기(Safari/Chrome 등)'를 선택하신 후 다시 시도해주세요.`);
      return;
    }

    setError('');
    try {
      await loginWithGoogle();
      onLogin && onLogin();
    } catch (err) {
      setError('구글 로그인 중 오류가 발생했습니다.');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('비밀번호를 재설정할 이메일 주소를 입력해주세요.');
      return;
    }
    setError('');
    try {
      await resetPassword(email);
      alert('비밀번호 재설정 이메일을 발송했습니다. 메일함을 확인해주세요.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('가입되지 않은 이메일입니다.');
      } else if (err.code === 'auth/invalid-email') {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('비밀번호 재설정 이메일 발송에 실패했습니다.');
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated background blobs */}
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>
      <div style={styles.bgBlob3}></div>

      {/* Back button */}
      {onBack && (
        <button onClick={onBack} style={styles.backBtn}>
          <ArrowLeft size={20} color="#6d4ca6" />
        </button>
      )}

      {/* DNA Sparkle decoration */}
      <div style={styles.sparkleTop}>✨</div>
      <div style={styles.sparkleRight}>🧬</div>

      {/* Logo & Brand */}
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>🧬</div>
        <h1 style={styles.brandName}>LifeUp Kids</h1>
        <p style={styles.tagline}>우리 아이의 인생 설계 파트너</p>
      </div>

      {/* Welcome */}
      <div style={styles.welcomeSection}>
        <h2 style={styles.welcomeTitle}>다시 만나서 반가워요! 👋</h2>
        <p style={styles.welcomeSubtitle}>로그인하고 아이의 성장 여정을 이어가세요</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={styles.form}>
        {/* Email */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <Mail size={18} color="#b794f4" style={{marginRight: 12, flexShrink: 0}} />
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <Lock size={18} color="#b794f4" style={{marginRight: 12, flexShrink: 0}} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? <EyeOff size={18} color="#b794f4" /> : <Eye size={18} color="#b794f4" />}
            </button>
          </div>
        </div>

        {error && <div style={{color: '#9b3d66', fontSize: 13, marginBottom: 12, textAlign: 'center'}}>{error}</div>}

        {/* Forgot password */}
        <div style={styles.forgotRow}>
          <button type="button" onClick={handleResetPassword} style={styles.forgotBtn}>비밀번호 찾기</button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            ...styles.loginBtn,
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={styles.spinner}>⏳</span>
          ) : (
            '로그인'
          )}
        </button>
      </form>

      {/* SNS Divider */}
      <div style={styles.dividerRow}>
        <div style={styles.dividerLine}></div>
        <span style={styles.dividerText}>또는 SNS로 간편 로그인</span>
        <div style={styles.dividerLine}></div>
      </div>

      {/* Social Login */}
      <div style={styles.socialRow}>
        <button type="button" style={{...styles.socialBtn, background: '#FEE500'}}>
          <span style={{fontSize: 20, fontWeight: 800}}>K</span>
        </button>
        <button type="button" style={{...styles.socialBtn, background: '#03C75A', color: '#fff'}}>
          <span style={{fontSize: 16, fontWeight: 800}}>N</span>
        </button>
        <button type="button" onClick={handleGoogleLogin} style={{...styles.socialBtn, background: '#fff', border: '1px solid #e8e8e8'}}>
          <span style={{fontSize: 18}}>G</span>
        </button>
        <button type="button" style={{...styles.socialBtn, background: '#000', color: '#fff'}}>
          <span style={{fontSize: 18}}></span>
        </button>
      </div>

      {/* Sign up link */}
      <div style={styles.signupRow}>
        <span style={styles.signupText}>아직 회원이 아니신가요?</span>
        <button onClick={onGoToSignup} style={styles.signupLink}>회원가입</button>
      </div>

      {/* Footer */}
      <p style={styles.footer}>© 2026 LifeUp Coaching. All rights reserved.</p>

      <style>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(1.05); }
          66% { transform: translate(15px, -25px) scale(1.1); }
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-10px) rotate(15deg); opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(183, 148, 244, 0.3); }
          50% { box-shadow: 0 12px 48px rgba(183, 148, 244, 0.5); }
        }
        .login-input::placeholder {
          color: #adadab;
          font-weight: 400;
        }
        .login-input:focus {
          outline: none;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    maxWidth: 480,
    margin: '0 auto',
    background: 'linear-gradient(165deg, #faf9fc 0%, #f5f0ff 30%, #fff0f5 60%, #faf9fc 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 24px 40px',
    position: 'relative',
    overflow: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    fontFamily: "'Manrope', 'Pretendard', -apple-system, sans-serif",
  },
  bgBlob1: {
    position: 'absolute',
    top: '-60px',
    right: '-40px',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(183,148,244,0.25) 0%, transparent 70%)',
    animation: 'floatBlob1 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '100px',
    left: '-50px',
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(254,141,186,0.2) 0%, transparent 70%)',
    animation: 'floatBlob2 10s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgBlob3: {
    position: 'absolute',
    top: '40%',
    right: '-30px',
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(236,232,101,0.15) 0%, transparent 70%)',
    animation: 'floatBlob1 12s ease-in-out infinite reverse',
    pointerEvents: 'none',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sparkleTop: {
    position: 'absolute',
    top: 80,
    left: 40,
    fontSize: 24,
    animation: 'sparkleFloat 3s ease-in-out infinite',
    pointerEvents: 'none',
  },
  sparkleRight: {
    position: 'absolute',
    top: 120,
    right: 30,
    fontSize: 28,
    animation: 'sparkleFloat 4s ease-in-out infinite 1s',
    pointerEvents: 'none',
  },
  logoSection: {
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: 8,
    filter: 'drop-shadow(0 4px 12px rgba(183,148,244,0.3))',
  },
  brandName: {
    fontSize: 28,
    fontWeight: 800,
    background: 'linear-gradient(135deg, #6d4ca6, #b794f4, #fe8dba)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.02em',
    margin: 0,
  },
  tagline: {
    fontSize: 13,
    color: '#7b7482',
    marginTop: 4,
    fontWeight: 500,
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#2e2f2d',
    margin: '0 0 6px',
    letterSpacing: '-0.01em',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#7b7482',
    margin: 0,
    fontWeight: 400,
  },
  form: {
    width: '100%',
    maxWidth: 380,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: 9999,
    padding: '14px 20px',
    border: '1.5px solid rgba(183,148,244,0.15)',
    transition: 'all 0.3s ease',
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: 15,
    color: '#2e2f2d',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 500,
    outline: 'none',
  },
  eyeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    marginLeft: 8,
    display: 'flex',
    alignItems: 'center',
  },
  forgotRow: {
    textAlign: 'right',
    marginBottom: 24,
  },
  forgotBtn: {
    background: 'none',
    border: 'none',
    color: '#9b3d66',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Manrope', sans-serif",
  },
  loginBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: 9999,
    border: 'none',
    background: 'linear-gradient(135deg, #6d4ca6 0%, #b794f4 50%, #fe8dba 100%)',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: "'Manrope', sans-serif",
    letterSpacing: '0.02em',
    transition: 'all 0.3s ease',
    animation: 'pulseGlow 3s ease-in-out infinite',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 380,
    margin: '28px 0 20px',
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: 'linear-gradient(90deg, transparent, #ccc3d2, transparent)',
  },
  dividerText: {
    fontSize: 12,
    color: '#7b7482',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  socialRow: {
    display: 'flex',
    gap: 16,
    marginBottom: 32,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "'Manrope', sans-serif",
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  signupRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#7b7482',
    fontWeight: 400,
  },
  signupLink: {
    background: 'none',
    border: 'none',
    color: '#9b3d66',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: "'Manrope', sans-serif",
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  },
  footer: {
    fontSize: 11,
    color: '#adadab',
    marginTop: 'auto',
    fontWeight: 400,
  },
  spinner: {
    display: 'inline-block',
    animation: 'sparkleFloat 1s ease-in-out infinite',
  },
};
