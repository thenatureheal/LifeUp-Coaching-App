import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Dna, Brain, Heart, BookOpen, Apple, Trophy, Shield, Star, Sparkles, Users, Target, Compass, GraduationCap, Baby, Lightbulb, ArrowRight, CheckCircle2, Quote, Zap, Globe, Award, TrendingUp } from 'lucide-react';

export default function LandingPage({ onEnter }) {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const animStyle = (id) => ({
    opacity: visibleSections.has(id) ? 1 : 0,
    transform: visibleSections.has(id) ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
  });

  return (
    <div style={{ background:'#FAFBFF', width:'100%', position:'relative' }}>

      {/* ========== 1. HERO SECTION ========== */}
      <section style={{ 
        background:'linear-gradient(165deg, #0B1929 0%, #1A365D 35%, #2D4A7A 65%, #4A6FA5 100%)',
        minHeight:'auto', display:'flex', flexDirection:'column', justifyContent:'center',
        position:'relative', overflow:'hidden', padding:'48px 20px 32px',
      }}>
        {/* Floating DNA particles */}
        {[...Array(6)].map((_,i) => (
          <div key={i} style={{
            position:'absolute', borderRadius:'50%', opacity:0.06,
            width: 80+i*60, height: 80+i*60,
            left: `${10+i*15}%`, top: `${15+i*12}%`,
            background:`radial-gradient(circle, ${['#6366F1','#EC4899','#22C55E','#F59E0B','#3B82F6','#8B5CF6'][i]} 0%, transparent 70%)`,
            animation: `float ${6+i*2}s ease-in-out infinite alternate`,
          }}/>
        ))}

        <div style={{ position:'relative', zIndex:1, maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          {/* Brand */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.08)', borderRadius:99, padding:'8px 18px', marginBottom:24, backdropFilter:'blur(10px)' }}>
            <Dna size={18} color="#8B5CF6"/>
            <span style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.9)', letterSpacing:1 }}>LIFEUP KIDS COACHING</span>
          </div>

          <h1 style={{ fontSize:32, fontWeight:900, color:'white', lineHeight:1.3, margin:'0 0 16px', fontFamily:'Manrope, sans-serif' }}>
            유전자가 알려주는<br/>
            <span style={{ background:'linear-gradient(90deg,#8B5CF6,#EC4899,#F59E0B)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>우리 아이 인생 설계도</span>
          </h1>

          <p style={{ fontSize:16, color:'rgba(255,255,255,0.75)', lineHeight:1.7, margin:'0 0 32px' }}>
            유전자 분석을 기반으로 양육 · 교육 · 대화법 · 건강 · 영양까지<br/>
            자녀가 20세가 되기까지의 <strong style={{color:'white'}}>모든 성공 포트폴리오</strong>를<br/>
            만들어가는 초개인화 코칭 설계 공간
          </p>

          {/* CTA Button */}
          <div onClick={onEnter} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'linear-gradient(135deg,#6366F1,#8B5CF6)', color:'white',
            padding:'16px 36px', borderRadius:99, fontSize:16, fontWeight:800,
            cursor:'pointer', boxShadow:'0 8px 30px rgba(99,102,241,0.4)',
            transition:'all 0.3s',
          }}>
            무료로 시작하기 <ArrowRight size={20}/>
          </div>

          <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:14 }}>
            이미 62,000+ 가정이 함께하고 있어요
          </div>

          {/* Stats */}
          <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:36 }}>
            {[
              {v:'62K+',l:'회원 가정'},
              {v:'97%',l:'만족도'},
              {v:'850+',l:'유전자 항목'},
              {v:'24h',l:'AI 코칭'},
            ].map((s,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.06)', borderRadius:16, padding:'14px 16px', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize:20, fontWeight:900, color:'white', fontFamily:'Manrope' }}>{s.v}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:30, left:'50%', transform:'translateX(-50%)', textAlign:'center' }}>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:6 }}>아래로 스크롤</div>
          <ChevronDown size={20} color="rgba(255,255,255,0.3)" style={{ animation:'bounce 2s infinite' }}/>
        </div>
      </section>

      {/* ========== 2. 코칭 메뉴 소개 ========== */}
      <section id="sec2" data-animate style={{ padding:'40px 20px', background:'white', ...animStyle('sec2') }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#EFF6FF', borderRadius:99, padding:'6px 14px', marginBottom:14 }}>
              <Compass size={14} color="#3B82F6"/>
              <span style={{ fontSize:12, fontWeight:700, color:'#3B82F6' }}>COACHING MENU</span>
            </div>
            <h2 style={{ fontSize:26, fontWeight:900, color:'#1A1C1C', margin:'0 0 10px', lineHeight:1.3 }}>
              6가지 핵심 코칭 메뉴
            </h2>
            <p style={{ fontSize:14, color:'#74777F', lineHeight:1.6, margin:0 }}>
              유전자 분석부터 일상 코칭까지, 아이의 성장 전 영역을 케어합니다
            </p>
          </div>

          {[
            { icon:'🏠', title:'홈 대시보드', desc:'맞춤 프로필, 롤모델 매칭, 진로 로드맵, 목표 관리', gradient:'linear-gradient(135deg,#6366F1,#8B5CF6)', tag:'초개인화' },
            { icon:'🧬', title:'종합 분석 리포트', desc:'850+ 유전자 항목 분석, 강점/보통/관리필요 진단', gradient:'linear-gradient(135deg,#3B82F6,#0EA5E9)', tag:'6대분류' },
            { icon:'💕', title:'마음 코칭 액션', desc:'기질 성격 분석, AI시대 5대 역량, 맞춤 양육/대화법', gradient:'linear-gradient(135deg,#EC4899,#F472B6)', tag:'심리분석' },
            { icon:'📚', title:'학습·진로 로드맵', desc:'롤모델 매칭, 학습스타일, 학원 큐레이션, 미래직업', gradient:'linear-gradient(135deg,#22C55E,#10B981)', tag:'5단계' },
            { icon:'📖', title:'이달의 성장일기', desc:'목표 실천, 성장이슈 기록, 포트폴리오 다운로드', gradient:'linear-gradient(135deg,#F59E0B,#FF6F00)', tag:'사진기록' },
            { icon:'💊', title:'영양·건강 케어', desc:'유전자 맞춤 영양제, 슈퍼푸드, 운동, 예방접종', gradient:'linear-gradient(135deg,#EF4444,#F97316)', tag:'맞춤건강' },
          ].map((m,i) => (
            <div key={i} style={{ display:'flex', gap:16, alignItems:'center', padding:18, background:'#FAFBFF', borderRadius:20, marginBottom:12, border:'1px solid #F0F0F0', transition:'all 0.2s' }}>
              <div style={{ width:56, height:56, borderRadius:16, background:m.gradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0, boxShadow:`0 4px 16px ${m.gradient.includes('6366F1') ? 'rgba(99,102,241,0.2)' : 'rgba(0,0,0,0.08)'}` }}>
                {m.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:15, fontWeight:700 }}>{m.title}</span>
                  <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:m.gradient, color:'white', fontWeight:700 }}>{m.tag}</span>
                </div>
                <div style={{ fontSize:12, color:'#74777F', marginTop:4, lineHeight:1.5 }}>{m.desc}</div>
              </div>
              <ChevronRight size={18} color="#D4D4D4"/>
            </div>
          ))}
        </div>
      </section>

      {/* ========== 3. 제공 정보 소개 ========== */}
      <section id="sec3" data-animate style={{ padding:'40px 20px', background:'linear-gradient(180deg,#F8F9FF,#FFF)', ...animStyle('sec3') }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#F0FDF4', borderRadius:99, padding:'6px 14px', marginBottom:14 }}>
              <Sparkles size={14} color="#22C55E"/>
              <span style={{ fontSize:12, fontWeight:700, color:'#22C55E' }}>INFORMATION</span>
            </div>
            <h2 style={{ fontSize:26, fontWeight:900, color:'#1A1C1C', margin:'0 0 10px', lineHeight:1.3 }}>
              제공하는 핵심 정보
            </h2>
            <p style={{ fontSize:14, color:'#74777F', margin:0 }}>
              아이의 DNA에 숨겨진 가능성을 과학적으로 분석합니다
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { icon:<Brain size={24} color="#6366F1"/>, title:'인지·학습 능력', items:['IQ/집중력 유전자','논리력/수리력','언어습득력','창의성 유전자'], color:'#6366F1' },
              { icon:<Heart size={24} color="#EC4899"/>, title:'성격·기질 분석', items:['OCEAN 5대 성격','스트레스 반응','리더십 잠재력','사회성 유전자'], color:'#EC4899' },
              { icon:<Apple size={24} color="#22C55E"/>, title:'건강·영양 관리', items:['비타민 대사 유전자','식이 민감도','수면 유형 분석','성장호르몬 관련'], color:'#22C55E' },
              { icon:<Trophy size={24} color="#F59E0B"/>, title:'진로·적성 설계', items:['적성 유형 분류','롤모델 매칭','직업군 추천','성공 로드맵'], color:'#F59E0B' },
              { icon:<Shield size={24} color="#3B82F6"/>, title:'예방·건강체크', items:['선천성 질환 리스크','알레르기 프로필','예방접종 가이드','성장지표 추적'], color:'#3B82F6' },
              { icon:<BookOpen size={24} color="#8B5CF6"/>, title:'교육·양육 가이드', items:['학습스타일 진단','맞춤 대화법','기질별 훈육법','연령별 커리큘럼'], color:'#8B5CF6' },
            ].map((c,i) => (
              <div key={i} style={{ background:'white', borderRadius:20, padding:20, boxShadow:'0 2px 16px rgba(0,0,0,0.03)', border:'1px solid #F3F3F3' }}>
                <div style={{ width:48, height:48, borderRadius:14, background:`${c.color}10`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                  {c.icon}
                </div>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:8 }}>{c.title}</div>
                {c.items.map((item,j) => (
                  <div key={j} style={{ fontSize:11, color:'#74777F', display:'flex', alignItems:'center', gap:4, marginBottom:3 }}>
                    <CheckCircle2 size={10} color={c.color}/> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 4. 롤모델 성공 로드맵 ========== */}
      <section id="sec4" data-animate style={{ padding:'40px 20px', background:'white', ...animStyle('sec4') }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFFBEB', borderRadius:99, padding:'6px 14px', marginBottom:14 }}>
              <Star size={14} color="#F59E0B"/>
              <span style={{ fontSize:12, fontWeight:700, color:'#F59E0B' }}>ROLE MODEL ROADMAP</span>
            </div>
            <h2 style={{ fontSize:26, fontWeight:900, color:'#1A1C1C', margin:'0 0 10px', lineHeight:1.3 }}>
              롤모델의 성장 과정을<br/>AI 시대에 맞춰 재설계
            </h2>
            <p style={{ fontSize:14, color:'#74777F', margin:0, lineHeight:1.6 }}>
              유전적 강점이 비슷한 성공 인물의 성장 과정을 분석하여<br/>
              AI 시대에 맞는 맞춤형 성공 로드맵을 제시합니다
            </p>
          </div>

          {/* 롤모델 카드들 */}
          <div style={{ display:'flex', gap:12, overflowX:'auto', margin:'0 -24px', padding:'0 24px 20px', scrollbarWidth:'none' }}>
            {[
              { name:'일론 머스크', role:'테크 혁신가', gene:'논리력+창의성', age:'9세 프로그래밍 독학', emoji:'🚀', color:'#6366F1', steps:['코딩 사고력 기초','로봇공학 입문','창업 마인드셋','AI/우주공학'] },
              { name:'스티브 잡스', role:'디자인 혁신가', gene:'공간지각+심미안', age:'10세 전자회로 조립', emoji:'🎨', color:'#EC4899', steps:['예술+기술 융합','디자인 씽킹','프레젠테이션','브랜드 창조'] },
              { name:'김연아', role:'피겨 금메달리스트', gene:'집중력+지구력', age:'5세 스케이팅 시작', emoji:'⛸️', color:'#3B82F6', steps:['기초 체력 훈련','전문 코치 매칭','대회 경험','글로벌 무대'] },
            ].map((rm,i) => (
              <div key={i} style={{ minWidth:260, background:'white', borderRadius:24, overflow:'hidden', boxShadow:'0 4px 24px rgba(0,0,0,0.06)', border:'1px solid #F0F0F0', flexShrink:0 }}>
                <div style={{ background:`linear-gradient(135deg,${rm.color},${rm.color}CC)`, padding:20, color:'white' }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>{rm.emoji}</div>
                  <div style={{ fontSize:18, fontWeight:800 }}>{rm.name}</div>
                  <div style={{ fontSize:12, opacity:0.9 }}>{rm.role}</div>
                  <div style={{ marginTop:8, padding:'4px 10px', borderRadius:99, background:'rgba(255,255,255,0.2)', fontSize:11, display:'inline-block' }}>🧬 {rm.gene}</div>
                </div>
                <div style={{ padding:16 }}>
                  <div style={{ fontSize:12, color:rm.color, fontWeight:700, marginBottom:10 }}>⭐ 어린 시절: {rm.age}</div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#1A1C1C', marginBottom:8 }}>AI 시대 재설계 로드맵</div>
                  {rm.steps.map((s,j) => (
                    <div key={j} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                      <div style={{ width:20, height:20, borderRadius:99, background:`${rm.color}15`, color:rm.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, flexShrink:0 }}>{j+1}</div>
                      <span style={{ fontSize:12, color:'#43474E' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:12, background:'linear-gradient(135deg,#FEF3C7,#FDE68A)', borderRadius:16, padding:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:'#92400E' }}>✨ 우리 아이의 유전적 강점과 가장 비슷한 롤모델을 자동 매칭!</div>
            <div style={{ fontSize:12, color:'#A16207', marginTop:4 }}>AI가 분석한 1,000+ 성공 인물 데이터베이스</div>
          </div>
        </div>
      </section>

      {/* ========== 5. 전문가 팀 & 가치관 ========== */}
      <section id="sec5" data-animate style={{ padding:'40px 20px', background:'linear-gradient(180deg,#F0F4FF,#FAFBFF)', ...animStyle('sec5') }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FCE7F3', borderRadius:99, padding:'6px 14px', marginBottom:14 }}>
              <Users size={14} color="#EC4899"/>
              <span style={{ fontSize:12, fontWeight:700, color:'#EC4899' }}>EXPERT TEAM</span>
            </div>
            <h2 style={{ fontSize:26, fontWeight:900, color:'#1A1C1C', margin:'0 0 10px', lineHeight:1.3 }}>
              전문가들이 함께 만드는<br/>과학적 코칭 시스템
            </h2>
          </div>

          {/* 대표 프로필 */}
          <div style={{ background:'white', borderRadius:24, padding:28, marginBottom:20, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', textAlign:'center', border:'1px solid #F0F0F0', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:'linear-gradient(90deg,#6366F1,#EC4899,#F59E0B)' }}/>
            <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#6366F1,#EC4899)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, boxShadow:'0 8px 24px rgba(99,102,241,0.2)' }}>👩‍🔬</div>
            <div style={{ fontSize:22, fontWeight:800, color:'#1A1C1C' }}>유은정 대표</div>
            <div style={{ fontSize:13, color:'#6366F1', fontWeight:600, marginTop:4 }}>LifeUp Coaching CEO & Founder</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', marginTop:12, marginBottom:16 }}>
              {['유전자분석기관 책임연구원','약사','건강식품제조업 대표'].map((r,i) => (
                <span key={i} style={{ fontSize:11, padding:'4px 12px', borderRadius:99, background:'#F3F3F3', fontWeight:600, color:'#43474E' }}>{r}</span>
              ))}
            </div>
            <div style={{ background:'#F9FAFB', borderRadius:16, padding:16, textAlign:'left' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                <Quote size={16} color="#6366F1" style={{flexShrink:0, marginTop:2}}/>
                <p style={{ fontSize:13, color:'#43474E', lineHeight:1.7, margin:0, fontStyle:'italic' }}>
                  "모든 아이는 유전자 속에 고유한 성공의 씨앗을 품고 있습니다. 우리의 사명은 과학적 분석을 통해 그 씨앗을 찾아내고, 아이와 부모가 함께 성장의 열매를 맺을 수 있도록 최선의 길을 설계하는 것입니다."
                </p>
              </div>
            </div>
          </div>

          {/* 팀원들 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { emoji:'🧬', name:'김성호 연구원', role:'유전체 분석 책임', exp:'BGI 유전자분석 10년' },
              { emoji:'💊', name:'박지영 약사', role:'영양 코칭 설계', exp:'임상약학 전문 8년' },
              { emoji:'🧠', name:'이수민 박사', role:'아동 심리 전문', exp:'아동발달 심리학 PhD' },
              { emoji:'📊', name:'최현우 AI 엔지니어', role:'AI 코칭 시스템', exp:'ML/유전체 데이터 전문' },
            ].map((t,i) => (
              <div key={i} style={{ background:'white', borderRadius:18, padding:16, boxShadow:'0 2px 12px rgba(0,0,0,0.03)', textAlign:'center', border:'1px solid #F3F3F3' }}>
                <div style={{ fontSize:32, marginBottom:8 }}>{t.emoji}</div>
                <div style={{ fontSize:14, fontWeight:700 }}>{t.name}</div>
                <div style={{ fontSize:11, color:'#6366F1', fontWeight:600, marginTop:2 }}>{t.role}</div>
                <div style={{ fontSize:10, color:'#74777F', marginTop:4 }}>{t.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. 회사 비전 ========== */}
      <section id="sec6" data-animate style={{ padding:'40px 20px', background:'linear-gradient(165deg,#0B1929,#1A365D)', color:'white', ...animStyle('sec6') }}>
        <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.08)', borderRadius:99, padding:'6px 14px', marginBottom:20, backdropFilter:'blur(10px)' }}>
            <Zap size={14} color="#F59E0B"/>
            <span style={{ fontSize:12, fontWeight:700, color:'#F59E0B' }}>OUR VISION</span>
          </div>

          <h2 style={{ fontSize:28, fontWeight:900, lineHeight:1.3, margin:'0 0 16px' }}>
            인생 설계도,<br/>인생 나침반을<br/>
            <span style={{ background:'linear-gradient(90deg,#F59E0B,#EC4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>과학으로 제시합니다</span>
          </h2>

          <p style={{ fontSize:14, color:'rgba(255,255,255,0.7)', lineHeight:1.7, margin:'0 0 36px' }}>
            라이프업 코칭은 인류 역사상 가장 위대한 과업을 수행합니다.<br/>
            아이의 유전자 속에 숨겨진 <strong style={{color:'white'}}>인생의 나침반</strong>을 발견하고,<br/>
            그 방향으로 향하는 <strong style={{color:'white'}}>인생 설계도</strong>를 구축합니다.
          </p>

          {/* 비전 카드들 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:36, textAlign:'left' }}>
            {[
              { icon:<Compass size={24} color="#F59E0B"/>, title:'인생 나침반', desc:'유전자가 알려주는 아이의 방향. 850+ 항목 과학 분석' },
              { icon:<Target size={24} color="#EC4899"/>, title:'인생 설계도', desc:'0~20세 성장 로드맵. 연령별 맞춤 코칭 전략 수립' },
              { icon:<Award size={24} color="#22C55E"/>, title:'성공 포트폴리오', desc:'매월 기록되는 성장일기. 1권의 인생 책으로 완성' },
              { icon:<TrendingUp size={24} color="#3B82F6"/>, title:'AI 시대 역량', desc:'대체 불가능 5대 역량 중심의 미래형 인재 양성' },
            ].map((v,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.05)', borderRadius:20, padding:20, border:'1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ marginBottom:12 }}>{v.icon}</div>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:6 }}>{v.title}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', lineHeight:1.5 }}>{v.desc}</div>
              </div>
            ))}
          </div>

          {/* 임팩트 숫자 */}
          <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:24, padding:28, border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:20, color:'#F59E0B' }}>🌟 라이프업의 임팩트</div>
            <div style={{ display:'flex', justifyContent:'center', gap:24 }}>
              {[
                {v:'62,000+',l:'가정 코칭',sub:'지난 3년간'},
                {v:'150만+',l:'분석 보고서',sub:'누적 생성'},
                {v:'340+',l:'협력 기관',sub:'학원/센터'},
              ].map((s,i) => (
                <div key={i}>
                  <div style={{ fontSize:24, fontWeight:900, fontFamily:'Manrope', background:'linear-gradient(90deg,#F59E0B,#EC4899)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                  <div style={{ fontSize:13, fontWeight:600, marginTop:4 }}>{s.l}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== 7. BGI 헬스케어 소개 배너 ========== */}
      <section id="sec7" data-animate style={{ padding:'32px 20px', background:'white', ...animStyle('sec7') }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ background:'linear-gradient(135deg,#0B4D2C,#166534,#15803D)', borderRadius:28, padding:32, color:'white', position:'relative', overflow:'hidden' }}>
            {/* 배경 장식 */}
            <div style={{ position:'absolute', top:-30, right:-20, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }}/>
            <div style={{ position:'absolute', bottom:-40, left:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.03)' }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:12, background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🧬</div>
                <div>
                  <div style={{ fontSize:20, fontWeight:900 }}>BGI Healthcare</div>
                  <div style={{ fontSize:12, opacity:0.8 }}>세계 최대 유전체 분석 기관</div>
                </div>
              </div>

              <div style={{ fontSize:15, fontWeight:700, lineHeight:1.5, marginBottom:16 }}>
                글로벌 No.1 유전체 분석 기술로<br/>
                우리 아이의 미래를 설계합니다
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
                {[
                  {v:'100+',l:'분석 국가'},
                  {v:'2억+',l:'누적 샘플'},
                  {v:'99.9%',l:'분석 정확도'},
                  {v:'850+',l:'분석 항목'},
                ].map((s,i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,0.08)', borderRadius:12, padding:'10px 12px' }}>
                    <div style={{ fontSize:18, fontWeight:900, fontFamily:'Manrope' }}>{s.v}</div>
                    <div style={{ fontSize:10, opacity:0.75 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                {['NGS 차세대 시퀀싱','GWAS 유전체 연관 분석','국제 인증 ISO15189','대한민국 식약처 인증'].map((t,i) => (
                  <span key={i} style={{ fontSize:10, padding:'4px 10px', borderRadius:99, background:'rgba(255,255,255,0.12)', fontWeight:600 }}>{t}</span>
                ))}
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Globe size={16} color="rgba(255,255,255,0.7)"/>
                <span style={{ fontSize:12, opacity:0.7 }}>bgihealth.com | 세계 100여개국 헬스케어 파트너</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section style={{ padding:'40px 20px 60px', background:'linear-gradient(180deg,#FAFBFF,#F0F4FF)', textAlign:'center' }}>
        <div style={{ maxWidth:600, margin:'0 auto' }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🧬✨</div>
          <h2 style={{ fontSize:26, fontWeight:900, color:'#1A1C1C', margin:'0 0 12px', lineHeight:1.3 }}>
            우리 아이의<br/>숨겨진 가능성을 발견하세요
          </h2>
          <p style={{ fontSize:14, color:'#74777F', lineHeight:1.6, margin:'0 0 32px' }}>
            유전자가 알려주는 인생 설계도.<br/>
            지금 바로 시작하세요.
          </p>

          <div onClick={onEnter} style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'linear-gradient(135deg,#1A365D,#2D4A7A)', color:'white',
            padding:'18px 48px', borderRadius:99, fontSize:18, fontWeight:800,
            cursor:'pointer', boxShadow:'0 10px 40px rgba(26,54,93,0.3)',
          }}>
            🧬 앱 시작하기
          </div>

          <div style={{ marginTop:20, fontSize:12, color:'#74777F' }}>
            © 2026 LifeUp Coaching. 유전자 분석 기반 초개인화 코칭 플랫폼
          </div>
        </div>
      </section>

      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes float { 0%{transform:translateY(0) scale(1)} 100%{transform:translateY(-30px) scale(1.1)} }
        @keyframes bounce { 0%,20%,50%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} 60%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}
