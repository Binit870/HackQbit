import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
dotenv.config();
connectDB();

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ JSON parser
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/ai", aiRoutes);


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
