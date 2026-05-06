import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Brain, Sparkles } from 'lucide-react';
import { coachingData } from '../data/coachingData';
import { useAuth } from '../contexts/AuthContext';
import AdBanner from '../components/AdBanner';

const sts = { strength:{c:'#22C55E',b:'#F0FDF4',l:'강점'}, normal:{c:'#3B82F6',b:'#EFF6FF',l:'보통'}, attention:{c:'#F59E0B',b:'#FFFBEB',l:'관리필요'} };

function OceanBar({ trait }) {
  const cfg = sts[trait.status];
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
        <span style={{ fontSize:13, fontWeight:600 }}>{trait.name} <span style={{color:'#74777F',fontWeight:400}}>{trait.eng}</span></span>
        <span style={{ fontSize:13, fontWeight:700, color:cfg.c }}>{trait.score}%</span>
      </div>
      <div style={{ height:8, borderRadius:99, background:'#F3F3F3', overflow:'hidden' }}>
        <div style={{ width:`${trait.score}%`, height:'100%', borderRadius:99, background:cfg.c, transition:'width 0.5s ease' }}/>
      </div>
    </div>
  );
}

function PredictionCard({ p }) {
  return (
    <div style={{ background:'white', borderRadius:16, padding:16, marginBottom:12, boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
      <div style={{ display:'flex', gap:10, marginBottom:10 }}>
        <span style={{ fontSize:24 }}>{p.icon}</span>
        <div>
          <div style={{ fontSize:12, color:'#74777F', fontWeight:600 }}>{p.category}</div>
          <div style={{ fontSize:15, fontWeight:700, color:'#1A1C1C' }}>{p.type}</div>
        </div>
      </div>
      <p style={{ fontSize:13, color:'#43474E', lineHeight:1.5, margin:'0 0 12px',background:'#F9F9F9',padding:10,borderRadius:10 }}>{p.detail}</p>
      <div style={{ fontSize:13, color:'#1A365D', fontWeight:600, background:'#EFF6FF', padding:10, borderRadius:10 }}>
        💡 코칭: {p.coaching}
      </div>
    </div>
  );
}

function CapabilityCard({ cap, isOpen, onToggle }) {
  const cfg = sts[cap.status];
  return (
    <div style={{ background:'white', borderRadius:20, marginBottom:12, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
      <div onClick={onToggle} style={{ padding:16, display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
        <span style={{ fontSize:28 }}>{cap.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:15 }}>{cap.name}</div>
          <div style={{ height:6, borderRadius:99, background:'#F3F3F3', marginTop:6, overflow:'hidden' }}>
            <div style={{ width:`${cap.score}%`, height:'100%', borderRadius:99, background:cfg.c }}/>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:18, fontWeight:800, fontFamily:'Manrope', color:cfg.c }}>{cap.score}</span>
          <ChevronRight size={16} color="#74777F" style={{ transform:isOpen?'rotate(90deg)':'none', transition:'0.2s' }}/>
        </div>
      </div>
      {isOpen && (
        <div style={{ padding:'0 16px 16px', borderTop:'1px solid #F3F3F3' }}>
          <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:'12px 0' }}>{cap.desc}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {cap.genes.map((g,i) => (
              <span key={i} style={{ fontSize:11, padding:'4px 8px', borderRadius:8, background:'#F3F3F3', color:'#43474E', fontWeight:600 }}>{g}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CareerCard({ career }) {
  return (
    <div style={{ minWidth:280, background:'white', borderRadius:20, padding:20, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:28 }}>{career.icon}</span>
          <div style={{ fontWeight:700, fontSize:16 }}>{career.type}</div>
        </div>
        <div style={{ background:career.color, color:'white', borderRadius:99, padding:'4px 10px', fontSize:12, fontWeight:700 }}>
          적합도 {career.match}%
        </div>
      </div>
      <div style={{ fontSize:12, color:'#74777F', marginBottom:12 }}>{career.conditions}</div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }}>
        {career.jobs.map((j,i) => (
          <span key={i} style={{ fontSize:12, padding:'4px 10px', borderRadius:99, background:'#F3F3F3', fontWeight:600 }}>{j}</span>
        ))}
      </div>
      <div style={{ fontSize:13, color:'#1A365D', lineHeight:1.5, background:'#F0F9FF', padding:12, borderRadius:12 }}>
        🎓 {career.guide}
      </div>
    </div>
  );
}

export default function CoachingPage({ onBack }) {
  const { userData } = useAuth();
  const [tab, setTab] = useState('mind'); // 'mind' | 'ai'
  const [openCap, setOpenCap] = useState(null);
  const d = coachingData;

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 16px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={onBack} style={{ cursor:'pointer' }}><ChevronLeft size={24} color="#1A365D"/></div>
        <div>
          <h2 style={{ fontSize:20, margin:0, color:'#1A365D' }}>환영합니다, {userData?.name || '회원'}님</h2>
          <div style={{ fontSize:13, color:'#43474E', marginTop:2 }}>마음 코칭 액션</div>
        </div>
      </div>

      {/* Tab */}
      <div style={{ display:'flex', gap:8, padding:'0 24px 20px' }}>
        {[{k:'mind',l:'마음의 표출',I:Heart},{k:'ai',l:'AI시대 역량',I:Brain}].map(t => (
          <div key={t.k} onClick={()=>setTab(t.k)} style={{ flex:1, padding:'14px 12px', borderRadius:16, background:tab===t.k?'#1A365D':'#F3F3F3', color:tab===t.k?'white':'#43474E', textAlign:'center', cursor:'pointer', fontWeight:700, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:6, transition:'all 0.2s' }}>
            <t.I size={16}/> {t.l}
          </div>
        ))}
      </div>

      <div style={{ padding:'0 24px' }}>
        {tab === 'mind' ? (
          <>
            {/* 기질 프로필 */}
            <div style={{ background:'white', borderRadius:20, padding:20, marginBottom:24, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:4 }}>
                <Sparkles size={16} color="#6366F1"/>
                <span style={{ fontSize:12, color:'#6366F1', fontWeight:700 }}>윤서의 기질 유형</span>
              </div>
              <h3 style={{ fontSize:22, color:'#1A1C1C', margin:'4px 0 10px' }}>{d.temperamentProfile.type}</h3>
              <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:'0 0 16px' }}>{d.temperamentProfile.description}</p>
              {d.temperamentProfile.traits.map((t,i) => <OceanBar key={i} trait={t}/>)}
            </div>

            {/* 학교생활 예측 */}
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:17, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>🏫 {d.schoolLife.title}</h3>
              {d.schoolLife.predictions.map((p,i) => <PredictionCard key={i} p={p}/>)}
            </div>

            {/* 사회생활 예측 */}
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:17, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>🌐 {d.socialLife.title}</h3>
              {d.socialLife.predictions.map((p,i) => <PredictionCard key={i} p={p}/>)}
            </div>

            {/* 연령별 마음 타임라인 */}
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:17, marginBottom:14 }}>📅 연령별 마음 성장 타임라인</h3>
              {d.ageTimeline.map((t,i) => (
                <div key={i} style={{ display:'flex', gap:14, marginBottom:16, position:'relative' }}>
                  {i < d.ageTimeline.length-1 && <div style={{ position:'absolute', left:19, top:40, bottom:-16, width:2, background:'#E2E2E2' }}/>}
                  <div style={{ width:40, height:40, borderRadius:99, background:t.color, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, zIndex:1 }}>{t.age.split('~')[0]}</div>
                  <div style={{ flex:1, background:'white', borderRadius:16, padding:14, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize:12, color:t.color, fontWeight:700, marginBottom:2 }}>{t.age} · {t.phase}</div>
                    <div style={{ fontSize:13, color:'#43474E', marginBottom:8, lineHeight:1.5 }}>⚠️ {t.trigger}</div>
                    <div style={{ fontSize:13, color:'#1A365D', fontWeight:600, lineHeight:1.5 }}>💡 {t.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* AI 시대 5대 역량 */}
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:17, marginBottom:14 }}>🤖 AI 대체 불가능 5대 역량</h3>
              {d.aiCapabilities.map((c,i) => (
                <CapabilityCard key={i} cap={c} isOpen={openCap===i} onToggle={()=>setOpenCap(openCap===i?null:i)}/>
              ))}
            </div>

            {/* 추천 직업 유형 */}
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:17, marginBottom:14 }}>🎯 추천 사업/직업 유형</h3>
              <div style={{ display:'flex', gap:16, overflowX:'auto', margin:'0 -24px', padding:'0 24px 16px', scrollbarWidth:'none' }}>
                {d.careerTypes.map((c,i) => <CareerCard key={i} career={c}/>)}
              </div>
            </div>

            {/* 지금 시작할 수 있는 액션 */}
            <div style={{ background:'linear-gradient(135deg, #002045, #1A365D)', borderRadius:20, padding:20, color:'white', marginBottom:24 }}>
              <h3 style={{ fontSize:17, color:'white', marginBottom:14 }}>🚀 지금 바로 시작할 수 있는 핵심 액션</h3>
              {d.futureActions.map((a,i) => (
                <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:i<d.futureActions.length-1?12:0 }}>
                  <div style={{ width:24, height:24, borderRadius:99, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                  <div style={{ fontSize:14, lineHeight:1.5 }}>{a}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 광고 배너 */}
      <AdBanner pageKey="coaching"/>
    </div>
  );
}
