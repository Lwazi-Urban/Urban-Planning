
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPlanningAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are a professional Town Planning Consultant for 'NeXT Plan'. Provide concise, authoritative advice on town planning relaxations, special consents, and site development based on South African municipal standards. Use bullet points and clear headings.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my planning database right now. Please try again or book a manual consultation.";
  }
};

export const analyzeDocument = async (fileContent: string, userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `DOCUMENT CONTEXT: ${fileContent}\n\nUSER QUESTION/BREAKDOWN REQUEST: ${userQuery}`,
      config: {
        systemInstruction: `You are the NeXT Plan 'Deep AI Analyst'. 
        The user has provided a municipal scheme or planning document. 
        Your goal is to provide a comprehensive breakdown based on their query:
        1. Identify and explain the exact regulations found that relate to the request.
        2. Specifically call out interactions (e.g., how a building line regulation interacts with environmental setbacks).
        3. Point out specific sections or clauses the user should be aware of.
        4. Maintain a friendly, highly informative tone.
        Do NOT include a separate "Recommended Action" section unless specifically asked for. Focus on technical breakdown and clarity.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Deep Analysis Error:", error);
    return "Analysis failed. Please check your document format or try again.";
  }
};
