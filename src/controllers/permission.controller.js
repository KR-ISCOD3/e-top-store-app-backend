import db from '../config/db.js';

/**
 * ADMIN: Create new permission
 */
export const createPermission = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Permission name is required' });
    }

    await db.query(
      'INSERT INTO permissions (name) VALUES (?)',
      [name]
    );

    res.status(201).json({
      message: 'Permission created successfully',
      permission: name
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Permission already exists' });
    }
    res.status(500).json({ message: err.message });
  }
};

/**
 * ADMIN: Assign permission to role
 */
export const assignPermissionToRole = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    await db.query(
      'INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)',
      [role_id, permission_id]
    );

    res.json({ message: 'Permission assigned to role' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Permission already assigned' });
    }
    res.status(500).json({ message: err.message });
  }
};
