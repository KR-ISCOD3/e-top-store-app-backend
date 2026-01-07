import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import brandRoutes from './routes/brand.routes.js';
import laptopRoutes from './routes/laptop.routes.js';
import paymentRoute from "./routes/payment.route.js";
import mockPaymentRoute from "./routes/mockPayment.route.js";

const app = express();

app.use(express.json());
app.use(cors());

// ✅ serves src/public/pay.html
app.use(express.static("src/public"));

app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/laptops', laptopRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/payment", mockPaymentRoute);

app.get('/', (req, res) => {
  res.json({ message: 'E-Top Store Backend API Running 🚀' });
});

export default app;
