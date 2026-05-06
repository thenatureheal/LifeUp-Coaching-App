import React from 'react';
import { ChevronLeft, ChevronRight, User, Baby, Bell, BellOff, ShoppingBag, HelpCircle, Shield, LogOut, Settings, Phone, Mail, Package, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MyPage({ onBack, onLogout, onGoToShop }) {
  const { currentUser } = useAuth();

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 12px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={onBack} style={{ cursor:'pointer' }}><ChevronLeft size={24} color="#1A365D"/></div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:18, margin:0, color:'#1A365D' }}>환영합니다, {currentUser?.displayName || '회원'}님</h2>
          <div style={{ fontSize:12, color:'#43474E', marginTop:2 }}>마이페이지</div>
        </div>
      </div>

      <div style={{ padding:'0 24px' }}>
        {/* 스토어 배너 */}
        <div 
          onClick={onGoToShop}
          style={{ background:'linear-gradient(135deg, #6d4ca6, #b794f4)', borderRadius:16, padding:'20px 24px', color:'white', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 8px 24px rgba(109,76,166,0.2)' }}
        >
          <div>
            <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>🧬 유전자 검사 스토어</div>
            <div style={{ fontSize:13, opacity:0.9 }}>우리 아이 잠재력을 발견하세요</div>
          </div>
          <ChevronRight size={24} color="white" />
        </div>

        {/* 프로필 카드 */}
        <div style={{ background:'linear-gradient(135deg,#1A365D,#2D4A7A)', borderRadius:20, padding:24, color:'white', marginBottom:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:56, height:56, borderRadius:99, background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <User size={28} color="white"/>
            </div>
            <div>
              <div style={{ fontSize:18, fontWeight:800 }}>{currentUser?.displayName || '이름 없음'} 어머님</div>
              <div style={{ fontSize:13, opacity:0.8, marginTop:2 }}>{currentUser?.email || '이메일 없음'}</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:16 }}>
            <div style={{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:12, opacity:0.8 }}>등록 자녀</div>
              <div style={{ fontSize:18, fontWeight:800, marginTop:2 }}>1명</div>
            </div>
            <div style={{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:12, opacity:0.8 }}>분석 보고서</div>
              <div style={{ fontSize:18, fontWeight:800, marginTop:2 }}>1건</div>
            </div>
            <div style={{ flex:1, background:'rgba(255,255,255,0.12)', borderRadius:12, padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:12, opacity:0.8 }}>가입 기간</div>
              <div style={{ fontSize:18, fontWeight:800, marginTop:2 }}>3개월</div>
            </div>
          </div>
        </div>

        {/* 6.1 자녀 프로필 전환 및 개인정보관리 */}
        <div style={{ fontSize:13, color:'#74777F', fontWeight:700, marginBottom:10, padding:'0 4px' }}>자녀 프로필 관리</div>
        <div style={{ background:'white', borderRadius:16, padding:16, marginBottom:8, display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ width:40, height:40, borderRadius:99, background:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Baby size={20} color="#3B82F6"/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700 }}>윤서</div>
            <div style={{ fontSize:12, color:'#74777F' }}>7세 · 유전자 분석 완료</div>
          </div>
          <span style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:'#22C55E20', color:'#22C55E', fontWeight:700 }}>활성</span>
        </div>
        <div style={{ background:'#F3F3F3', borderRadius:16, padding:14, textAlign:'center', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'#43474E', fontWeight:600, fontSize:13, marginBottom:20 }}>
          + 자녀 추가하기
        </div>

        {/* 개인정보관리 */}
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', marginBottom:20, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
          {[
            { icon:<Shield size={18}/>, label:'개인정보 수정', sub:'이름, 연락처, 이메일' },
            { icon:<Settings size={18}/>, label:'보안 설정', sub:'비밀번호 변경, 2단계 인증' },
          ].map((item,i) => (
            <div key={i} style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom: i===0 ? '1px solid #F3F3F3' : 'none', cursor:'pointer' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'#F3F3F3', display:'flex', alignItems:'center', justifyContent:'center', color:'#43474E' }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{item.label}</div>
                <div style={{ fontSize:11, color:'#74777F' }}>{item.sub}</div>
              </div>
              <ChevronRight size={16} color="#C4C4C4"/>
            </div>
          ))}
        </div>

        {/* 6.2 주문·배송 관리 */}
        <div style={{ fontSize:13, color:'#74777F', fontWeight:700, marginBottom:10, padding:'0 4px' }}>주문·배송 관리</div>
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', marginBottom:20, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
          {[
            { icon:<ShoppingBag size={18}/>, label:'주문 내역', sub:'유전자 키트, 영양제 구독', badge:'2' },
            { icon:<Package size={18}/>, label:'배송 조회', sub:'현재 배송중인 상품' },
            { icon:<Truck size={18}/>, label:'정기구독 관리', sub:'영양제 월간 구독' },
          ].map((item,i) => (
            <div key={i} style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom: i<2 ? '1px solid #F3F3F3' : 'none', cursor:'pointer' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'#F3F3F3', display:'flex', alignItems:'center', justifyContent:'center', color:'#43474E' }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
                  {item.label}
                  {item.badge && <span style={{ fontSize:10, padding:'1px 6px', borderRadius:99, background:'#EF4444', color:'white', fontWeight:700 }}>{item.badge}</span>}
                </div>
                <div style={{ fontSize:11, color:'#74777F' }}>{item.sub}</div>
              </div>
              <ChevronRight size={16} color="#C4C4C4"/>
            </div>
          ))}
        </div>

        {/* 6.3 앱 및 푸시 알림 설정 */}
        <div style={{ fontSize:13, color:'#74777F', fontWeight:700, marginBottom:10, padding:'0 4px' }}>알림 설정</div>
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', marginBottom:20, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
          {[
            { label:'코칭 알림', sub:'오늘의 미션, 대화법 알림', enabled:true },
            { label:'건강 알림', sub:'영양제, 예방접종, 운동 리마인더', enabled:true },
            { label:'커뮤니티 알림', sub:'새 댓글, HOT 이슈 알림', enabled:false },
            { label:'마케팅 알림', sub:'이벤트, 프로모션 안내', enabled:false },
          ].map((item,i) => (
            <div key={i} style={{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom: i<3 ? '1px solid #F3F3F3' : 'none' }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600 }}>{item.label}</div>
                <div style={{ fontSize:11, color:'#74777F' }}>{item.sub}</div>
              </div>
              <div onClick={()=>{}} style={{ width:44, height:24, borderRadius:99, background: item.enabled ? '#22C55E' : '#D4D4D4', padding:2, cursor:'pointer', transition:'all 0.2s' }}>
                <div style={{ width:20, height:20, borderRadius:99, background:'white', transform: item.enabled ? 'translateX(20px)' : 'translateX(0)', transition:'all 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.15)' }}/>
              </div>
            </div>
          ))}
        </div>

        {/* 6.4 고객센터 및 FAQ */}
        <div style={{ fontSize:13, color:'#74777F', fontWeight:700, marginBottom:10, padding:'0 4px' }}>고객센터</div>
        <div style={{ background:'white', borderRadius:16, overflow:'hidden', marginBottom:20, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
          {[
            { icon:<HelpCircle size={18}/>, label:'자주 묻는 질문 (FAQ)' },
            { icon:<Phone size={18}/>, label:'전화 상담 (1588-0000)' },
            { icon:<Mail size={18}/>, label:'이메일 문의' },
          ].map((item,i) => (
            <div key={i} style={{ padding:'14px 16px', display:'flex', alignItems:'center', gap:12, borderBottom: i<2 ? '1px solid #F3F3F3' : 'none', cursor:'pointer' }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'#F3F3F3', display:'flex', alignItems:'center', justifyContent:'center', color:'#43474E' }}>{item.icon}</div>
              <div style={{ fontSize:14, fontWeight:600, flex:1 }}>{item.label}</div>
              <ChevronRight size={16} color="#C4C4C4"/>
            </div>
          ))}
        </div>

        <div onClick={onLogout} style={{ padding:16, textAlign:'center', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'#EF4444', fontWeight:600, fontSize:14, background:'#FEF2F2', borderRadius:12, margin:'0 0 8px' }}>
          <LogOut size={16}/> 로그아웃
        </div>
        <div style={{ textAlign:'center', fontSize:11, color:'#C4C4C4', marginTop:8 }}>LifeUp Kids v1.0.0</div>
      </div>
    </div>
  );
}
