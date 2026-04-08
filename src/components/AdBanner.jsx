import React, { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

// 각 메뉴별 맞춤 광고 데이터
const adData = {
  home: [
    { id:1, brand:'키즈플레이 문화센터', title:'봄맞이 체험 클래스 50% 할인!', desc:'유아 미술·음악·체육 통합 프로그램', gradient:'linear-gradient(135deg,#FF6B6B,#FFA07A)', emoji:'🎨', badge:'HOT', tag:'문화센터' },
    { id:2, brand:'삼성생명 자녀보험', title:'우리 아이 첫 보험, 월 9,900원부터', desc:'미래를 위한 교육+건강 올인원 플랜', gradient:'linear-gradient(135deg,#1A365D,#3B82F6)', emoji:'🛡️', badge:'추천', tag:'보험' },
    { id:3, brand:'대교 눈높이', title:'AI 맞춤 학습지 무료 체험 14일', desc:'아이 수준별 맞춤 커리큘럼 제공', gradient:'linear-gradient(135deg,#22C55E,#10B981)', emoji:'📚', badge:'FREE', tag:'학습지' },
    { id:4, brand:'한솔교육', title:'한글+수학 통합 교재 세트 30% 특가', desc:'4~7세 완벽 시작! 놀이로 배우는 교재', gradient:'linear-gradient(135deg,#8B5CF6,#6366F1)', emoji:'✏️', badge:'SALE', tag:'교재' },
  ],
  analysis: [
    { id:1, brand:'메리츠화재 어린이보험', title:'유전자 분석 결과 기반 맞춤 보장!', desc:'성장기 건강+교육 올인원 보험 설계', gradient:'linear-gradient(135deg,#0EA5E9,#1A365D)', emoji:'🏥', badge:'맞춤', tag:'보험' },
    { id:2, brand:'마크로젠 유전자검사', title:'형제 자매 패밀리 검사 40% 할인', desc:'온 가족 유전자 분석으로 건강 맞춤 케어', gradient:'linear-gradient(135deg,#6366F1,#EC4899)', emoji:'🧬', badge:'패밀리', tag:'유전자검사' },
    { id:3, brand:'녹십자 비타민', title:'성장기 필수 영양제 패키지', desc:'유전자 맞춤형 영양 보충 솔루션', gradient:'linear-gradient(135deg,#22C55E,#84CC16)', emoji:'💊', badge:'건강', tag:'영양제' },
    { id:4, brand:'AIA생명 자녀보험', title:'아이 미래 학자금+건강 보장 플랜', desc:'일시납 교육보험 특별 프로모션', gradient:'linear-gradient(135deg,#F59E0B,#EF4444)', emoji:'🎓', badge:'교육', tag:'보험' },
  ],
  coaching: [
    { id:1, brand:'허그맘허그인 심리상담', title:'우리 아이 마음 읽기 첫 상담 무료!', desc:'아동 전문 심리상담사 1:1 맞춤 코칭', gradient:'linear-gradient(135deg,#EC4899,#F472B6)', emoji:'💕', badge:'무료상담', tag:'심리상담' },
    { id:2, brand:'웅진씽크빅', title:'사고력+창의력 통합 프로그램', desc:'유아~초등 전문 학습지 4주 무료 체험', gradient:'linear-gradient(135deg,#F59E0B,#FF6F00)', emoji:'💡', badge:'체험4주', tag:'학습지' },
    { id:3, brand:'KB손해보험 자녀보험', title:'심리치료비 보장! 성장기 맞춤보험', desc:'정서발달 치료 보장 특약 포함', gradient:'linear-gradient(135deg,#1A365D,#2D4A7A)', emoji:'🛡️', badge:'보장', tag:'보험' },
    { id:4, brand:'아이스크림 홈런', title:'온라인 학습 1개월 무료 체험권', desc:'게임처럼 재미있는 AI 맞춤 학습', gradient:'linear-gradient(135deg,#3B82F6,#8B5CF6)', emoji:'🖥️', badge:'1개월', tag:'교재' },
  ],
  edu: [
    { id:1, brand:'주니어 커리어센터', title:'AI 시대 맞춤 진로상담 (초1~중3)', desc:'유전자 강점 기반 진로 설계 전문 상담소', gradient:'linear-gradient(135deg,#8B5CF6,#6366F1)', emoji:'🧭', badge:'진로', tag:'진로상담' },
    { id:2, brand:'교원 빨간펜', title:'전과목 학습지 + AI 튜터 2개월 무료', desc:'수학·영어·과학 통합 스마트 학습', gradient:'linear-gradient(135deg,#EF4444,#F97316)', emoji:'📖', badge:'2개월', tag:'학습지' },
    { id:3, brand:'시매쓰 수학학원', title:'사고력 수학 진단 테스트 무료!', desc:'유전자 패턴인식력 기반 맞춤 수학 커리큘럼', gradient:'linear-gradient(135deg,#22C55E,#16A34A)', emoji:'📐', badge:'무료진단', tag:'학원' },
    { id:4, brand:'YBM 주니어영어', title:'원어민 화상영어 첫달 50% 할인', desc:'언어습득력 강점 아이를 위한 최적 환경', gradient:'linear-gradient(135deg,#0EA5E9,#3B82F6)', emoji:'🌏', badge:'50%', tag:'교재' },
    { id:5, brand:'현대해상 꿈나무보험', title:'교육비+통원치료비 올인원 보장', desc:'학원비 걱정 없는 교육 펀드형 보험', gradient:'linear-gradient(135deg,#1A365D,#475569)', emoji:'💰', badge:'펀드형', tag:'보험' },
  ],
  diary: [
    { id:1, brand:'리틀소시에 문화센터', title:'예체능 종합반 봄학기 모집!', desc:'미술·음악·체육 한 번에! 원스톱 프로그램', gradient:'linear-gradient(135deg,#EC4899,#F472B6)', emoji:'🌷', badge:'봄모집', tag:'문화센터' },
    { id:2, brand:'재능교육', title:'학습지 + 성장일기 연동 프로그램', desc:'매일 학습 기록이 자동으로 성장일기에!', gradient:'linear-gradient(135deg,#F59E0B,#FF6F00)', emoji:'📝', badge:'연동', tag:'학습지' },
    { id:3, brand:'한화생명 자녀보험', title:'성장기 올인원 보장, 첫 달 1원!', desc:'사고·질병·교육비까지 통합 보장 플랜', gradient:'linear-gradient(135deg,#3B82F6,#1E40AF)', emoji:'🌟', badge:'1원', tag:'보험' },
    { id:4, brand:'비상교육 와이즈캠프', title:'초등 전과목 AI학습 + 교재 세트', desc:'개인 맞춤 학습 로드맵 제공', gradient:'linear-gradient(135deg,#10B981,#059669)', emoji:'🎒', badge:'세트', tag:'교재' },
  ],
};

export default function AdBanner({ pageKey = 'home' }) {
  const ads = adData[pageKey] || adData.home;
  const [currentAd, setCurrentAd] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentAd(prev => (prev + 1) % ads.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlay, ads.length]);

  return (
    <div style={{ padding:'0 24px 24px' }}>
      {/* 섹션 타이틀 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14, marginTop:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <Sparkles size={16} color="#F59E0B"/>
          <span style={{ fontSize:14, fontWeight:700, color:'#1A1C1C' }}>맞춤 추천 파트너</span>
          <span style={{ fontSize:11, color:'#74777F' }}>AD</span>
        </div>
        <div style={{ fontSize:11, color:'#74777F' }}>{currentAd+1}/{ads.length}</div>
      </div>

      {/* 메인 캐러셀 배너 */}
      <div 
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
        onClick={() => setCurrentAd(prev => (prev + 1) % ads.length)}
        style={{ 
          background: ads[currentAd].gradient,
          borderRadius:20, padding:'20px 20px 16px', color:'white', cursor:'pointer',
          position:'relative', overflow:'hidden', marginBottom:12,
          transition:'all 0.4s ease',
          minHeight:120,
        }}
      >
        {/* 배경 장식 */}
        <div style={{ position:'absolute', top:-15, right:-5, fontSize:72, opacity:0.12 }}>{ads[currentAd].emoji}</div>
        <div style={{ position:'absolute', bottom:-10, left:'50%', width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>

        <div style={{ position:'relative', zIndex:1 }}>
          {/* 배지 + 브랜드 */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <span style={{ fontSize:24 }}>{ads[currentAd].emoji}</span>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ padding:'2px 8px', borderRadius:99, background:'rgba(255,255,255,0.25)', fontSize:10, fontWeight:800 }}>{ads[currentAd].badge}</span>
                <span style={{ fontSize:11, opacity:0.9 }}>{ads[currentAd].brand}</span>
              </div>
            </div>
          </div>
          {/* 제목 */}
          <div style={{ fontSize:17, fontWeight:800, lineHeight:1.3, marginBottom:6 }}>{ads[currentAd].title}</div>
          <div style={{ fontSize:12, opacity:0.9, lineHeight:1.4 }}>{ads[currentAd].desc}</div>
          {/* CTA */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:12 }}>
            <span style={{ padding:'6px 14px', borderRadius:99, background:'rgba(255,255,255,0.22)', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
              자세히 보기 <ChevronRight size={14}/>
            </span>
            <span style={{ fontSize:10, opacity:0.6 }}>광고</span>
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div style={{ display:'flex', justifyContent:'center', gap:5, marginBottom:14 }}>
        {ads.map((_, i) => (
          <div key={i} onClick={(e) => { e.stopPropagation(); setCurrentAd(i); }}
            style={{ width: currentAd===i ? 18 : 6, height:6, borderRadius:99, 
              background: currentAd===i ? '#1A365D' : '#D4D4D4', cursor:'pointer',
              transition:'all 0.3s ease' }}/>
        ))}
      </div>

      {/* 하단 미니 배너 그리드 (2개) */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {ads.filter((_, i) => i !== currentAd).slice(0,2).map(ad => (
          <div key={ad.id} onClick={() => setCurrentAd(ads.indexOf(ad))}
            style={{ background:'white', borderRadius:14, padding:14, cursor:'pointer',
              boxShadow:'0 2px 10px rgba(0,0,0,0.03)', border:'1px solid #F3F3F3',
              transition:'all 0.2s', position:'relative', overflow:'hidden' }}>
            {/* 상단 컬러 스트립 */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:ad.gradient }}/>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <span style={{ fontSize:20 }}>{ad.emoji}</span>
              <span style={{ fontSize:9, padding:'2px 6px', borderRadius:99, background:'#F3F3F3', fontWeight:700, color:'#74777F' }}>{ad.tag}</span>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:'#1A1C1C', lineHeight:1.3, marginBottom:4 }}>{ad.title}</div>
            <div style={{ fontSize:10, color:'#74777F', display:'flex', alignItems:'center', gap:2 }}>
              {ad.brand} <ExternalLink size={10}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
