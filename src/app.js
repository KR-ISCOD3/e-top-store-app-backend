import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import brandRoutes from './routes/brand.routes.js';
import laptopRoutes from './routes/laptop.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/laptops', laptopRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'E-Top Store Backend API Running 🚀' });
});

export default app;
