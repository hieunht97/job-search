import express, { Application, Request, Response } from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
// import morgan from "morgan";
import dotenv from "dotenv";
// import fileUpload from "express-fileupload";
import connectDB from "./config/connectDB";
import User from "./routes/userRoutes";
import Auth from "./routes/userAuth";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// app.use(morgan(":method :url :status :response-time ms"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Allow cookies
  })
);

// Routes
app.use("/user", User);
app.use("/auth", Auth);

// Base Route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

// Handle invalid URLs
app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1);
  }
};

startServer();
