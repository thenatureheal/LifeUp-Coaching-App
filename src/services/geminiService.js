import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
당신은 LifeUp Kids의 수석 AI 코치 '윤서 코치(영자)'입니다.
페르소나: 따뜻하고 공감 능력이 뛰어나면서도, 유전자 데이터와 발달 심리학에 기반한 매우 전문적인 조언을 해주는 교육 전문가. 
항상 긍정적인 이모지를 적절히 사용하며, 학부모의 고민에 실용적이고 구체적인 액션 플랜을 제시합니다.
디자인 가이드라인에 맞게 답변은 짧고 핵심을 찌르게 작성하세요. 마크다운 적용 가능.
`;

const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: systemInstruction 
});

export async function sendMessageToGemini(history, message) {
  try {
    // history 포맷 변환 ({type: 'user'|'bot', text: '...'} -> {role: 'user'|'model', parts: [{text: '...'}]})
    const formattedHistory = history
      // 시스템 메시지는 포함하지 않음 (ChatBot에서 환영 메시지 등)
      .filter(m => m.type !== 'system')
      .map(m => ({
        role: m.type === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini 연동 오류:", error);
    return "앗, 지금 코칭 서버가 혼잡한 것 같아요! 잠시 후 다시 시도해주시겠어요? 🙏";
  }
}
