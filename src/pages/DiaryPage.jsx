import React, { useState, useRef } from 'react';
import { ChevronLeft, Target, Plus, CheckCircle2, Circle, Clock, Edit3, Star, Sparkles, Camera, Download, BookOpen, X, Heart, MessageCircle, Send, Users, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const tabs = [
  { k:'goals', l:'목표 실천', I:Target },
  { k:'issues', l:'성장이슈', I:Sparkles },
  { k:'history', l:'성장역사', I:Clock },
  { k:'insta', l:'성장 인스타', I:Users },
];

const catColors = { 학습:'#6366F1', 학원:'#3B82F6', 독서:'#8B5CF6', 건강:'#EF4444', 활동:'#EC4899', 운동:'#10B981' };

export default function DiaryPage({ onBack }) {
  const [tab, setTab] = useState('goals');
  const [goalPhotos, setGoalPhotos] = useState({});
  const [issuePhotos, setIssuePhotos] = useState({});
  const [showPhotoModal, setShowPhotoModal] = useState(null);
  const [showNewIssue, setShowNewIssue] = useState(false);
  const [newIssueText, setNewIssueText] = useState('');
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssuePhoto, setNewIssuePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const issueFileRef = useRef(null);
  const newIssueFileRef = useRef(null);
  const instaFileRef = useRef(null);

  const month = '2026년 4월';

  // 인스타 커뮤니티 state
  const [instaNewText, setInstaNewText] = useState('');
  const [instaNewPhoto, setInstaNewPhoto] = useState(null);
  const [instaNewTag, setInstaNewTag] = useState('자랑');
  const [instaLikes, setInstaLikes] = useState({});
  const [instaShowComments, setInstaShowComments] = useState(null);
  const [instaCommentText, setInstaCommentText] = useState('');
  const [instaBookmarks, setInstaBookmarks] = useState({});
  const [instaComments, setInstaComments] = useState({
    1: [{ user:'하은맘', text:'대단해요! 스크래치 시작할 때 어떤 교재 쓰셨어요?', time:'2시간 전' }],
    2: [{ user:'민준맘', text:'우리 아이도 비슷한 시기예요! 같이 응원해요 💪', time:'5시간 전' }],
    4: [{ user:'서준맘', text:'수학 학원 체험 후기가 궁금해요! 어떤 학원이였나요?', time:'1일 전' }],
  });

  const [instaPosts, setInstaPosts] = useState([
    { id:1, user:'윤서맘', avatar:'🧬', time:'30분 전', tag:'자랑',
      title:'스크래치 코딩 첫 게임 완성! 🎮',
      content:'우리 윤서가 7살에 처음으로 스크래치에서 고양이 움직이는 게임을 만들었어요! 논리적 사고력이 유전자 분석대로 정말 강한 것 같아요. 2주 만에 혼자서 조건문까지 이해했습니다 😊',
      photo: null,
      likes:24, comments:3, gene:'논리력 ✅' },
    { id:2, user:'하은맘', avatar:'🌸', time:'2시간 전', tag:'질문',
      title:'6세 아이 첫 영어 시작 시기 고민이에요 🤔',
      content:'유전자 분석에서 언어 습득력이 상위 15%로 나왔는데, 지금 시작하는 게 좋을까요? 아니면 한글 완성 후가 좋을까요? 비슷한 경험 있으신 맘들 조언 부탁드려요!',
      photo: null,
      likes:18, comments:7, gene:'언어습득 ✅' },
    { id:3, user:'민준맘', avatar:'⚡', time:'5시간 전', tag:'성장기록',
      title:'수영 자유형 25m 드디어 완주! 🏊',
      content:'3개월 동안 매주 3회 수영 레슨 받은 민준이가 드디어 25m 자유형 완주했습니다! 유전자 결과에서 지구력이 상위 10%라고 해서 수영을 시작했는데 정말 잘 맞는 것 같아요.',
      photo: null,
      likes:42, comments:12, gene:'지구력 ✅' },
    { id:4, user:'서준맘', avatar:'📚', time:'1일 전', tag:'의견교환',
      title:'사고력 수학 vs 교과 수학, 어떤 게 먼저일까요?',
      content:'서준이 유전자 분석에서 패턴 인식 강점이 나왔어요. 사고력 수학 학원이랑 교과 수학 학원 중에 고민인데, 선배맘들 의견 듣고 싶습니다. CMS, 시매쓰 다녀보신 분 계세요?',
      photo: null,
      likes:31, comments:15, gene:'패턴인식 ✅' },
    { id:5, user:'지우맘', avatar:'🎨', time:'1일 전', tag:'자랑',
      title:'미술대회 은상 수상! 공간지각력의 힘 🏆',
      content:'유전자 결과에서 공간지각력이 최상위였던 지우가 전국 어린이 미술대회에서 은상을 받았어요! 3D 구조물 만들기 부문이었는데, 정말 공간감각이 남다른 것 같아요.',
      photo: null,
      likes:56, comments:8, gene:'공간지각 ✅' },
  ]);

  const tagColors = { '자랑':'#22C55E', '질문':'#3B82F6', '성장기록':'#8B5CF6', '의견교환':'#F59E0B' };

  const addInstaPost = () => {
    if (!instaNewText.trim()) return;
    const newPost = {
      id: instaPosts.length + 100,
      user: '윤서맘', avatar: '🧬', time: '방금 전', tag: instaNewTag,
      title: instaNewText.split('\n')[0] || instaNewText.slice(0,30),
      content: instaNewText,
      photo: instaNewPhoto,
      likes: 0, comments: 0, gene: '논리력 ✅',
    };
    setInstaPosts([newPost, ...instaPosts]);
    setInstaNewText('');
    setInstaNewPhoto(null);
  };

  const addInstaComment = (postId) => {
    if (!instaCommentText.trim()) return;
    setInstaComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId]||[]), { user:'윤서맘', text:instaCommentText, time:'방금 전' }]
    }));
    setInstaCommentText('');
  };

  const [goals, setGoals] = useState([
    { id:1, text:'스크래치 코딩 기초 완료하기', category:'학습', done:true, date:'4/2' },
    { id:2, text:'사고력 수학 학원 체험 수업 다녀오기', category:'학원', done:true, date:'4/3' },
    { id:3, text:'과학 실험 그림책 3권 읽기', category:'독서', done:false, progress:1, total:3 },
    { id:4, text:'DTaP 5차 예방접종 받기', category:'건강', done:false },
    { id:5, text:'레고 테크닉 프로젝트 완성하기', category:'활동', done:false },
    { id:6, text:'매일 아침 스트레칭 20일 달성', category:'운동', done:false, progress:12, total:20 },
  ]);

  const [issues, setIssues] = useState([
    { id:1, date:'4월 3일', title:'처음으로 코딩으로 게임을 만들었어요!',
      content:'스크래치에서 고양이를 움직이는 간단한 게임을 만들었습니다. 논리적 순서를 스스로 생각해서 만든 첫 프로그램이에요!',
      emotion:'😊 뿌듯', tag:'🧠 논리력', color:'#6366F1' },
    { id:2, date:'4월 1일', title:'친구와 싸우고 스스로 화해했어요',
      content:'놀이터에서 친구와 장난감 때문에 다툼이 있었지만, 먼저 "미안해"라고 말하고 해결했습니다. 공감능력이 성장하고 있어요!',
      emotion:'💪 성장', tag:'💕 공감력', color:'#EC4899' },
  ]);

  const historyData = [
    { month:'2026년 4월', goals:6, done:2, issues:2, highlight:'코딩 첫 프로그램 제작', hasPhotos:true },
    { month:'2026년 3월', goals:5, done:5, issues:3, highlight:'수영 자유형 25m 완주', hasPhotos:true },
    { month:'2026년 2월', goals:4, done:3, issues:1, highlight:'한글 받아쓰기 100점', hasPhotos:false },
    { month:'2026년 1월', goals:5, done:4, issues:2, highlight:'레고 테크닉 첫 조립', hasPhotos:true },
    { month:'2025년 12월', goals:4, done:4, issues:2, highlight:'크리스마스 과학 실험', hasPhotos:true },
  ];

  // 사진 업로드 핸들러
  const handlePhotoUpload = (e, type, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (type === 'goal') {
        setGoalPhotos(prev => ({ ...prev, [id]: ev.target.result }));
      } else if (type === 'issue') {
        setIssuePhotos(prev => ({ ...prev, [id]: ev.target.result }));
      } else if (type === 'newIssue') {
        setNewIssuePhoto(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // 새 성장이슈 추가
  const addNewIssue = () => {
    if (!newIssueTitle.trim()) return;
    const newId = issues.length + 1;
    const newIssue = {
      id: newId,
      date: '4월 4일',
      title: newIssueTitle,
      content: newIssueText,
      emotion: '✨ 기록',
      tag: '📝 기록',
      color: '#10B981',
    };
    setIssues([newIssue, ...issues]);
    if (newIssuePhoto) {
      setIssuePhotos(prev => ({ ...prev, [newId]: newIssuePhoto }));
    }
    setNewIssueTitle('');
    setNewIssueText('');
    setNewIssuePhoto(null);
    setShowNewIssue(false);
  };

  // 포트폴리오 다운로드 (HTML 기반 책 생성)
  const downloadPortfolio = () => {
    const allPhotos = { ...goalPhotos, ...Object.fromEntries(Object.entries(issuePhotos).map(([k,v]) => [`issue_${k}`, v])) };
    const photoImgs = Object.values(allPhotos).map((src) => 
      `<div style="page-break-inside:avoid;margin:20px 0;text-align:center"><img src="${src}" style="max-width:100%;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1)"/></div>`
    ).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>윤서의 인생 포트폴리오</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Apple SD Gothic Neo',sans-serif;background:#FFF;color:#1A1C1C}
.cover{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,#1A365D,#2D4A7A);color:white;text-align:center;page-break-after:always}
.cover h1{font-size:36px;margin-bottom:12px}.cover p{font-size:18px;opacity:0.8}
.page{padding:40px;page-break-after:always}.page h2{font-size:24px;color:#1A365D;margin-bottom:20px;border-bottom:3px solid #6366F1;padding-bottom:8px}
.goal{padding:12px 0;border-bottom:1px solid #eee;display:flex;gap:12px;align-items:center}
.goal .check{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px}
.done{background:#22C55E;color:white}.notdone{background:#E2E2E2;color:#999}
.issue{background:#F9FAFB;border-radius:16px;padding:20px;margin:16px 0;border-left:4px solid #6366F1}
.issue h3{font-size:18px;margin-bottom:8px}.issue p{font-size:14px;color:#43474E;line-height:1.6}
.timeline{padding:12px 0;border-bottom:1px solid #eee}.timeline h3{font-size:16px;color:#1A365D}
.photos{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}
.photos img{width:100%;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08)}
</style></head><body>
<div class="cover"><div style="font-size:64px;margin-bottom:20px">📖</div><h1>윤서의 인생 포트폴리오</h1><p>LifeUp Kids · 성장일기 기록집</p><p style="margin-top:8px;font-size:14px">2025년 12월 ~ 2026년 4월</p></div>
<div class="page"><h2>📋 이달의 목표 실천 기록</h2>${goals.map(g => 
  `<div class="goal"><div class="check ${g.done?'done':'notdone'}">${g.done?'✓':'○'}</div><div><strong>${g.text}</strong><br/><span style="font-size:12px;color:#74777F">${g.category} ${g.done?'· '+g.date+' 완료':''}</span></div></div>`
).join('')}</div>
<div class="page"><h2>✨ 특별한 성장 순간들</h2>${issues.map(issue => 
  `<div class="issue"><h3>${issue.title}</h3><p>${issue.content}</p><div style="margin-top:8px;font-size:12px;color:#74777F">${issue.date} · ${issue.emotion}</div></div>`
).join('')}</div>
<div class="page"><h2>📸 우리 아이 성장 사진첩</h2><div class="photos">${photoImgs || '<p style="color:#999;text-align:center;grid-column:1/-1;padding:40px">아직 업로드된 사진이 없습니다.</p>'}</div></div>
<div class="page"><h2>📅 성장 역사 타임라인</h2>${historyData.map(h => 
  `<div class="timeline"><h3>${h.month}</h3><div style="font-size:14px;color:#43474E;margin:6px 0">목표 ${h.done}/${h.goals} 달성 · 성장이슈 ${h.issues}건</div><div style="font-size:13px;color:#6366F1">⭐ ${h.highlight}</div></div>`
).join('')}</div>
<div class="cover" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)"><div style="font-size:64px;margin-bottom:20px">💖</div><h1>윤서의 성장은 계속됩니다</h1><p>LifeUp Kids와 함께하는 인생 코칭</p></div>
</body></html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '윤서의_인생_포트폴리오.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingBottom:100 }}>
      {/* Header */}
      <div style={{ padding:'32px 24px 12px', display:'flex', alignItems:'center', gap:12 }}>
        <div onClick={onBack} style={{ cursor:'pointer' }}><ChevronLeft size={24} color="#1A365D"/></div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:18, margin:0, color:'#1A365D' }}>이달의 성장일기</h2>
          <div style={{ fontSize:12, color:'#43474E', marginTop:2 }}>윤서 (7세) · {month}</div>
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

        {/* ===== 5.1 주요 목표 실천기록 + 사진 업로드 ===== */}
        {tab === 'goals' && (<>
          <div style={{ background:'linear-gradient(135deg,#6366F1,#8B5CF6)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div>
                <div style={{ fontSize:12, opacity:0.9 }}>{month} 달성률</div>
                <div style={{ fontSize:28, fontWeight:800 }}>{Math.round(goals.filter(g=>g.done).length / goals.length * 100)}%</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:24, fontWeight:800 }}>{goals.filter(g=>g.done).length}/{goals.length}</div>
                <div style={{ fontSize:12, opacity:0.9 }}>목표 달성</div>
              </div>
            </div>
            <div style={{ height:8, background:'rgba(255,255,255,0.25)', borderRadius:99, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${goals.filter(g=>g.done).length / goals.length * 100}%`, background:'white', borderRadius:99, transition:'width 0.5s' }}/>
            </div>
          </div>

          {goals.map((g,i) => (
            <div key={i} style={{ background:'white', borderRadius:16, padding:16, marginBottom:10, boxShadow:'0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ marginTop:2, cursor:'pointer' }} onClick={() => {
                  const updated = [...goals];
                  updated[i] = { ...g, done: !g.done, date: g.done ? undefined : '4/4' };
                  setGoals(updated);
                }}>
                  {g.done ? <CheckCircle2 size={22} color="#22C55E"/> : <Circle size={22} color="#D4D4D4"/>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:14, fontWeight:600, color: g.done ? '#74777F' : '#1A1C1C', textDecoration: g.done ? 'line-through' : 'none' }}>{g.text}</span>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background: catColors[g.category]+'20', color:catColors[g.category], fontWeight:700, flexShrink:0 }}>{g.category}</span>
                  </div>
                  {g.progress !== undefined && !g.done && (
                    <div style={{ marginTop:8 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#74777F', marginBottom:4 }}>
                        <span>진행중</span><span>{g.progress}/{g.total}</span>
                      </div>
                      <div style={{ height:6, background:'#F3F3F3', borderRadius:99, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${g.progress/g.total*100}%`, background:catColors[g.category], borderRadius:99 }}/>
                      </div>
                    </div>
                  )}
                  {g.done && <div style={{ fontSize:11, color:'#74777F', marginTop:4 }}>✅ {g.date} 완료</div>}

                  {/* 사진 영역 */}
                  {goalPhotos[g.id] && (
                    <div style={{ marginTop:10, position:'relative' }}>
                      <img src={goalPhotos[g.id]} alt="" style={{ width:'100%', borderRadius:12, maxHeight:180, objectFit:'cover' }} onClick={() => setShowPhotoModal(goalPhotos[g.id])}/>
                      <div onClick={() => setGoalPhotos(prev => { const n = {...prev}; delete n[g.id]; return n; })} style={{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:99, background:'rgba(0,0,0,0.5)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <X size={14}/>
                      </div>
                    </div>
                  )}

                  {/* 사진 첨부 버튼 */}
                  <div onClick={() => { fileInputRef.current.dataset.goalId = g.id; fileInputRef.current.click(); }} style={{ marginTop:8, display:'flex', alignItems:'center', gap:4, cursor:'pointer', color:'#6366F1', fontSize:12, fontWeight:600 }}>
                    <Camera size={14}/> {goalPhotos[g.id] ? '사진 변경' : '📸 인증 사진 첨부'}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => handlePhotoUpload(e, 'goal', parseInt(fileInputRef.current.dataset.goalId))} />

          <div style={{ background:'#F3F3F3', borderRadius:16, padding:16, textAlign:'center', cursor:'pointer', marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'#43474E', fontWeight:600 }}>
            <Plus size={18}/> 새로운 목표 추가하기
          </div>
        </>)}

        {/* ===== 5.2 특별한 성장이슈 기록 + 사진 ===== */}
        {tab === 'issues' && (<>
          <div style={{ background:'linear-gradient(135deg,#EC4899,#F59E0B)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>{month}</div>
            <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>특별한 성장 순간을 기록하세요</div>
            <div style={{ fontSize:13, opacity:0.9, marginTop:6 }}>📸 사진과 함께 기록하면 인생 포트폴리오가 됩니다!</div>
          </div>

          {/* 새 이슈 작성 폼 */}
          {showNewIssue && (
            <div style={{ background:'white', borderRadius:20, padding:20, marginBottom:14, boxShadow:'0 4px 20px rgba(0,0,0,0.06)', border:'2px solid #6366F1' }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#1A365D', marginBottom:12 }}>✨ 새 성장 이슈 기록</div>
              <input
                value={newIssueTitle}
                onChange={e => setNewIssueTitle(e.target.value)}
                placeholder="제목을 입력하세요 (예: 처음으로 자전거를 탔어요!)"
                style={{ width:'100%', padding:12, borderRadius:12, border:'1px solid #E2E2E2', fontSize:14, marginBottom:10, outline:'none' }}
              />
              <textarea
                value={newIssueText}
                onChange={e => setNewIssueText(e.target.value)}
                placeholder="어떤 성장이 있었나요? 자세히 기록해 주세요..."
                style={{ width:'100%', padding:12, borderRadius:12, border:'1px solid #E2E2E2', fontSize:13, minHeight:80, resize:'none', lineHeight:1.5, outline:'none' }}
              />
              {/* 사진 미리보기 */}
              {newIssuePhoto && (
                <div style={{ position:'relative', marginTop:10 }}>
                  <img src={newIssuePhoto} alt="" style={{ width:'100%', borderRadius:12, maxHeight:200, objectFit:'cover' }}/>
                  <div onClick={() => setNewIssuePhoto(null)} style={{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:99, background:'rgba(0,0,0,0.5)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                    <X size={14}/>
                  </div>
                </div>
              )}
              <div style={{ display:'flex', gap:8, marginTop:12 }}>
                <div onClick={() => newIssueFileRef.current.click()} style={{ flex:1, padding:12, borderRadius:12, border:'1px dashed #6366F1', textAlign:'center', cursor:'pointer', color:'#6366F1', fontSize:13, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
                  <Camera size={16}/> {newIssuePhoto ? '사진 변경' : '사진 첨부'}
                </div>
                <div onClick={addNewIssue} style={{ flex:1, padding:12, borderRadius:12, background:'#1A365D', color:'white', textAlign:'center', cursor:'pointer', fontSize:13, fontWeight:700 }}>
                  기록하기
                </div>
              </div>
              <input ref={newIssueFileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => handlePhotoUpload(e, 'newIssue')} />
            </div>
          )}

          {issues.map((issue,i) => (
            <div key={i} style={{ background:'white', borderRadius:20, padding:20, marginBottom:14, boxShadow:'0 4px 20px rgba(0,0,0,0.03)', borderLeft:`4px solid ${issue.color}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <div style={{ fontSize:12, color:'#74777F' }}>{issue.date}</div>
                <div style={{ display:'flex', gap:6 }}>
                  <span style={{ fontSize:11, padding:'2px 8px', borderRadius:99, background:issue.color+'15', color:issue.color, fontWeight:700 }}>{issue.tag}</span>
                  <span style={{ fontSize:11, padding:'2px 8px', borderRadius:99, background:'#F3F3F3', fontWeight:600 }}>{issue.emotion}</span>
                </div>
              </div>
              <div style={{ fontSize:16, fontWeight:700, color:'#1A1C1C', marginBottom:8 }}>{issue.title}</div>
              <p style={{ fontSize:13, color:'#43474E', lineHeight:1.6, margin:0 }}>{issue.content}</p>

              {/* 이슈 사진 */}
              {issuePhotos[issue.id] && (
                <div style={{ marginTop:12, position:'relative' }}>
                  <img src={issuePhotos[issue.id]} alt="" style={{ width:'100%', borderRadius:12, maxHeight:200, objectFit:'cover', cursor:'pointer' }} onClick={() => setShowPhotoModal(issuePhotos[issue.id])}/>
                  <div onClick={() => setIssuePhotos(prev => { const n = {...prev}; delete n[issue.id]; return n; })} style={{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:99, background:'rgba(0,0,0,0.5)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                    <X size={14}/>
                  </div>
                </div>
              )}

              {/* 사진 첨부 버튼 */}
              <div onClick={() => { issueFileRef.current.dataset.issueId = issue.id; issueFileRef.current.click(); }} style={{ marginTop:10, display:'flex', alignItems:'center', gap:4, cursor:'pointer', color: issue.color, fontSize:12, fontWeight:600 }}>
                <Camera size={14}/> {issuePhotos[issue.id] ? '사진 변경' : '📸 성장 사진 첨부'}
              </div>
            </div>
          ))}
          <input ref={issueFileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={(e) => handlePhotoUpload(e, 'issue', parseInt(issueFileRef.current.dataset.issueId))} />

          <div onClick={() => setShowNewIssue(!showNewIssue)} style={{ background:'#1A365D', borderRadius:16, padding:16, textAlign:'center', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, color:'white', fontWeight:700, fontSize:14 }}>
            <Edit3 size={16}/> {showNewIssue ? '취소' : '오늘의 성장 이슈 기록하기'}
          </div>
        </>)}

        {/* ===== 5.3 한눈에 보는 성장역사 (책 형태) ===== */}
        {tab === 'history' && (<>
          {/* 포트폴리오 다운로드 배너 */}
          <div onClick={downloadPortfolio} style={{ background:'linear-gradient(135deg,#6366F1,#EC4899)', borderRadius:20, padding:20, color:'white', marginBottom:20, cursor:'pointer', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-20, right:-10, fontSize:80, opacity:0.15 }}>📖</div>
            <div style={{ display:'flex', alignItems:'center', gap:14, position:'relative', zIndex:1 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <BookOpen size={28} color="white"/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, opacity:0.9 }}>우리 아이 인생 포트폴리오</div>
                <div style={{ fontSize:18, fontWeight:800, marginTop:2 }}>성장일기 책으로 다운로드</div>
                <div style={{ fontSize:12, opacity:0.85, marginTop:4 }}>목표 · 이슈 · 사진이 담긴 1권의 포트폴리오</div>
              </div>
              <Download size={24} color="white"/>
            </div>
          </div>

          {/* 통계 요약 */}
          <div style={{ background:'linear-gradient(135deg,#1A365D,#2D4A7A)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ fontSize:12, opacity:0.9 }}>윤서의 성장 타임라인</div>
            <div style={{ fontSize:20, fontWeight:800, marginTop:4 }}>한눈에 보는 성장역사</div>
            <div style={{ display:'flex', gap:16, marginTop:14 }}>
              {[{v:'24',l:'총 목표'},{v:'18',l:'달성'},{v:'10',l:'성장이슈'},{v:'75%',l:'평균 달성률'}].map((s,i)=>(
                <div key={i} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:22, fontWeight:800 }}>{s.v}</div>
                  <div style={{ fontSize:11, opacity:0.8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 첨부된 사진 갤러리 */}
          {(Object.keys(goalPhotos).length > 0 || Object.keys(issuePhotos).length > 0) && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>📸 성장 사진첩 <span style={{ fontSize:12, color:'#74777F', fontWeight:500 }}>({Object.keys(goalPhotos).length + Object.keys(issuePhotos).length}장)</span></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
                {[...Object.values(goalPhotos), ...Object.values(issuePhotos)].map((src,i) => (
                  <div key={i} onClick={() => setShowPhotoModal(src)} style={{ cursor:'pointer', position:'relative' }}>
                    <img src={src} alt="" style={{ width:'100%', height:100, objectFit:'cover', borderRadius:12, boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}/>
                    {/* 책 페이지 효과 */}
                    <div style={{ position:'absolute', bottom:4, right:4, width:20, height:20, borderRadius:4, background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#6366F1' }}>{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 타임라인 */}
          <div style={{ fontSize:15, fontWeight:700, marginBottom:14, display:'flex', alignItems:'center', gap:6 }}>📅 월별 성장 기록</div>
          {historyData.map((h,i) => (
            <div key={i} style={{ display:'flex', gap:14, marginBottom:16, position:'relative' }}>
              {i < historyData.length-1 && <div style={{ position:'absolute', left:19, top:40, bottom:-16, width:2, background:'#E2E2E2' }}/>}
              <div style={{ width:40, height:40, borderRadius:99, background: i===0 ? '#6366F1' : '#F3F3F3', color: i===0 ? 'white' : '#74777F', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, zIndex:1 }}>
                {h.month.slice(-3,-1)}
              </div>
              <div style={{ flex:1, background:'white', borderRadius:16, padding:16, boxShadow:'0 2px 12px rgba(0,0,0,0.02)', position:'relative' }}>
                {/* 책 느낌 상단 장식 */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background: i===0 ? 'linear-gradient(90deg,#6366F1,#EC4899)' : '#F3F3F3', borderRadius:'16px 16px 0 0' }}/>
                <div style={{ fontSize:14, fontWeight:700, color:'#1A1C1C', marginBottom:8, marginTop:4 }}>{h.month}</div>
                <div style={{ display:'flex', gap:12, marginBottom:10 }}>
                  <div style={{ fontSize:12, color:'#22C55E', fontWeight:600 }}>✅ {h.done}/{h.goals} 달성</div>
                  <div style={{ fontSize:12, color:'#6366F1', fontWeight:600 }}>✨ 이슈 {h.issues}건</div>
                  {h.hasPhotos && <div style={{ fontSize:12, color:'#EC4899', fontWeight:600 }}>📸 사진</div>}
                </div>
                <div style={{ height:6, background:'#F3F3F3', borderRadius:99, overflow:'hidden', marginBottom:8 }}>
                  <div style={{ height:'100%', width:`${h.done/h.goals*100}%`, background: h.done===h.goals ? '#22C55E' : '#6366F1', borderRadius:99 }}/>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B"/>
                  <span style={{ fontSize:13, color:'#43474E', fontWeight:600 }}>{h.highlight}</span>
                </div>

                {/* 해당 월 사진 미리보기 (현재 월만) */}
                {i === 0 && (Object.keys(goalPhotos).length > 0 || Object.keys(issuePhotos).length > 0) && (
                  <div style={{ display:'flex', gap:6, marginTop:10, overflowX:'auto' }}>
                    {[...Object.values(goalPhotos).slice(0,3), ...Object.values(issuePhotos).slice(0,2)].map((src,j) => (
                      <img key={j} src={src} alt="" onClick={() => setShowPhotoModal(src)} style={{ width:60, height:60, borderRadius:8, objectFit:'cover', flexShrink:0, cursor:'pointer', border:'2px solid white', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}/>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </>)}

        {/* ===== 5.4 우리아이 성장 인스타 ===== */}
        {tab === 'insta' && (<>
          {/* 헤더 배너 */}
          <div style={{ background:'linear-gradient(135deg,#E91E63,#FF6F00,#FF9800)', borderRadius:20, padding:20, color:'white', marginBottom:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
              <Users size={20}/>
              <span style={{ fontSize:18, fontWeight:800 }}>우리아이 성장 인스타</span>
            </div>
            <div style={{ fontSize:13, opacity:0.95 }}>학부모들과 성장 기록을 공유하고, 질문하고, 응원해주세요! 💬</div>
            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              {[{v:'1.2K',l:'학부모'},{v:'324',l:'게시글'},{v:'5.8K',l:'응원'}].map((s,i)=>(
                <div key={i} style={{ background:'rgba(255,255,255,0.18)', borderRadius:10, padding:'6px 12px', textAlign:'center' }}>
                  <div style={{ fontSize:16, fontWeight:800 }}>{s.v}</div>
                  <div style={{ fontSize:10, opacity:0.85 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 게시글 작성 */}
          <div style={{ background:'white', borderRadius:20, padding:16, marginBottom:16, boxShadow:'0 2px 14px rgba(0,0,0,0.04)' }}>
            <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, borderRadius:99, background:'linear-gradient(135deg,#6366F1,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>🧬</div>
              <div style={{ flex:1 }}>
                <textarea value={instaNewText} onChange={e=>setInstaNewText(e.target.value)} placeholder="우리 아이 성장 이야기를 공유해주세요..." style={{ width:'100%', border:'none', outline:'none', resize:'none', fontSize:14, lineHeight:1.5, minHeight:50, fontFamily:'inherit' }}/>
                {instaNewPhoto && (
                  <div style={{ position:'relative', marginTop:8 }}>
                    <img src={instaNewPhoto} alt="" style={{ width:'100%', borderRadius:12, maxHeight:200, objectFit:'cover' }}/>
                    <div onClick={()=>setInstaNewPhoto(null)} style={{ position:'absolute', top:6, right:6, width:24, height:24, borderRadius:99, background:'rgba(0,0,0,0.5)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><X size={14}/></div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10, paddingTop:10, borderTop:'1px solid #F3F3F3' }}>
              <div style={{ display:'flex', gap:6 }}>
                {Object.keys(tagColors).map(t => (
                  <span key={t} onClick={()=>setInstaNewTag(t)} style={{ padding:'4px 10px', borderRadius:99, fontSize:11, fontWeight:700, cursor:'pointer', background: instaNewTag===t ? tagColors[t]+'20' : '#F9F9F9', color: instaNewTag===t ? tagColors[t] : '#999', border: instaNewTag===t ? `1.5px solid ${tagColors[t]}` : '1.5px solid transparent', transition:'all 0.2s' }}>#{t}</span>
                ))}
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <Camera size={20} color="#6366F1" style={{cursor:'pointer'}} onClick={()=>instaFileRef.current.click()}/>
                <div onClick={addInstaPost} style={{ padding:'6px 16px', borderRadius:99, background: instaNewText.trim() ? '#1A365D' : '#E2E2E2', color: instaNewText.trim() ? 'white' : '#999', fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>게시</div>
              </div>
            </div>
            <input ref={instaFileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{ const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>setInstaNewPhoto(ev.target.result); r.readAsDataURL(f); }}/>
          </div>

          {/* 피드 */}
          {instaPosts.map(post => (
            <div key={post.id} style={{ background:'white', borderRadius:20, marginBottom:14, boxShadow:'0 2px 14px rgba(0,0,0,0.03)', overflow:'hidden' }}>
              {/* 포스트 헤더 */}
              <div style={{ padding:'14px 16px 0', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:99, background:'linear-gradient(135deg,#6366F1,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{post.avatar}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ fontSize:14, fontWeight:700 }}>{post.user}</span>
                    <span style={{ padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:700, background:tagColors[post.tag]+'18', color:tagColors[post.tag] }}>#{post.tag}</span>
                  </div>
                  <div style={{ fontSize:11, color:'#74777F', marginTop:1 }}>{post.time} · 🧬 {post.gene}</div>
                </div>
                <MoreHorizontal size={18} color="#999" style={{cursor:'pointer'}}/>
              </div>

              {/* 포스트 내용 */}
              <div style={{ padding:'12px 16px' }}>
                <div style={{ fontSize:15, fontWeight:700, color:'#1A1C1C', marginBottom:6 }}>{post.title}</div>
                <p style={{ fontSize:13, color:'#43474E', lineHeight:1.65, margin:0 }}>{post.content}</p>
              </div>

              {/* 포스트 사진 */}
              {post.photo && (
                <div style={{ padding:'0 16px 12px' }}>
                  <img src={post.photo} alt="" style={{ width:'100%', borderRadius:14, maxHeight:280, objectFit:'cover' }} onClick={()=>setShowPhotoModal(post.photo)}/>
                </div>
              )}

              {/* 좋아요/댓글/공유 바 */}
              <div style={{ padding:'8px 16px 10px', borderTop:'1px solid #F5F5F5', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ display:'flex', gap:16 }}>
                  <div onClick={()=>setInstaLikes(prev=>({...prev,[post.id]:!prev[post.id]}))} style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer', color: instaLikes[post.id] ? '#EF4444' : '#74777F', transition:'all 0.2s' }}>
                    <Heart size={20} fill={instaLikes[post.id]?'#EF4444':'none'} />
                    <span style={{ fontSize:13, fontWeight:600 }}>{post.likes + (instaLikes[post.id]?1:0)}</span>
                  </div>
                  <div onClick={()=>setInstaShowComments(instaShowComments===post.id?null:post.id)} style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer', color: instaShowComments===post.id ? '#6366F1' : '#74777F' }}>
                    <MessageCircle size={20}/>
                    <span style={{ fontSize:13, fontWeight:600 }}>{(instaComments[post.id]||[]).length || post.comments}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4, cursor:'pointer', color:'#74777F' }}>
                    <Share2 size={18}/>
                  </div>
                </div>
                <div onClick={()=>setInstaBookmarks(prev=>({...prev,[post.id]:!prev[post.id]}))} style={{ cursor:'pointer', color: instaBookmarks[post.id] ? '#F59E0B' : '#74777F' }}>
                  <Bookmark size={20} fill={instaBookmarks[post.id]?'#F59E0B':'none'}/>
                </div>
              </div>

              {/* 댓글 영역 */}
              {instaShowComments === post.id && (
                <div style={{ padding:'0 16px 14px', background:'#FAFAFA', borderTop:'1px solid #F0F0F0' }}>
                  {(instaComments[post.id]||[]).map((c,ci) => (
                    <div key={ci} style={{ padding:'10px 0', borderBottom: ci < (instaComments[post.id]||[]).length-1 ? '1px solid #F0F0F0' : 'none' }}>
                      <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <span style={{ fontSize:13, fontWeight:700 }}>{c.user}</span>
                        <span style={{ fontSize:11, color:'#999' }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize:13, color:'#43474E', marginTop:4, lineHeight:1.5 }}>{c.text}</div>
                    </div>
                  ))}
                  {/* 댓글 입력 */}
                  <div style={{ display:'flex', gap:8, marginTop:10, alignItems:'center' }}>
                    <div style={{ width:28, height:28, borderRadius:99, background:'#6366F1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'white', flexShrink:0 }}>🧬</div>
                    <input value={instaCommentText} onChange={e=>setInstaCommentText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')addInstaComment(post.id)}} placeholder="댓글 달기..." style={{ flex:1, padding:'8px 12px', borderRadius:99, border:'1px solid #E2E2E2', fontSize:13, outline:'none', background:'white' }}/>
                    <div onClick={()=>addInstaComment(post.id)} style={{ width:32, height:32, borderRadius:99, background:'#1A365D', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                      <Send size={14} color="white"/>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>)}
      </div>

      {/* 광고 배너 */}
      <AdBanner pageKey="diary"/>

      {/* 사진 확대 모달 */}
      {showPhotoModal && (
        <div onClick={() => setShowPhotoModal(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20, cursor:'pointer' }}>
          <img src={showPhotoModal} alt="" style={{ maxWidth:'100%', maxHeight:'80vh', borderRadius:16, boxShadow:'0 10px 40px rgba(0,0,0,0.3)' }}/>
          <div style={{ position:'absolute', top:20, right:20, width:40, height:40, borderRadius:99, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={20} color="white"/>
          </div>
        </div>
      )}
    </div>
  );
}
