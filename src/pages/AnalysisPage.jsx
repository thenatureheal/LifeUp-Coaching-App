import React, { useState } from 'react';
import { ChevronLeft, Download, ShieldCheck, Equal, AlertTriangle, ChevronRight, BookOpen, Star, FileText } from 'lucide-react';
import { analysisData } from '../data/analysisData';
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
  const [selectedCat, setSelectedCat] = useState(null);
  const [openItem, setOpenItem] = useState(null);
  const { child, categories } = analysisData;
  const cat = selectedCat ? categories.find(c => c.id === selectedCat) : null;

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 16px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={selectedCat ? () => setSelectedCat(null) : onBack} style={{ cursor:'pointer' }}>
          <ChevronLeft size={24} color="#1A365D"/>
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:20, margin:0 }}>{selectedCat ? cat.name : '종합 분석 리포트'}</h2>
          <div style={{ fontSize:13, color:'#43474E' }}>{child.name} ({child.age}세) · {child.testDate}</div>
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
