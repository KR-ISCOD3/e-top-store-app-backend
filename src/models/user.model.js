import pool from '../config/db.js';

/**
 * Find user by email (LOGIN)
 * Includes role + permissions
 */
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.password,
      r.name AS role,
      GROUP_CONCAT(p.name) AS permissions
    FROM users u
    JOIN roles r ON r.id = u.role_id
    LEFT JOIN role_permissions rp ON rp.role_id = r.id
    LEFT JOIN permissions p ON p.id = rp.permission_id
    WHERE u.email = ?
    GROUP BY u.id
    LIMIT 1
    `,
    [email]
  );

  if (!rows[0]) return null;

  return {
    ...rows[0],
    permissions: rows[0].permissions
      ? rows[0].permissions.split(',')
      : []
  };
};

/**
 * Create user (REGISTER)
 * role_id required
 */
export const createUser = async ({ name, email, password, role_id }) => {
  const [result] = await pool.query(
    `
    INSERT INTO users (name, email, password, role_id)
    VALUES (?, ?, ?, ?)
    `,
    [name, email, password, role_id]
  );

  return result.insertId;
};
