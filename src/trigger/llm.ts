import { task } from "@trigger.dev/sdk/v3";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runLlmTask = task({
  id: "run-llm",
  maxDuration: 300,
  run: async (payload: { systemPrompt?: string, userMessage?: string, images?: string[], model?: string }) => {
    const { systemPrompt, userMessage, images = [], model = 'gemini-2.5-flash' } = payload;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('Missing Gemini API Key.');

    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ 
      model: model,
      systemInstruction: systemPrompt || 'You are a helpful assistant.'
    });

    const parts: any[] = [{ text: userMessage || 'Hello' }];

    if (images.length > 0) {
      const imagePromises = images.map(async (url: string) => {
        try {
          const imageResp = await fetch(url);
          const arrayBuffer = await imageResp.arrayBuffer();
          const base64Data = Buffer.from(arrayBuffer).toString('base64');
          const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';
          
          return {
            inlineData: {
              data: base64Data,
              mimeType
            }
          };
        } catch (e) {
          console.error("Failed to fetch image from URL:", url, e);
          return null;
        }
      });
      
      const resolvedImages = await Promise.all(imagePromises);
      parts.push(...resolvedImages.filter(img => img !== null));
    }

    const result = await genModel.generateContent(parts);
    return { text: result.response.text() };
  }
});
