<<<<<<< HEAD
import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
import SymptomHistory from "../models/Symptom.js"; // Assuming a Mongoose model
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 Symptom Checker with Gemini
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;
    // In a real app, you would get the user ID from the session or token
=======
import OpenAI from "openai";
import dotenv from "dotenv";
import SymptomHistory from "../models/Symptom.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📌 Symptom Checker with OpenAI
export const checkSymptoms = async (req, res) => {
  try {
    const { symptoms, age, gender } = req.body;
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
    const userId = req.user.id;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: "Please provide symptoms" });
    }

<<<<<<< HEAD
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a medical assistant AI.
      The user is a ${age}-year-old ${gender}. They have the following symptoms: ${symptoms.join(",")}.
      Based on this, provide a list of the top 4 most likely health conditions.
      For each condition, include:
      - A brief name.
      - A simple, one-sentence description.
      - An urgency level: "Non-Urgent," "Urgent Care," or "Emergency."
      - If non-urgent share some common treatments or medicine
      - A call to action (CTA) in the form of simple, actionable advice.

      Format the response as a single JSON object with a key "conditions" that contains an array of these objects.
      Example JSON response:
      {
          "conditions": [
              {
                  "name": "Common Cold",
                  "description": "A viral infection of the nose and throat, causing sneezing and a stuffy nose.",
                  "urgency_level": "Non-Urgent",
                  "treatments": "Over-the-counter cold remedies, rest, and hydration.",
                  "medicine" : "Paracetamol or ibuprofen for fever and aches.",
                  "cta": "Rest and drink plenty of fluids. Symptoms usually resolve within a week."
              }
          ]
      }
    `;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();

    // ✅ NEW AND IMPROVED FIX: Extract the JSON string from the response
    const jsonStartIndex = textResponse.indexOf('{');
    const jsonEndIndex = textResponse.lastIndexOf('}');

    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
      const jsonString = textResponse.substring(jsonStartIndex, jsonEndIndex + 1);
      const parsedData = JSON.parse(jsonString);

      // 💡 NEW LOGIC: Save the successful response to the database
      const newHistoryEntry = new SymptomHistory({
        user: userId, // Associate with a user
        symptoms,
        age,
        gender,
        results: parsedData.conditions,
      });
      await newHistoryEntry.save();

      return res.json(parsedData);
    } else {
      return res.status(200).json({
        error: "AI did not return a valid JSON object. Please try again.",
        rawResponse: textResponse
      });
    }

  } catch (error) {
    console.error("Error checking symptoms:", error);
    if (error instanceof SyntaxError) {
      return res.status(200).json({
        error: "AI response was not in the expected format. Please try again.",
        rawResponse: error.message
      });
    }
    res.status(500).json({ error: "Failed to check symptoms due to a server error." });
  }
};

// 📌 NEW: Get Symptom History
// 📌 Get Symptom History
export const getSymptomHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        // ✅ Add .lean() to the query
        const history = await SymptomHistory.find({ user: userId }).sort({ createdAt: -1 }).lean();
        res.json({ history });
    } catch (error) {
        console.error("Error fetching symptom history:", error);
        res.status(500).json({ error: "Failed to fetch history." });
    }
};

export const deleteSymptomHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SymptomHistory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "History entry not found" });
    }

    return res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting history:", error);
    return res.status(500).json({ message: "Server error while deleting history" });
  }
};
=======
    const messages = [
      {
        role: "system",
        content: `
          You are a medical assistant.
          The user is a ${age}-year-old ${gender}.
          Provide only JSON.
          Output format:
          {
            "conditions": [
              {
                "name": "",
                "description": "",
                "urgency_level": "",
                "treatments": "",
                "medicine": "",
                "cta": ""
              }
            ]
          }
        `
      },
      {
        role: "user",
        content: `The patient has these symptoms: ${symptoms.join(", ")}. Suggest possible conditions.`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
    });

    const textResponse = completion.choices[0].message.content.trim();

    const jsonStart = textResponse.indexOf("{");
    const jsonEnd = textResponse.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      return res.status(200).json({ error: "Invalid AI response", rawResponse: textResponse });
    }

    const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);
    const parsedData = JSON.parse(jsonString);

    const newHistory = new SymptomHistory({
      user: userId,
      symptoms,
      age,
      gender,
      results: parsedData.conditions,
    });
    await newHistory.save();

    res.json(parsedData);
  } catch (error) {
    console.error("Error checking symptoms:", error);
    if (error instanceof SyntaxError) {
      return res.status(200).json({ error: "AI response parsing failed", rawResponse: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// 📌 Get Symptom History
export const getSymptomHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await SymptomHistory.find({ user: userId }).sort({ createdAt: -1 }).lean();
    res.json({ history });
  } catch (error) {
    console.error("Error fetching symptom history:", error);
    res.status(500).json({ error: "Failed to fetch history." });
  }
};

// 📌 Delete Symptom History
export const deleteSymptomHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SymptomHistory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "History entry not found" });
    res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting history:", error);
    res.status(500).json({ message: "Server error while deleting history" });
  }
};
>>>>>>> 4d6ccd90ac25559867e067811e21a2a4e385bac6
