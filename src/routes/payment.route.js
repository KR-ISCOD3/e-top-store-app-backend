import express from "express";
import { createAbaPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/aba/create", createAbaPayment);

export default router;
