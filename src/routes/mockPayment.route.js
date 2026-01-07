import express from "express";
import {
  createMockPayment,
  confirmMockPayment,
  getMockStatus
} from "../controllers/mockPayment.controller.js";

const router = express.Router();

// MOCK payment routes
router.post("/mock/create", createMockPayment);
router.post("/mock/confirm", confirmMockPayment);
router.get("/mock/status/:tran_id", getMockStatus);

export default router;
