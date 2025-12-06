import { GoogleGenAI } from "@google/genai";
import { Tool } from '../types';

let client: GoogleGenAI | null = null;
let customApiKey: string = '';
let currentModel: string = 'gemini-2.5-flash';

// Initialize or update the client
const getClient = () => {
  const keyToUse = customApiKey || process.env.API_KEY || '';
  
  // Always create a new client if the key might have changed, 
  // or simple singleton logic if we assume synchronous updates.
  // For safety with dynamic keys, we'll instantiate if key changes or client is null.
  if (!client) {
     client = new GoogleGenAI({ apiKey: keyToUse });
  }
  return client;
};

// Update configuration dynamically
export const configureGenAI = (apiKey: string, model: string) => {
  customApiKey = apiKey;
  currentModel = model;
  // Reset client to force recreation with new key on next call
  client = null;
};

// Validate the API connection
export const validateApiConnection = async (apiKey: string, model: string): Promise<boolean> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Lightweight check: Generate a single token response or similar
    const response = await ai.models.generateContent({
      model: model,
      contents: 'Test connection',
      config: {
        maxOutputTokens: 1
      }
    });
    return !!response.text;
  } catch (error) {
    console.error("API Validation Failed:", error);
    return false;
  }
};

export const getToolRecommendations = async (
  query: string, 
  availableTools: Tool[]
): Promise<string> => {
  const ai = getClient();
  
  // Create a simplified list of tools for context to save tokens and focus the model
  const toolsContext = availableTools.map(t => 
    `- ${t.name} (Category: ${t.category}, Pricing: ${t.pricing}): ${t.description}`
  ).join('\n');

  const systemInstruction = `
    You are an expert AI software consultant for a directory website called "AI-Bot Directory".
    Your goal is to help users find the best AI tools for their needs based on the following list of available tools.
    
    Here is the list of tools in our directory:
    ${toolsContext}

    Instructions:
    1. If the user asks for a recommendation, prioritize tools from the list above.
    2. If the user's request cannot be met by the tools in the list, use your general knowledge to recommend other popular tools, but mention they might not be in the directory.
    3. Keep responses concise, friendly, and helpful.
    4. Format key tool names in bold (e.g., **Tool Name**).
    5. If the query is unrelated to AI tools, politely steer the conversation back to AI tools.
  `;

  try {
    const response = await ai.models.generateContent({
      model: currentModel,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a recommendation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系统提示：API 连接失败或额度已用尽，请在顶部控制台检查您的 API Key 设置。";
  }
};