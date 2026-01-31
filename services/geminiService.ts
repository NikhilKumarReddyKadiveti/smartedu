
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

/**
 * Fetches a smart educational tip or motivational quote using Gemini.
 */
export async function getSmartEduTip(): Promise<string> {
  if (!API_KEY) return "Learning is a journey, not a destination.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a single, short, profound educational tip or motivational quote for a student login screen. Max 15 words. No hashtags. No emojis.",
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 50,
      }
    });

    return response.text?.trim() || "Unlock your potential through consistent daily learning.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Intelligence is the ability to adapt to change.";
  }
}
