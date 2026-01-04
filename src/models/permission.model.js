import db from '../config/db.js';

/**
 * Create new permission
 */
export const createPermission = async (name) => {
  const [result] = await db.query(
    'INSERT INTO permissions (name) VALUES (?)',
    [name]
  );
  return result.insertId;
};

/**
 * Assign permission to role
 */
export const assignPermissionToRole = async (roleId, permissionId) => {
  await db.query(
    'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
    [roleId, permissionId]
  );
};

/**
 * Remove permission from role
 */
export const removePermissionFromRole = async (roleId, permissionId) => {
  await db.query(
    'DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?',
    [roleId, permissionId]
  );
};

/**
 * Get all permissions
 */
export const getAllPermissions = async () => {
  const [rows] = await db.query(
    'SELECT id, name FROM permissions ORDER BY name'
  );
  return rows;
};

/**
 * Get permissions by role
 */
export const getPermissionsByRole = async (roleId) => {
  const [rows] = await db.query(`
    SELECT p.id, p.name
    FROM role_permissions rp
    JOIN permissions p ON p.id = rp.permission_id
    WHERE rp.role_id = ?
  `, [roleId]);

  return rows;
};
