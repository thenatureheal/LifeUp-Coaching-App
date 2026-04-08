import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff, Phone, Mail, User, Lock, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function SignupPage({ onComplete, onGoToLogin, onBack }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '',
    verificationCode: '', agreeAll: false, agreeTerms: false, agreePrivacy: false, agreeMarketing: false,
    childName: '', childBirthdate: '', childGender: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const updateForm = (key, value) => {
    const newData = { ...formData, [key]: value };
    if (key === 'password') {
      let s = 0;
      if (value.length >= 6) s++;
      if (value.length >= 10) s++;
      if (/[A-Z]/.test(value) && /[0-9]/.test(value)) s++;
      setPasswordStrength(s);
    }
    if (key === 'agreeAll') {
      newData.agreeTerms = value;
      newData.agreePrivacy = value;
      newData.agreeMarketing = value;
    }
    setFormData(newData);
    setError(''); // 입력 시 에러 초기화
  };

  const sendVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
    }, 1500);
  };

  const strengthColors = ['#e3e2e6', '#ff9286', '#ece865', '#62fae3'];
  const strengthLabels = ['', '약함', '보통', '강함'];

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.agreeTerms) {
        setError('필수 정보를 입력해주세요.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true);
      try {
        await signup(formData.email, formData.password, formData.name);
        setStep(3);
      } catch (err) {
        setError(err.message.includes('email-already-in-use') ? '이미 가입된 이메일입니다.' : '회원가입에 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    } else {
      onComplete && onComplete();
    }
  };

  return (
    <div style={styles.container}>
      {/* Background blobs */}
      <div style={styles.bgBlob1}></div>
      <div style={styles.bgBlob2}></div>

      {/* Header */}
      <div style={styles.header}>
        <button onClick={step > 1 ? () => setStep(step -1) : onBack} style={styles.backBtn}>
          <ArrowLeft size={20} color="#6d4ca6" />
        </button>
        <h1 style={styles.headerTitle}>회원가입</h1>
        <div style={{width:40}}></div>
      </div>

      {/* Progress Indicator */}
      <div style={styles.progressRow}>
        {[{label: '부모정보', n: 1}, {label: '자녀정보', n: 2}, {label: '완료', n: 3}].map((s) => (
          <div key={s.n} style={styles.progressItem}>
            <div style={{
              ...styles.progressDot,
              background: step >= s.n
                ? 'linear-gradient(135deg, #6d4ca6, #b794f4)'
                : '#e3e2e6',
              color: step >= s.n ? '#fff' : '#7b7482',
              boxShadow: step === s.n ? '0 4px 16px rgba(109,76,166,0.3)' : 'none',
              transform: step === s.n ? 'scale(1.15)' : 'scale(1)',
            }}>
              {step > s.n ? <Check size={14} /> : s.n}
            </div>
            <span style={{
              fontSize: 11,
              fontWeight: step === s.n ? 700 : 500,
              color: step >= s.n ? '#6d4ca6' : '#adadab',
              marginTop: 6,
            }}>{s.label}</span>
          </div>
        ))}
        <div style={styles.progressLine}>
          <div style={{
            height: '100%',
            width: `${((step - 1) / 2) * 100}%`,
            background: 'linear-gradient(90deg, #6d4ca6, #b794f4)',
            borderRadius: 4,
            transition: 'width 0.5s ease',
          }}></div>
        </div>
      </div>

      {/* Step 1 - Parent Info */}
      {step === 1 && (
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>부모님 정보를 입력해주세요 ✨</h2>

          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>이름</label>
            <div style={styles.inputWrapper}>
              <User size={18} color="#b794f4" style={{marginRight:12, flexShrink:0}} />
              <input
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={(e) => updateForm('name', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>이메일</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} color="#b794f4" style={{marginRight:12, flexShrink:0}} />
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => updateForm('email', e.target.value)}
                style={styles.input}
              />
              {formData.email.includes('@') && formData.email.includes('.') && (
                <Check size={18} color="#3cddc7" />
              )}
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>비밀번호</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} color="#b794f4" style={{marginRight:12, flexShrink:0}} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상, 영문+숫자 조합"
                value={formData.password}
                onChange={(e) => updateForm('password', e.target.value)}
                style={styles.input}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                {showPassword ? <EyeOff size={18} color="#b794f4" /> : <Eye size={18} color="#b794f4" />}
              </button>
            </div>
            {/* Password Strength */}
            {formData.password && (
              <div style={styles.strengthRow}>
                <div style={styles.strengthBar}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: passwordStrength >= i ? strengthColors[i] : '#e8e8e8',
                      transition: 'all 0.3s ease',
                    }}></div>
                  ))}
                </div>
                <span style={{fontSize:11, color: strengthColors[passwordStrength], fontWeight:600}}>
                  {strengthLabels[passwordStrength]}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>비밀번호 확인</label>
            <div style={styles.inputWrapper}>
              <Shield size={18} color="#b794f4" style={{marginRight:12, flexShrink:0}} />
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.confirmPassword}
                onChange={(e) => updateForm('confirmPassword', e.target.value)}
                style={styles.input}
              />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <Check size={18} color="#3cddc7" />
              )}
            </div>
          </div>

          {/* Phone */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>휴대폰 번호</label>
            <div style={{display:'flex', gap:8}}>
              <div style={{...styles.inputWrapper, flex:1}}>
                <Phone size={18} color="#b794f4" style={{marginRight:12, flexShrink:0}} />
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => updateForm('phone', e.target.value)}
                  style={styles.input}
                />
              </div>
              <button
                onClick={sendVerification}
                disabled={isVerified}
                style={{
                  ...styles.verifyBtn,
                  background: isVerified ? '#3cddc7' : 'linear-gradient(135deg, #6d4ca6, #b794f4)',
                  color: '#fff',
                }}
              >
                {isVerifying ? '⏳' : isVerified ? '✓ 인증완료' : '인증번호 발송'}
              </button>
            </div>
          </div>

          {/* Agreement */}
          <div style={styles.agreementSection}>
            <label style={styles.agreeAllRow} onClick={() => updateForm('agreeAll', !formData.agreeAll)}>
              <div style={{
                ...styles.checkbox,
                background: formData.agreeAll ? 'linear-gradient(135deg, #6d4ca6, #b794f4)' : '#e3e2e6',
              }}>
                {formData.agreeAll && <Check size={12} color="#fff" />}
              </div>
              <span style={{fontWeight:700, fontSize:15, color:'#2e2f2d'}}>전체 동의</span>
            </label>

            {[
              {key:'agreeTerms', label:'이용약관 동의', required: true},
              {key:'agreePrivacy', label:'개인정보 처리방침 동의', required: true},
              {key:'agreeMarketing', label:'마케팅 수신 동의', required: false},
            ].map(item => (
              <label key={item.key} style={styles.agreeRow} onClick={(e) => {
                e.stopPropagation();
                updateForm(item.key, !formData[item.key]);
              }}>
                <div style={{
                  ...styles.checkbox,
                  width: 20,
                  height: 20,
                  background: formData[item.key] ? '#b794f4' : '#e3e2e6',
                }}>
                  {formData[item.key] && <Check size={10} color="#fff" />}
                </div>
                <span style={{fontSize:13, color:'#5b5c5a', flex:1}}>
                  {item.label}
                  <span style={{color: item.required ? '#9b3d66' : '#adadab', fontSize:11, marginLeft:4}}>
                    ({item.required ? '필수' : '선택'})
                  </span>
                </span>
                <ChevronRight size={14} color="#adadab" />
              </label>
            ))}
          </div>

          {error && <div style={{color: '#9b3d66', fontSize: 13, marginTop: 12, textAlign: 'center'}}>{error}</div>}
        </div>
      )}

      {/* Step 2 - Child Info */}
      {step === 2 && (
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>우리 아이 정보를 알려주세요 🌱</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>아이 이름</label>
            <div style={styles.inputWrapper}>
              <span style={{fontSize:18, marginRight:12}}>👶</span>
              <input
                placeholder="아이 이름을 입력해주세요"
                value={formData.childName}
                onChange={(e) => updateForm('childName', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>생년월일</label>
            <div style={styles.inputWrapper}>
              <span style={{fontSize:18, marginRight:12}}>📅</span>
              <input
                type="date"
                value={formData.childBirthdate}
                onChange={(e) => updateForm('childBirthdate', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>성별</label>
            <div style={{display:'flex', gap:12}}>
              {['남아', '여아'].map(g => (
                <button
                  key={g}
                  onClick={() => updateForm('childGender', g)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 9999,
                    border: 'none',
                    background: formData.childGender === g
                      ? 'linear-gradient(135deg, #6d4ca6, #b794f4)'
                      : 'rgba(255,255,255,0.7)',
                    color: formData.childGender === g ? '#fff' : '#5b5c5a',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'Manrope', sans-serif",
                    backdropFilter: 'blur(8px)',
                    boxShadow: formData.childGender === g ? '0 4px 16px rgba(109,76,166,0.3)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {g === '남아' ? '👦 ' : '👧 '}{g}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(183,148,244,0.08), rgba(254,141,186,0.08))',
            borderRadius: 20,
            padding: 20,
            marginTop: 16,
            textAlign: 'center',
          }}>
            <p style={{fontSize:13, color:'#5b5c5a', margin:0, lineHeight:1.6}}>
              📋 유전자 분석 키트가 도착하면<br/>
              아이의 상세 정보를 추가로 입력할 수 있어요
            </p>
          </div>

          {error && <div style={{color: '#9b3d66', fontSize: 13, marginTop: 12, textAlign: 'center'}}>{error}</div>}
        </div>
      )}

      {/* Step 3 - Complete */}
      {step === 3 && (
        <div style={{...styles.formSection, textAlign:'center', paddingTop:40}}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6d4ca6, #b794f4, #fe8dba)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: 48,
            boxShadow: '0 12px 40px rgba(109,76,166,0.25)',
          }}>
            🎉
          </div>
          <h2 style={{fontSize:24, fontWeight:800, color:'#2e2f2d', margin:'0 0 8px'}}>
            가입이 완료되었어요!
          </h2>
          <p style={{fontSize:14, color:'#7b7482', margin:'0 0 12px', lineHeight:1.6}}>
            {formData.childName || '아이'}의 인생 설계를 시작할 준비가 되었습니다 ✨
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: 20,
            padding: 20,
            margin: '24px 0',
          }}>
            <p style={{fontSize:13, color:'#5b5c5a', margin:0, lineHeight:1.6}}>
              🧬 <strong>유전자 분석 키트</strong>를 주문하면<br/>
              850+ 항목의 초개인화 분석을 받을 수 있어요
            </p>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div style={{width:'100%', maxWidth:380, marginTop:'auto', paddingTop:24}}>
        <button onClick={handleNext} style={{...styles.ctaBtn, opacity: isLoading ? 0.7 : 1}} disabled={isLoading}>
          {isLoading ? '가입 중...' : (step === 3 ? '앱 시작하기 🚀' : '다음 단계로')}
        </button>
      </div>

      {/* Bottom link */}
      {step === 1 && (
        <div style={styles.bottomRow}>
          <span style={{fontSize:13, color:'#7b7482'}}>이미 회원이신가요?</span>
          <button onClick={onGoToLogin} style={styles.loginLink}>로그인</button>
        </div>
      )}

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
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(183, 148, 244, 0.3); }
          50% { box-shadow: 0 12px 48px rgba(183, 148, 244, 0.5); }
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
    padding: '0 24px 40px',
    position: 'relative',
    overflow: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    fontFamily: "'Manrope', 'Pretendard', -apple-system, sans-serif",
  },
  bgBlob1: {
    position: 'absolute', top: '-60px', right: '-40px', width: 200, height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(183,148,244,0.2) 0%, transparent 70%)',
    animation: 'floatBlob1 8s ease-in-out infinite', pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute', bottom: '80px', left: '-50px', width: 180, height: 180,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(254,141,186,0.15) 0%, transparent 70%)',
    animation: 'floatBlob2 10s ease-in-out infinite', pointerEvents: 'none',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', maxWidth: 380, padding: '16px 0', position: 'sticky', top: 0,
    zIndex: 10,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18, fontWeight: 700, color: '#2e2f2d', margin: 0,
  },
  progressRow: {
    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    width: '100%', maxWidth: 320, marginBottom: 32, position: 'relative', gap: 0,
  },
  progressItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1,
  },
  progressDot: {
    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: 13, fontWeight: 700, transition: 'all 0.3s ease',
  },
  progressLine: {
    position: 'absolute', top: 16, left: '17%', right: '17%', height: 3,
    background: '#e3e2e6', borderRadius: 4, zIndex: 1,
  },
  formSection: {
    width: '100%', maxWidth: 380,
  },
  sectionTitle: {
    fontSize: 20, fontWeight: 700, color: '#2e2f2d', margin: '0 0 24px',
    letterSpacing: '-0.01em',
  },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 13, fontWeight: 600, color: '#5b5c5a', marginBottom: 8, display: 'block',
  },
  inputWrapper: {
    display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px)', borderRadius: 9999, padding: '13px 18px',
    border: '1.5px solid rgba(183,148,244,0.15)', transition: 'all 0.3s ease',
  },
  input: {
    flex: 1, border: 'none', background: 'transparent', fontSize: 14, color: '#2e2f2d',
    fontFamily: "'Manrope', sans-serif", fontWeight: 500, outline: 'none',
  },
  eyeBtn: {
    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    marginLeft: 8, display: 'flex', alignItems: 'center',
  },
  strengthRow: {
    display: 'flex', alignItems: 'center', gap: 8, marginTop: 8,
  },
  strengthBar: {
    display: 'flex', gap: 4, flex: 1,
  },
  verifyBtn: {
    borderRadius: 9999, border: 'none', padding: '0 16px', fontSize: 12, fontWeight: 700,
    cursor: 'pointer', fontFamily: "'Manrope', sans-serif", whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  agreementSection: {
    background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
    borderRadius: 20, padding: 16, marginTop: 8,
  },
  agreeAllRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
    cursor: 'pointer', borderBottom: '1px solid rgba(183,148,244,0.1)',
    marginBottom: 8, paddingBottom: 12,
  },
  agreeRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', cursor: 'pointer',
  },
  checkbox: {
    width: 24, height: 24, borderRadius: 8, display: 'flex', alignItems: 'center',
    justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0,
  },
  ctaBtn: {
    width: '100%', padding: '16px', borderRadius: 9999, border: 'none',
    background: 'linear-gradient(135deg, #6d4ca6 0%, #b794f4 50%, #fe8dba 100%)',
    color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
    fontFamily: "'Manrope', sans-serif", animation: 'pulseGlow 3s ease-in-out infinite',
    letterSpacing: '0.02em',
  },
  bottomRow: {
    display: 'flex', alignItems: 'center', gap: 6, marginTop: 16,
  },
  loginLink: {
    background: 'none', border: 'none', color: '#9b3d66', fontSize: 13, fontWeight: 700,
    cursor: 'pointer', fontFamily: "'Manrope', sans-serif",
    textDecoration: 'underline', textUnderlineOffset: 3,
  },
};
