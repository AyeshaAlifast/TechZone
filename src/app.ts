import express from "express";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import passwordRoutes from "./routes/passwordRoutes";

dotenv.config();
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 }
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = (req.session as any).userId || null;
  res.locals.role = (req.session as any).role || null;
  next();
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/password", passwordRoutes);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => res.render("about"));

app.get("/contact", (req, res) => res.render("contact"));

app.post("/contact", (req, res) => {
  req.flash("success", "Message sent! We'll get back to you soon.");
  res.redirect("/contact");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;