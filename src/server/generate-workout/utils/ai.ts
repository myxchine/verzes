import "server-only";

import { generatePrompt } from "./generatePrompt";
import { generationConfig } from "./generationConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

interface AiRes {
  name: string;
  description: string;
  focusAreas: string[];
}

export async function generateUserPreferences(
  userQuery: string
): Promise<AiRes> {
  const prompt = generatePrompt(userQuery);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const res = await chatSession.sendMessage(prompt);

  if (
    res.response.candidates === undefined ||
    res.response.candidates.length === 0 ||
    res.response.candidates[0].content.parts[0].text === undefined
  ) {
    throw new Error("No workout routine generated");
  }

  return JSON.parse(res.response.candidates[0].content.parts[0].text);
}
