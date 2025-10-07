
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 Chat with AI (text-based)
export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are a health assistant. 
        Answer ONLY health-related questions (fitness, nutrition, medicine, mental health, lifestyle). 
        If the user asks anything unrelated, reply: 
        "I'm designed to answer health-related queries only."

        User's Question: ${message}
    `;

        const result = await model.generateContent(prompt);
        res.json({ reply: result.response.text() });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Something went wrong with the AI service" });
    }
};




