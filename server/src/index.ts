import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabaseAdmin } from "./config/supabase.js";
import bookingsRoutes from "./modules/bookings/bookings.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Taawa backend is running" });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Taawa API is healthy" });
});

app.get("/api/test-supabase", async (_req, res) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    return res.status(500).json({
      message: "Supabase connection failed",
      error: error.message,
    });
  }

  return res.json({
    message: "Supabase connected successfully",
    usersCount: data.users.length,
  });
});

app.use("/api/bookings", bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});