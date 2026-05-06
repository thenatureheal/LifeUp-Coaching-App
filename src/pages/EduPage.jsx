import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, GraduationCap, Compass, MessageSquare, Star, Clock, MapPin, Flame, Trophy, User as UserIcon } from 'lucide-react';
import { eduData } from '../data/eduData';
import { useAuth } from '../contexts/AuthContext';
import AdBanner from '../components/AdBanner';

const sts = { strength:{c:'#22C55E',b:'#F0FDF4',l:'강점'}, normal:{c:'#3B82F6',b:'#EFF6FF',l:'보통'}, attention:{c:'#F59E0B',b:'#FFFBEB',l:'관리필요'} };
const typeColors = { study:'#6366F1', health:'#10B981', break:'#F59E0B', activity:'#EC4899' };

const tabs = [
  { k:'roadmap', l:'성공로드맵', I:Trophy },
  { k:'learn', l:'학습스타일', I:BookOpen },
  { k:'academy', l:'학원매칭', I:GraduationCap },
  { k:'career', l:'진로·직업', I:Compass },
  { k:'community', l:'커뮤니티', I:MessageSquare },
];

export default function EduPage({ onBack }) {
  const { userData } = useAuth();
  const [tab, setTab] = useState('roadmap');
  const d = eduData;

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 12px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={onBack} style={{ cursor:'pointer' }}><ChevronLeft size={24} color="#1A365D"/></div>
        <div>
          <h2 style={{ fontSize:18, margin:0, color:'#1A365D' }}>환영합니다, {userData?.name || '회원'}님</h2>
          <div style={{ fontSize:13, color:'#43474E', marginTop:2 }}>학습 교육 & 진로·직업 로드맵</div>
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

        {/* ===== 4.1 유전자강점 롤모델 성공로드맵 ===== */}
        {tab === 'roadmap' && (<>
          <div style={{ background:'linear-gradient(135deg,#1A365D,#2D4A7A)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.8 }}>🧬 {d.roleModelRoadmap.title}</div>
            <div style={{ fontSize:18, fontWeight:800, marginTop:4 }}>{d.roleModelRoadmap.subtitle}</div>
          </div>

          {d.roleModelRoadmap.portfolios.map((p, pi) => (
            <div key={pi} style={{ background:'white', borderRadius:20, padding:20, marginBottom:20, boxShadow:'0 4px 20px rgba(0,0,0,0.03)', borderTop:`4px solid ${p.color}` }}>
              {/* 포트폴리오 헤더 */}
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                <span style={{ fontSize:32 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize:11, color:p.color, fontWeight:700 }}>포트폴리오 {p.id} · {p.strength}</div>
                  <div style={{ fontSize:17, fontWeight:800 }}>{p.portfolioName}</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:'0 0 14px' }}>{p.description}</p>
              <div style={{ fontSize:11, color:'#74777F' }}>🧬 {p.gene}</div>

              {/* 롤모델 카드 */}
              <div style={{ background: p.color+'12', borderRadius:16, padding:16, margin:'14px 0' }}>
                <div style={{ fontSize:11, color:p.color, fontWeight:700, marginBottom:8 }}>🏆 롤모델 매칭</div>
                <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:10 }}>
                  <div style={{ width:48, height:48, borderRadius:99, background:p.color, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{p.roleModel.photo}</div>
                  <div>
                    <div style={{ fontSize:16, fontWeight:800 }}>{p.roleModel.name}</div>
                    <div style={{ fontSize:12, color:'#74777F' }}>{p.roleModel.title}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:'#1A365D', background:'white', padding:10, borderRadius:10, marginBottom:8, lineHeight:1.5 }}>
                  ⭐ 어린 시절: {p.roleModel.earlyStart}
                </div>
                <div style={{ fontSize:12, color:'#43474E' }}>🔗 매칭 이유: {p.roleModel.matchReason}</div>
              </div>

              {/* 성장 마일스톤 */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>📍 성장 마일스톤</div>
                {p.milestones.map((m, mi) => (
                  <div key={mi} style={{ display:'flex', gap:10, alignItems:'center', padding:'6px 0', position:'relative' }}>
                    {mi < p.milestones.length-1 && <div style={{ position:'absolute', left:9, top:24, bottom:-6, width:2, background:'#E2E2E2' }}/>}
                    <div style={{ width:20, height:20, borderRadius:99, background: m.status==='current' ? p.color : '#E2E2E2', border: m.status==='current' ? 'none' : '2px dashed #C4C4C4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1 }}>
                      {m.status==='current' && <div style={{ width:6, height:6, borderRadius:99, background:'white' }}/>}
                    </div>
                    <div style={{ flex:1, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:13, fontWeight: m.status==='current' ? 700 : 500, color: m.status==='current' ? '#1A1C1C' : '#74777F' }}>{m.action}</span>
                      <span style={{ fontSize:11, color: m.status==='current' ? p.color : '#74777F', fontWeight:600 }}>{m.age}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 추천 활동 */}
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {p.recommendedActivities.map((a, ai) => (
                  <span key={ai} style={{ fontSize:11, padding:'4px 10px', borderRadius:99, background:p.color+'15', color:p.color, fontWeight:600 }}>{a}</span>
                ))}
              </div>
            </div>
          ))}
        </>)}

        {/* ===== 4.2 학습 스타일 & 생활패턴 ===== */}
        {tab === 'learn' && (<>
          {/* 학습 유형 카드 */}
          <div style={{ background:'white', borderRadius:20, padding:20, marginBottom:20, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <span style={{ fontSize:28 }}>{d.learningStyle.icon}</span>
              <div>
                <div style={{ fontSize:12, color:'#6366F1', fontWeight:700 }}>윤서의 학습 유형</div>
                <div style={{ fontSize:18, fontWeight:800, color:'#1A1C1C' }}>{d.learningStyle.type}</div>
              </div>
            </div>
            <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:'8px 0 16px' }}>{d.learningStyle.description}</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {d.learningStyle.details.map((det,i) => (
                <div key={i} style={{ background:'#F9F9F9', borderRadius:12, padding:12 }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{det.icon}</div>
                  <div style={{ fontSize:11, color:'#74777F', fontWeight:600, marginBottom:2 }}>{det.label}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1A1C1C' }}>{det.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 생활패턴 분석 */}
          <h3 style={{ fontSize:16, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>🔄 생활패턴 분석</h3>
          {d.lifePattern.items.map((item,i) => {
            const cfg = sts[item.status];
            return (
              <div key={i} style={{ background:'white', borderRadius:16, padding:16, marginBottom:10, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{item.name}</div>
                  <span style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:cfg.b, color:cfg.c, fontWeight:700 }}>{cfg.l}</span>
                </div>
                <div style={{ fontSize:12, color:'#74777F', marginBottom:6 }}>{item.gene} · {item.value}</div>
                <div style={{ fontSize:13, color:'#1A365D', background:'#EFF6FF', padding:10, borderRadius:10, lineHeight:1.5 }}>💡 {item.solution}</div>
              </div>
            );
          })}

          {/* 하루 스케줄 */}
          <h3 style={{ fontSize:16, margin:'20px 0 12px', display:'flex', alignItems:'center', gap:6 }}>📋 윤서 맞춤 하루 스케줄</h3>
          <div style={{ background:'white', borderRadius:20, padding:16, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
            {d.dailySchedule.map((s,i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'8px 0', borderBottom: i < d.dailySchedule.length-1 ? '1px solid #F3F3F3' : 'none' }}>
                <div style={{ fontSize:12, fontWeight:700, color:'#74777F', width:42, flexShrink:0 }}>{s.time}</div>
                <div style={{ width:8, height:8, borderRadius:99, background:typeColors[s.type], flexShrink:0 }}/>
                <div style={{ fontSize:13, fontWeight:600, color:'#1A1C1C' }}>{s.activity}</div>
              </div>
            ))}
          </div>
        </>)}

        {/* ===== 4.2 학원 매칭 ===== */}
        {tab === 'academy' && (<>
          <div style={{ fontSize:14, color:'#43474E', lineHeight:1.6, marginBottom:20 }}>
            윤서의 유전자 분석 결과를 기반으로 가장 잘 맞는 학원을 추천합니다.
          </div>
          {d.academyMatches.map((ac,i) => (
            <div key={i} style={{ background:'white', borderRadius:20, padding:20, marginBottom:16, boxShadow:'0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <div>
                  <span style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:'#EFF6FF', color:'#3B82F6', fontWeight:700, marginBottom:4, display:'inline-block' }}>{ac.type}</span>
                  <div style={{ fontSize:17, fontWeight:800, color:'#1A1C1C', marginTop:4 }}>{ac.name}</div>
                </div>
                <div style={{ background:'#22C55E', color:'white', borderRadius:99, padding:'6px 12px', fontSize:13, fontWeight:800 }}>
                  {ac.match}%
                </div>
              </div>
              <div style={{ display:'flex', gap:12, marginBottom:12, fontSize:12, color:'#74777F' }}>
                <span style={{ display:'flex', alignItems:'center', gap:3 }}><MapPin size={12}/> {ac.distance}</span>
                <span style={{ display:'flex', alignItems:'center', gap:3 }}><Star size={12} fill="#F59E0B" color="#F59E0B"/> {ac.rating}</span>
              </div>
              <div style={{ fontSize:13, color:'#1A365D', background:'#F0FDF4', padding:12, borderRadius:12, marginBottom:10, lineHeight:1.5 }}>
                🎯 매칭 이유: {ac.reason}
              </div>
              <div style={{ fontSize:12, color:'#43474E', background:'#F9F9F9', padding:10, borderRadius:10 }}>
                📚 커리큘럼: {ac.curriculum}
              </div>
              <div style={{ marginTop:12, background:'#1A365D', color:'white', borderRadius:12, padding:12, textAlign:'center', fontSize:14, fontWeight:700, cursor:'pointer' }}>
                상담 예약하기
              </div>
            </div>
          ))}
        </>)}

        {/* ===== 4.3 진로 & 직업 ===== */}
        {tab === 'career' && (<>
          {/* 현재 단계 */}
          <div style={{ background:'linear-gradient(135deg,#6366F1,#8B5CF6)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9, marginBottom:4 }}>윤서의 현재 단계</div>
            <div style={{ fontSize:22, fontWeight:800 }}>{d.careerRoadmap.current.stage}</div>
            <div style={{ fontSize:14, opacity:0.9, marginTop:4 }}>🎯 {d.careerRoadmap.current.phase}</div>
          </div>

          {/* 연령별 로드맵 */}
          <h3 style={{ fontSize:16, marginBottom:14 }}>📍 연령별 진로 준비 로드맵</h3>
          {d.careerRoadmap.stages.map((st,i) => (
            <div key={i} style={{ display:'flex', gap:14, marginBottom:20, position:'relative' }}>
              {i < d.careerRoadmap.stages.length-1 && <div style={{ position:'absolute', left:19, top:40, bottom:-20, width:2, background:'#E2E2E2' }}/>}
              <div style={{ width:40, height:40, borderRadius:99, background:st.color, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, zIndex:1 }}>
                {st.period.match(/\d+/)[0]}
              </div>
              <div style={{ flex:1, background:'white', borderRadius:16, padding:16, boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize:12, color:st.color, fontWeight:700, marginBottom:2 }}>{st.period}</div>
                <div style={{ fontSize:15, fontWeight:700, color:'#1A1C1C', marginBottom:10 }}>{st.phase}</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                  {st.actions.map((a,j) => (
                    <span key={j} style={{ fontSize:11, padding:'4px 10px', borderRadius:99, background:'#F3F3F3', fontWeight:600 }}>{a}</span>
                  ))}
                </div>
                <div style={{ fontSize:13, color:'#1A365D', fontWeight:600, background:'#EFF6FF', padding:10, borderRadius:10 }}>
                  🏁 목표: {st.goal}
                </div>
              </div>
            </div>
          ))}

          {/* 추천 전공 */}
          <h3 style={{ fontSize:16, marginBottom:12 }}>🎓 유전자 기반 추천 전공/학과</h3>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
            {d.careerRoadmap.recommendedMajors.map((m,i) => (
              <span key={i} style={{ padding:'8px 16px', borderRadius:99, background:'white', fontWeight:700, fontSize:13, boxShadow:'0 2px 10px rgba(0,0,0,0.03)' }}>{m}</span>
            ))}
          </div>
        </>)}

        {/* ===== 4.4 커뮤니티 위클리 이슈 ===== */}
        {tab === 'community' && (<>
          <div style={{ fontSize:14, color:'#43474E', marginBottom:20 }}>
            📅 <strong>{d.weeklyIssues.week}</strong> 학부모님들의 가장 뜨거운 관심 주제
          </div>

          {[
            { title: '🍼 양육 이슈 TOP 5', data: d.weeklyIssues.parenting, color: '#EC4899' },
            { title: '🎓 진학·입시 이슈 TOP 5', data: d.weeklyIssues.admission, color: '#6366F1' },
            { title: '📚 교육 트렌드 TOP 5', data: d.weeklyIssues.education, color: '#10B981' },
          ].map((section,si) => (
            <div key={si} style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:16, marginBottom:12, color:section.color }}>{section.title}</h3>
              {section.data.map((issue,i) => (
                <div key={i} style={{ background:'white', borderRadius:14, padding:'14px 16px', marginBottom:8, display:'flex', alignItems:'flex-start', gap:12, boxShadow:'0 2px 10px rgba(0,0,0,0.02)', cursor:'pointer' }}>
                  <div style={{ width:28, height:28, borderRadius:99, background: issue.rank <= 3 ? section.color : '#E2E2E2', color: issue.rank <= 3 ? 'white' : '#74777F', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, flexShrink:0 }}>
                    {issue.rank}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:600, color:'#1A1C1C', lineHeight:1.4, display:'flex', alignItems:'center', gap:4 }}>
                      {issue.hot && <Flame size={14} color="#EF4444"/>}
                      {issue.title}
                    </div>
                    <div style={{ fontSize:12, color:'#74777F', marginTop:4, display:'flex', alignItems:'center', gap:4 }}>
                      <MessageSquare size={12}/> 댓글 {issue.comments}개
                    </div>
                  </div>
                  <ChevronRight size={16} color="#74777F" style={{ flexShrink:0, marginTop:4 }}/>
                </div>
              ))}
            </div>
          ))}
        </>)}
      </div>

      {/* 광고 배너 */}
      <AdBanner pageKey="edu"/>
    </div>
  );
}
