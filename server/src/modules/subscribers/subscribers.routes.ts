import { Router } from "express";
import {
  getSubscribers,
  createSubscriber,
} from "./subscribers.controller.js";

const router = Router();

router.get("/", getSubscribers);
router.post("/", createSubscriber);

export default router;