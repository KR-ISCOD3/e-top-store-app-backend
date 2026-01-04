import pool from '../config/db.js';

export const getAllBrands = async () => {
  const [rows] = await pool.query('SELECT * FROM brands ORDER BY id DESC');
  return rows;
};

export const getBrandById = async (id) => {
  const [[row]] = await pool.query('SELECT * FROM brands WHERE id = ?', [id]);
  return row;
};

export const createBrand = async ({ name, logo }) => {
  const [result] = await pool.query(
    'INSERT INTO brands (name, logo) VALUES (?, ?)',
    [name, logo]
  );
  return result.insertId;
};

export const updateBrand = async (id, { name, logo }) => {
  await pool.query(
    'UPDATE brands SET name = ?, logo = ? WHERE id = ?',
    [name, logo, id]
  );
};

export const deleteBrand = async (id) => {
  await pool.query('DELETE FROM brands WHERE id = ?', [id]);
};

