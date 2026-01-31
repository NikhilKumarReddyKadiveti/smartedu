
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  // Module 1: Analyze performance data
  async analyzeTopicWeakness(performanceData: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following student performance data and provide a detailed breakdown of topic-level weaknesses. JSON data: ${performanceData}`,
      config: {
        systemInstruction: "You are an educational data analyst. Identify specific topics needing focus.",
        responseMimeType: "application/json",
      }
    });
    return response.text;
  },

  // Module 2: Smart Campus Navigation (Fuzzy Search & Directions)
  async getDirections(query: string, currentLocation: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Current Location: ${currentLocation}. Goal: ${query}. 
      The campus has: Block A (Classrooms 101-205, Library), Block B (Labs 1-5, Computer Center), Cafeteria (near Gate), Hostels (North end).
      Provide step-by-step directions. If the goal name is slightly misspelled, correct it.`,
      config: {
        systemInstruction: "You are a helpful campus navigation guide. Provide clear, concise directions.",
      }
    });
    return response.text;
  },

  // Module 3: Adaptive Learning - Photo Answer Evaluation
  async evaluateHandwrittenAnswer(base64Image: string, expectedAnswer: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: `Evaluate this handwritten answer for the question: "${expectedAnswer}". Check for logic, steps, and final result. Point out specific mistakes.` }
        ]
      },
      config: {
        systemInstruction: "You are an expert tutor. Provide constructive feedback on handwritten work.",
      }
    });
    return response.text;
  },

  // Module 3: Generate Hints
  async getHint(question: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a helpful hint for the following question without giving away the answer: "${question}"`,
    });
    return response.text;
  }
};
