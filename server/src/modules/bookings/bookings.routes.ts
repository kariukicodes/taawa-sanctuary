import { Router } from "express";
import {
  getBookings,
  createBooking,
  updateBookingStatus,
} from "./bookings.controller.js";

const router = Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.patch("/:id/status", updateBookingStatus);

export default router;