import db from '../config/db.js';

export async function createOrder(data) {
  const {
    user_id,
    phone,
    address,
    note,
    subtotal,
    shipping,
    total,
    payment_method
  } = data;

  const [result] = await db.query(
    `
    INSERT INTO orders
    (user_id, phone, address, note, subtotal, shipping, total, payment_method, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    [
      user_id,
      phone,
      address,
      note,
      subtotal,
      shipping,
      total,
      payment_method
    ]
  );

  return result.insertId;
}
