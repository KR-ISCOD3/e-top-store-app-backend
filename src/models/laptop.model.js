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
// READ ONE (with brand_name)
export const getLaptopById = async (id) => {
  const [rows] = await db.execute(
    `
    SELECT 
      l.id,
      l.name,
      l.description,
      l.price,
      l.discount,
      l.thumbnail,
      b.name AS brand_name
    FROM laptops l
    LEFT JOIN brands b ON l.brand_id = b.id
    WHERE l.id = ?
    `,
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


export const getBestSellingLaptops = async (limit = 5) => {
  const [rows] = await db.query(
    `
    SELECT
      l.id,
      l.name,
      l.price,
      l.thumbnail,
      l.brand_id,
      b.name AS brand_name,
      SUM(oi.quantity) AS total_sold
    FROM order_items oi
    JOIN laptops l ON oi.laptop_id = l.id
    JOIN brands b ON l.brand_id = b.id
    GROUP BY l.id, b.name
    ORDER BY total_sold DESC
    LIMIT ?
    `,
    [limit]
  );

  return rows;
};
