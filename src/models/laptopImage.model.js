import db from '../config/db.js';

/**
 * CREATE laptop image
 * image_path → uploaded file
 * image_url  → external URL
 */
export const createLaptopImage = async ({
  laptop_id,
  image_url = null,
  image_path = null,
}) => {
  const sql = `
    INSERT INTO laptop_images (laptop_id, image_url, image_path)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
    laptop_id,
    image_url,
    image_path,
  ]);
  return result;
};

/**
 * GET images by laptop
 */
export const getImagesByLaptopId = async (laptopId) => {
  const [rows] = await db.execute(
    'SELECT * FROM laptop_images WHERE laptop_id = ?',
    [laptopId]
  );
  return rows;
};

/**
 * GET single image
 */
export const getLaptopImageById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM laptop_images WHERE id = ?',
    [id]
  );
  return rows[0];
};

/**
 * UPDATE image
 */
export const updateLaptopImage = async (id, { image_url, image_path }) => {
  const sql = `
    UPDATE laptop_images
    SET image_url = ?, image_path = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(sql, [
    image_url,
    image_path,
    id,
  ]);
  return result;
};

/**
 * DELETE image
 */
export const deleteLaptopImage = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM laptop_images WHERE id = ?',
    [id]
  );
  return result;
};
