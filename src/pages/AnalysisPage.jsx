import React, { useState } from 'react';
import { ChevronLeft, Download, ShieldCheck, Equal, AlertTriangle, ChevronRight, BookOpen, Star, FileText, Dna, ArrowRight, Code2, GraduationCap, Trophy, ExternalLink, Target } from 'lucide-react';
import { analysisData } from '../data/analysisData';
import { useAuth } from '../contexts/AuthContext';
import AdBanner from '../components/AdBanner';

const statusConfig = {
  strength: { label: '강점', color: '#22C55E', bg: '#F0FDF4', Icon: ShieldCheck },
  normal:   { label: '보통', color: '#3B82F6', bg: '#EFF6FF', Icon: Equal },
  attention:{ label: '관리필요', color: '#F59E0B', bg: '#FFFBEB', Icon: AlertTriangle },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'4px 10px', borderRadius:99, background:cfg.bg, color:cfg.color, fontSize:12, fontWeight:700 }}>
      <cfg.Icon size={14}/> {cfg.label}
    </span>
  );
}

function CategoryCard({ cat, onClick }) {
  const total = cat.summary.strength + cat.summary.normal + cat.summary.attention;
  const sP = Math.round(cat.summary.strength / total * 100);
  const nP = Math.round(cat.summary.normal / total * 100);
  return (
    <div onClick={onClick} style={{ background:'white', borderRadius:20, padding:20, boxShadow:'0 4px 20px rgba(0,0,0,0.03)', cursor:'pointer', marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <div style={{ fontFamily:'Manrope', fontWeight:700, fontSize:16, color:'#1A1C1C' }}>{cat.name}</div>
        <ChevronRight size={20} color="#74777F"/>
      </div>
      {/* mini bar */}
      <div style={{ display:'flex', borderRadius:99, overflow:'hidden', height:8, marginBottom:12 }}>
        <div style={{ width:`${sP}%`, background:'#22C55E' }}/>
        <div style={{ width:`${nP}%`, background:'#3B82F6' }}/>
        <div style={{ flex:1, background:'#F59E0B' }}/>
      </div>
      <div style={{ display:'flex', gap:16, fontSize:13, color:'#43474E' }}>
        <span>✅ 강점 {cat.summary.strength}</span>
        <span>📊 보통 {cat.summary.normal}</span>
        <span>⚠️ 관리 {cat.summary.attention}</span>
      </div>
    </div>
  );
}

function ItemCard({ item, isOpen, onToggle }) {
  const cfg = statusConfig[item.status];
  return (
    <div style={{ background:'white', borderRadius:20, marginBottom:12, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.02)' }}>
      <div onClick={onToggle} style={{ padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
          <StatusBadge status={item.status}/>
          <div>
            <div style={{ fontWeight:700, fontSize:15, color:'#1A1C1C' }}>{item.name}</div>
            <div style={{ fontSize:12, color:'#74777F' }}>{item.eng}</div>
          </div>
        </div>
        <ChevronRight size={18} color="#74777F" style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition:'transform 0.2s' }}/>
      </div>

      {isOpen && (
        <div style={{ padding:'0 20px 20px', borderTop:'1px solid #F3F3F3' }}>
          <div style={{ marginTop:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'#1A365D', marginBottom:8 }}>
              <BookOpen size={14}/> 전문가 분석 요약
            </div>
            <p style={{ fontSize:14, color:'#43474E', lineHeight:1.6, margin:0 }}>{item.expert}</p>
          </div>

          <div style={{ marginTop:16, background:cfg.bg, borderRadius:12, padding:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:cfg.color, marginBottom:8 }}>
              <Star size={14}/> 성공과 행복을 위한 인생 코칭
            </div>
            <p style={{ fontSize:14, color:'#1A1C1C', lineHeight:1.6, margin:0 }}>{item.coaching}</p>
          </div>

          <div style={{ marginTop:16, background:'#F9F9F9', borderRadius:12, padding:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, color:'#74777F', marginBottom:6 }}>
              <FileText size={12}/> 참고 논문
            </div>
            <p style={{ fontSize:12, color:'#43474E', lineHeight:1.5, margin:0, fontStyle:'italic' }}>{item.paper}</p>
            {item.gene !== '-' && (
              <div style={{ marginTop:8, fontSize:11, color:'#74777F' }}>유전자: {item.gene} | 유전형: {item.genotype}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalysisPage({ onBack }) {
  const { userData } = useAuth();
  const [selectedCat, setSelectedCat] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const { child, categories } = analysisData;
  const cat = selectedCat ? categories.find(c => c.id === selectedCat) : null;

  if (userData && userData.hasAnalysis === false) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', height: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Dna size={48} color="#D4D4D4" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: '#1A1C1C' }}>아직 분석과 코칭을 신청하지 않았습니다</h2>
        <p style={{ fontSize: 14, color: '#74777F', marginBottom: 32, lineHeight: 1.6 }}>
          아이의 유전자 속에 숨겨진 가능성,<br/>
          지금 바로 확인하고 맞춤 코칭을 시작해 보세요.
        </p>
        <div onClick={() => window.location.href='/app/shop'} style={{
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
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 16px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={selectedCat ? () => setSelectedCat(null) : onBack} style={{ cursor:'pointer' }}>
          <ChevronLeft size={24} color="#1A365D"/>
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:20, margin:0 }}>환영합니다, {userData?.name || '회원'}님</h2>
          <div style={{ fontSize:13, color:'#43474E' }}>{selectedCat ? cat.name : '종합 분석 리포트'}</div>
        </div>
        <div onClick={() => alert('PDF 다운로드 기능은 추후 연동됩니다.')} style={{ background:'#1A365D', color:'white', borderRadius:99, padding:'8px 14px', fontSize:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
          <Download size={14}/> PDF
        </div>
      </div>

      <div style={{ padding:'0 24px' }}>
        {!selectedCat ? (
          <>
            {/* Category Overview */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:14, color:'#43474E', lineHeight:1.6, marginBottom:24 }}>
                윤서의 유전자 분석 결과를 대분류별로 요약했습니다. 각 카테고리를 탭하면 세부 항목을 확인할 수 있어요.
              </div>
              {categories.map(c => (
                <CategoryCard key={c.id} cat={c} onClick={() => { setSelectedCat(c.id); setOpenItem(null); }}/>
              ))}
            </div>

            {/* 7세 맞춤 고민 & 솔루션 */}
            <section className="section" style={{ padding: '0', marginBottom: '32px', boxShadow: 'none', background: 'transparent' }}>
              <h3 className="section-header" style={{ paddingLeft: '0', paddingTop: '0' }}>7세 또래 학부모 상담소</h3>
              <div className="scroll-row" style={{ margin: '0 -24px', padding: '0 24px' }}>
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

            {/* 맞춤형 진로 로드맵 */}
            <section className="section" style={{ padding: '0', marginBottom: '32px', boxShadow: 'none', background: 'transparent' }}>
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

            {/* 이달의 주요 목표 */}
            <section className="timeline-section" style={{ padding: '0', marginBottom: '32px', boxShadow: 'none', background: 'transparent' }}>
              <h2 className="timeline-header" style={{ paddingLeft: '0', paddingTop: '0' }}>이달의 주요 목표</h2>
              <div style={{fontSize:12, color:'#6366F1', fontWeight:600, margin:'-8px 0 16px 0'}}>
                🧬 논리력 · 공간지각력 · 과제집중력 강점을 갈고닦는 목표
              </div>
              
              <div className="timeline-item" style={{ paddingLeft: '32px' }}>
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

              <div className="timeline-item" style={{ paddingLeft: '32px' }}>
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

              <div className="timeline-item" style={{ paddingLeft: '32px' }}>
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

              <div className="timeline-item" style={{ paddingLeft: '32px' }}>
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

              <div className="timeline-item" style={{ paddingLeft: '32px' }}>
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
          </>
        ) : (
          <>
            {/* Category Details */}
            {cat.items.length === 0 ? (
              <div style={{ textAlign:'center', padding:'60px 24px', color:'#74777F' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🧬</div>
                <div style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>데이터 연동 준비 중</div>
                <div style={{ fontSize:14 }}>이 카테고리의 세부 항목은 곧 업데이트됩니다.</div>
              </div>
            ) : (
              <>
                {/* Summary bar */}
                <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    <div key={key} style={{ flex:1, background:cfg.bg, borderRadius:12, padding:'12px 8px', textAlign:'center' }}>
                      <div style={{ fontSize:20, fontWeight:800, color:cfg.color, fontFamily:'Manrope' }}>
                        {cat.summary[key]}
                      </div>
                      <div style={{ fontSize:11, color:cfg.color, fontWeight:600 }}>{cfg.label}</div>
                    </div>
                  ))}
                </div>
                {cat.items.map((item, i) => (
                  <ItemCard key={i} item={item} isOpen={openItem === i} onToggle={() => setOpenItem(openItem === i ? null : i)}/>
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* 광고 배너 */}
      <AdBanner pageKey="analysis"/>
    </div>
  );
}
