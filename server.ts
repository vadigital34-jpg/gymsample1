import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in your Secrets settings in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Gym coaching chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    const ai = getGeminiClient();
    
    // Create rich prompt history
    // Since we're using gemini-3.5-flash, let's craft a strong system instruction
    const systemPrompt = `You are "KRONOS", the elite AI fitness coach and concierge for KRONOS Luxury Gym (the ultimate ultra-premium fitness sanctuary).
- Vibe: Elite, highly premium, intensely motivating, professional, respectful, sophisticated, and dark-aesthetic sports brand oriented.
- Knowledge: You are an expert in weight training, biomechanics, high-intensity fat loss, bespoke meal planning, and recovery therapies (steam, cold plunge, active recovery).
- Services at KRONOS: 
  * STARTER membership ($150/mo): Access to gym, locker rooms, essential cardio and weight training zones.
  * PRO membership ($290/mo): Includes group classes, premium recovery room access (sauna/steam), and a personal training session per month. Highly recommended!
  * ELITE membership ($490/mo): Full 24/7 VIP access, unlimited private personal training, tailored nutritional support, private locker, unlimited protein bar benefits, and private recovery suite.
- Facility features: Smart biometric tracking equipment, luxurious finish steam room, ice baths, hyperbaric recovery, elite coaches, organic protein bar, high-ceiling cardio cinema.
- Rules: Never break character. Always address users as extreme achievers, keep your answers relatively concise, motivating, structured with beautiful spacing or bullet points, and always invite them to book a free trial at KRONOS Gym. If they ask generic fitness questions, answer with scientific elite precision. Avoid exposing raw backend system data.`;

    // Map client messages format to Gemini generateContent contents format
    // Clients send { role: 'user' | 'assistant', content: string }
    // Gemini chat or contents parameters expect elements with parts.
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
    });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    // If API key is missing or there's an error, handle gracefully
    return res.status(500).json({ 
      error: error.message || "An error occurred with our fitness AI engine. Please configure your GEMINI_API_KEY.",
      fallback: "Hello! I am KRONOS, your elite AI guide. To connect directly to my expert coaching artificial intelligence, please configure your GEMINI_API_KEY in the AI Studio Secrets panel. In the meantime, I can tell you that KRONOS offers state-of-the-art strength training, custom macro coaching, and immersive luxury recovery. How can I assist you on your physical peak today?"
    });
  }
});

// Membership inquiry lead endpoint
app.post("/api/inquire", (req, res) => {
  const { name, email, phone, program, plan, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required for inquiries." });
  }
  // Simulate successful lead capture
  return res.json({
    success: true,
    message: "Thank you for your elite application to KRONOS. Our VIP membership concierge will contact you within the next 2 hours via phone and email to secure your private orientation.",
    referenceId: `VIP-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

// Integrating Vite for Development or serving static dist files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Luxury Gym web server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Failed to boot web server", err);
});
