import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Puxa a chave do arquivo .env de forma segura
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Configura o modelo com a personalidade da GoTracker
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Você é o Assistente Virtual da GoTracker, de Hortolândia/SP. Seja profissional, tecnológico e use as cores azul e laranja em suas sugestões. Se a dúvida for complexa, direcione para o WhatsApp." 
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Erro na API Chat:", error);
    return NextResponse.json({ text: "Ops, tive um problema técnico. Tente novamente." }, { status: 500 });
  }
}