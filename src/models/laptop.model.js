import db from '../config/db.js';

// CREATE
export const createLaptop = async (data) => {
  const sql = `
    INSERT INTO laptops
    (user_id, brand_id, name, price, discount, stock, cpu, ram, storage, thumbnail, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
    data.user_id,
    data.brand_id,
    data.name,
    data.price,
    data.discount || 0,
    data.stock,
    data.cpu,
    data.ram,
    data.storage,
    data.thumbnail,
    data.description,
    data.status || 1,
  ]);
  return result;
};

// READ ALL
export const getAllLaptops = async () => {
  const [rows] = await db.execute(`
    SELECT l.*, b.name AS brand_name
    FROM laptops l
    JOIN brands b ON l.brand_id = b.id
    ORDER BY l.id DESC
  `);
  return rows;
};

// READ ONE
export const getLaptopById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM laptops WHERE id = ?',
    [id]
  );
  return rows[0];
};

// UPDATE
export const updateLaptop = async (id, data) => {
  const sql = `
    UPDATE laptops SET
      brand_id = ?,
      name = ?,
      price = ?,
      discount = ?,
      stock = ?,
      cpu = ?,
      ram = ?,
      storage = ?,
      thumbnail = ?,
      description = ?,
      status = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(sql, [
    data.brand_id,
    data.name,
    data.price,
    data.discount,
    data.stock,
    data.cpu,
    data.ram,
    data.storage,
    data.thumbnail,
    data.description,
    data.status,
    id,
  ]);
  return result;
};

// DELETE
export const deleteLaptop = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM laptops WHERE id = ?',
    [id]
  );
  return result;
};
