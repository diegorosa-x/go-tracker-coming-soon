import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (userMessage: string) => {
  try {
    // 1. Inicializa o SDK passando apenas a string da chave (sem objeto {})
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
    );

    // 2. Obtém o modelo específico
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Use a versão estável mais recente
      systemInstruction: `Você é o Assistente Virtual da GoTracker, uma empresa premium de rastreamento veicular localizada em Hortolândia/SP. 
      Seu objetivo é ser útil, profissional e tecnológico. 
      
      Pontos chave sobre a GoTracker:
      1. Localização: Hortolândia, SP.
      2. Serviços: Rastreamento em tempo real, bloqueio remoto via app, assistência 24h, cercas virtuais, histórico de rotas.
      3. Cores: Azul Marinho Escuro e Laranja.
      4. O site oficial está em construção, mas os clientes podem acessar o sistema pelo botão "Área do Cliente".
      
      Mantenha as respostas curtas (máximo 3 frases) e sempre ofereça para falar com um consultor humano se a dúvida for muito complexa. Use um tom entusiasmado e confiável.`,
    });

    // 3. Gera o conteúdo
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    return text || "Pode repetir? Não entendi bem.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tive um pequeno problema técnico. Posso ajudar com mais alguma coisa ou prefere falar com um consultor no WhatsApp?";
  }
};
