import express from 'express';
import { login, loginRBAC, register, registerRBAC } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);


// keep for future
router.post('/login-rbac', loginRBAC);
router.post('/register-rbac', registerRBAC);

export default router;
