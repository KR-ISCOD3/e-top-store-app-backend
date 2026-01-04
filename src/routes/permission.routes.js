import express from 'express';
import {
  createPermission,
  assignPermissionToRole,
  removePermissionFromRole,
  getAllPermissions,
  getPermissionsByRole
} from '../controllers/permission.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { hasPermission } from '../middlewares/permission.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, hasPermission('manage_users'), getAllPermissions);
router.post('/', authMiddleware, hasPermission('manage_users'), createPermission);
router.post('/assign', authMiddleware, hasPermission('manage_users'), assignPermissionToRole);
router.delete('/remove', authMiddleware, hasPermission('manage_users'), removePermissionFromRole);
router.get('/role/:roleId', authMiddleware, hasPermission('manage_users'), getPermissionsByRole);

export default router;
