// app/api/chat/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs"; // garante Node runtime (não Edge)

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM = `
Você é o assistente virtual EXCLUSIVO da GoTracker.

IMPORTANTE:
- Você só pode responder perguntas relacionadas à GoTracker e rastreamento veicular.
- Se a pergunta NÃO for sobre rastreamento, veículos, segurança automotiva ou serviços da empresa, NÃO responda o assunto.
- Em vez disso, diga educadamente que você é especializado apenas em rastreamento veicular e ofereça falar com um consultor no WhatsApp.

Sobre a empresa:
- Localização: Hortolândia/SP
- Serviços: rastreamento em tempo real, bloqueio remoto via app, assistência 24h, cercas virtuais, histórico de rotas
- Empresa premium
- Site em construção (Área do Cliente disponível)

Respostas:
- Máximo 3 frases
- Profissional, objetivo, tecnológico
`.trim();

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensagem inválida." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // rápido e barato; pode trocar
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 250,
    });

    const text = completion.choices?.[0]?.message?.content?.trim() ?? "Pode repetir?";
    return NextResponse.json({ text });
  } catch (err) {
    console.error("Groq API error:", err);
    return NextResponse.json(
      { text: "Tive um pequeno problema técnico. Quer falar com um consultor no WhatsApp?" },
      { status: 500 }
    );
  }
}
