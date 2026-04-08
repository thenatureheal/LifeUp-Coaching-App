import React, { useState, useRef, useEffect } from 'react';
import { X, Send, BrainCircuit } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

const PRESET_RESPONSES = {
  '오늘 뭐 하면 좋을까요?': '윤서의 논리력 강점을 살려서, 오늘은 블록 코딩 활동을 추천해요! 🧩\n\n스크래치 주니어로 "고양이가 집까지 가는 길" 미션을 만들어보세요. 순차적 사고력 훈련에 최고예요.\n\n✅ 추천 시간: 오후 4~5시 (집중력 피크 시간대)',
  '식단 추천해주세요': '윤서의 유전자형에 맞춘 오늘의 식단이에요! 🍎\n\n🌅 아침: 블루베리 요거트 + 호두 (DHA 보충)\n🌞 점심: 연어 김밥 + 미역국 (오메가3 + 철분)\n🌙 저녁: 닭가슴살 볶음밥 + 시금치 (단백질 + 엽산)\n\n💊 취침 전: 유산균 1포 꼭 챙겨주세요!',
  '학습 스타일이 궁금해요': '윤서는 **원리탐구형** 학습자예요! 📚\n\n🧠 특징:\n• 규칙과 패턴을 먼저 이해하려 함\n• "왜?"라는 질문이 많은 건 강점의 신호!\n• 통글자 암기보다 원리 설명이 효과적\n\n💡 팁: "이건 이래서 이렇게 되는 거야"라고 원리를 먼저 설명해주세요.',
  '대화법 코칭해주세요': '오늘의 대화법 코칭이에요! 💬\n\n❌ Before: "왜 자꾸 그래! 하지 마!"\n✅ After: "윤서가 그렇게 한 이유가 있을 것 같아. 말해줄래?"\n\n🎯 포인트: 논리력이 강한 아이는 자기 행동에 이유가 있어요. 이유를 물어보면 자기 표현력도 함께 발달합니다!',
  '주말 활동 추천': '이번 주말 추천 활동이에요! 🌈\n\n🏗️ 토요일 오전: 레고 테크닉 조립 (공간지각력 ↑)\n🌳 토요일 오후: 근처 과학관 방문 (호기심 자극)\n📖 일요일 오전: "왜 그럴까?" 시리즈 함께 읽기\n🎨 일요일 오후: 자유 그리기 + 이야기 만들기\n\n💡 핵심: 놀이 속에 학습이 자연스럽게!',
};

const QUICK_CHIPS = [
  '오늘 뭐 하면 좋을까요?',
  '식단 추천해주세요',
  '학습 스타일이 궁금해요',
  '대화법 코칭해주세요',
  '주말 활동 추천',
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'system', text: '안녕하세요! 🧬 LifeUp AI 코치예요.\n윤서 맞춤 코칭이 궁금하시면 아래 질문을 눌러보세요!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    // 사용자 메시지 추가
    const newMessages = [...messages, { type: 'user', text: msg }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // 프리셋 응답 확인
    if (PRESET_RESPONSES[msg]) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'bot', text: PRESET_RESPONSES[msg] }]);
      }, 1000);
      return;
    }

    // Gemini 실시간 API 호출
    const response = await sendMessageToGemini(newMessages, msg);
    setIsTyping(false);
    setMessages(prev => [...prev, { type: 'bot', text: response }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(true)}
        aria-label="AI 코치 열기"
        id="chatbot-fab"
      >
        <BrainCircuit size={26} />
      </button>
    );
  }

  return (
    <>
      <div className="chatbot-overlay" onClick={() => setIsOpen(false)} />
      <div className="chatbot-panel">
        <div className="chatbot-header">
          <div className="chatbot-header-avatar">
            <BrainCircuit size={22} />
          </div>
          <div className="chatbot-header-info">
            <h4>LifeUp AI 코치</h4>
            <span>🟢 윤서 맞춤 코칭 중</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              marginLeft: 'auto',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
            }}
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.type}`}>
              {msg.text.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < msg.text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-chips">
          {QUICK_CHIPS.map((chip, i) => (
            <button
              key={i}
              className="chat-chip"
              onClick={() => handleSend(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="chatbot-input-area">
          <input
            className="chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="궁금한 점을 물어보세요..."
            id="chatbot-input"
          />
          <button
            className="chatbot-send"
            onClick={() => handleSend()}
            aria-label="전송"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
