import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findUserByEmail,
  findUserByEmailRBAC,
  createUser,
  createUserRBAC
} from '../models/user.model.js';

/* =========================
   OLD LOGIN (RBAC – KEEP)
   ========================= */
export const loginRBAC = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmailRBAC(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        permissions: user.permissions
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   NEW LOGIN (NO ROLE TABLE)
   ========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('LOGIN ERROR 👉', err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
};

/* =========================
   OLD REGISTER (RBAC – KEEP)
   ========================= */
export const registerRBAC = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUserRBAC({
      name,
      email,
      password: hashedPassword,
      role_id
    });

    res.status(201).json({ id: userId });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* =========================
   NEW REGISTER (SIMPLE)
   ========================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({
      name,
      email,
      password: hashedPassword,
      role: 'customer'
    });

    const token = jwt.sign(
      {
        id: userId,
        role: 'customer'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      token,
      user: { id: userId, name, email, role: 'customer' }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
