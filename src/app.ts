import express from "express";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
connectDB();

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Flash messages
app.use(flash());

// Global flash variables for views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("TechZone server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;