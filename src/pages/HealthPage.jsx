import React, { useState } from 'react';
import { ChevronLeft, Pill, Apple, Dumbbell, ShieldCheck, Clock, CheckCircle2, AlertTriangle, Calendar } from 'lucide-react';
import { healthData } from '../data/healthData';
import { useAuth } from '../contexts/AuthContext';

const tabs = [
  { k:'suppl', l:'영양제', I:Pill },
  { k:'food', l:'슈퍼푸드', I:Apple },
  { k:'exercise', l:'성장운동', I:Dumbbell },
  { k:'vaccine', l:'예방접종', I:ShieldCheck },
];

const priorityColor = { high:'#EF4444', medium:'#F59E0B', low:'#22C55E' };

export default function HealthPage({ onBack }) {
  const { userData } = useAuth();
  const [tab, setTab] = useState('suppl');
  const d = healthData;

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 12px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={onBack} style={{ cursor:'pointer' }}><ChevronLeft size={24} color="#1A365D"/></div>
        <div>
          <h2 style={{ fontSize:18, margin:0, color:'#1A365D' }}>환영합니다, {userData?.name || '회원'}님</h2>
          <div style={{ fontSize:12, color:'#43474E', marginTop:2 }}>영양 및 건강케어 알림</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:6, padding:'0 24px 16px', overflowX:'auto', scrollbarWidth:'none' }}>
        {tabs.map(t => (
          <div key={t.k} onClick={()=>setTab(t.k)} style={{ padding:'10px 14px', borderRadius:99, background:tab===t.k?'#1A365D':'#F3F3F3', color:tab===t.k?'white':'#43474E', fontSize:13, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap', transition:'all 0.2s' }}>
            <t.I size={14}/> {t.l}
          </div>
        ))}
      </div>

      <div style={{ padding:'0 24px' }}>

        {/* ===== 영양제 ===== */}
        {tab === 'suppl' && (<>
          <div style={{ background:'linear-gradient(135deg,#0EA5E9,#6366F1)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>{d.supplements.month} 맞춤 영양제 플랜</div>
            <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>윤서를 위한 필수 영양제 {d.supplements.items.length}가지</div>
            <div style={{ fontSize:13, opacity:0.9, marginTop:6 }}>유전자 분석 결과 기반 · 소아과 전문의 검수</div>
          </div>
          {d.supplements.items.map((s,i) => (
            <div key={i} style={{ background:'white', borderRadius:20, padding:20, marginBottom:12, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize:16, fontWeight:800 }}>{s.name}</div>
                    <div style={{ fontSize:12, color:'#74777F' }}>{s.dose}</div>
                  </div>
                </div>
                <span style={{ fontSize:11, padding:'3px 10px', borderRadius:99, background: s.priority==='high' ? '#FEF2F2' : '#FFFBEB', color: priorityColor[s.priority], fontWeight:700 }}>
                  {s.priority==='high' ? '필수' : '권장'}
                </span>
              </div>
              <div style={{ fontSize:12, color:'#6366F1', fontWeight:600, marginBottom:8 }}>🧬 {s.gene} · {s.status==='attention'?'⚠️ 관리필요':'📊 보통'}</div>
              <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:'0 0 10px' }}>{s.reason}</p>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#1A365D', fontWeight:600, background:'#EFF6FF', padding:8, borderRadius:10 }}>
                <Clock size={14}/> 복용 시간: {s.timing}
              </div>
            </div>
          ))}
        </>)}

        {/* ===== 슈퍼푸드 ===== */}
        {tab === 'food' && (<>
          <div style={{ background:'linear-gradient(135deg,#10B981,#059669)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>{d.superfoods.month} 슈퍼푸드 가이드</div>
            <div style={{ fontSize:18, fontWeight:800, marginTop:4 }}>{d.superfoods.theme}</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {d.superfoods.items.map((f,i) => (
              <div key={i} style={{ background:'white', borderRadius:16, padding:16, boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                  <span style={{ fontSize:24 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:15 }}>{f.name}</div>
                    <span style={{ fontSize:10, padding:'2px 6px', borderRadius:99, background:f.color+'20', color:f.color, fontWeight:700 }}>{f.category}</span>
                  </div>
                </div>
                <p style={{ fontSize:12, color:'#43474E', lineHeight:1.5, margin:'0 0 8px' }}>{f.benefit}</p>
                <div style={{ fontSize:11, color:'#1A365D', background:'#F0FDF4', padding:8, borderRadius:8 }}>🍽️ {f.recipe}</div>
                <div style={{ fontSize:10, color:'#74777F', marginTop:6 }}>🧬 {f.gene}</div>
              </div>
            ))}
          </div>
        </>)}

        {/* ===== 성장 운동 ===== */}
        {tab === 'exercise' && (<>
          <div style={{ background:'linear-gradient(135deg,#F59E0B,#EF4444)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>윤서의 운동 유형</div>
            <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>{d.exercises.type}</div>
            <p style={{ fontSize:13, opacity:0.9, marginTop:6, lineHeight:1.5 }}>{d.exercises.description}</p>
          </div>

          <h3 style={{ fontSize:16, marginBottom:12 }}>📅 주간 운동 플랜</h3>
          {d.exercises.weekly.map((ex,i) => (
            <div key={i} style={{ background:'white', borderRadius:16, padding:16, marginBottom:10, display:'flex', gap:14, alignItems:'flex-start', boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#F3F3F3', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{ex.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <div style={{ fontWeight:700, fontSize:15 }}>{ex.activity}</div>
                  <span style={{ fontSize:11, color:'#74777F', fontWeight:600 }}>{ex.day}</span>
                </div>
                <div style={{ fontSize:12, color:'#3B82F6', fontWeight:600, marginBottom:4 }}>⏱️ {ex.duration}</div>
                <p style={{ fontSize:12, color:'#43474E', lineHeight:1.5, margin:0 }}>{ex.reason}</p>
                <div style={{ fontSize:10, color:'#74777F', marginTop:6 }}>🧬 {ex.gene}</div>
              </div>
            </div>
          ))}

          <div style={{ background:'#1A365D', borderRadius:16, padding:16, color:'white', marginTop:8 }}>
            <div style={{ fontWeight:700, fontSize:14 }}>🏁 {d.exercises.monthlyGoal}</div>
          </div>
        </>)}

        {/* ===== 예방접종 ===== */}
        {tab === 'vaccine' && (<>
          <div style={{ background:'linear-gradient(135deg,#6366F1,#8B5CF6)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>{d.vaccinations.year}년 예방접종 관리</div>
            <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>접종 현황 & 예정 스케줄</div>
          </div>

          {/* 접종 필요 */}
          <h3 style={{ fontSize:16, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
            <AlertTriangle size={16} color="#F59E0B"/> 예정된 접종 ({d.vaccinations.upcoming.length}건)
          </h3>
          {d.vaccinations.upcoming.map((v,i) => (
            <div key={i} style={{ background:'white', borderRadius:16, padding:16, marginBottom:10, borderLeft:'4px solid #F59E0B', boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{v.name}</div>
                <span style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:'#FFFBEB', color:'#F59E0B', fontWeight:700 }}>접종 필요</span>
              </div>
              <div style={{ display:'flex', gap:10, fontSize:12, color:'#74777F', marginBottom:8 }}>
                <span>📋 대상: {v.age}</span>
                <span style={{ display:'flex', alignItems:'center', gap:3 }}><Calendar size={12}/> {v.deadline}</span>
              </div>
              <div style={{ fontSize:13, color:'#1A365D', background:'#EFF6FF', padding:10, borderRadius:10, lineHeight:1.5 }}>💡 {v.note}</div>
            </div>
          ))}

          {/* 유전자 노트 */}
          <div style={{ background:'#FEF2F2', borderRadius:16, padding:16, marginBottom:20 }}>
            <div style={{ fontSize:13, color:'#991B1B', fontWeight:600, lineHeight:1.6 }}>🧬 {d.vaccinations.geneNote}</div>
          </div>

          {/* 정기 건강 체크 */}
          <h3 style={{ fontSize:16, marginBottom:12 }}>📊 정기 성장 지표 체크</h3>
          {d.vaccinations.growthCheck.map((g,i) => (
            <div key={i} style={{ background:'white', borderRadius:16, padding:16, marginBottom:10, display:'flex', gap:12, alignItems:'flex-start', boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize:24 }}>{g.icon}</span>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>{g.name}</span>
                  <span style={{ fontSize:11, color:'#3B82F6', fontWeight:600 }}>{g.period}</span>
                </div>
                <p style={{ fontSize:12, color:'#43474E', lineHeight:1.5, margin:'6px 0 0' }}>{g.note}</p>
              </div>
            </div>
          ))}

          {/* 완료된 접종 */}
          <h3 style={{ fontSize:16, margin:'20px 0 12px', display:'flex', alignItems:'center', gap:6 }}>
            <CheckCircle2 size={16} color="#22C55E"/> 완료된 접종 ({d.vaccinations.completed.length}건)
          </h3>
          {d.vaccinations.completed.map((v,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom: i<d.vaccinations.completed.length-1 ? '1px solid #F3F3F3' : 'none' }}>
              <CheckCircle2 size={18} color="#22C55E"/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#74777F', textDecoration:'line-through' }}>{v.name}</div>
              </div>
              <span style={{ fontSize:11, color:'#74777F' }}>{v.age}</span>
            </div>
          ))}
        </>)}
      </div>
    </div>
  );
}
