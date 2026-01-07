import db from '../config/db.js';

export async function createOrder(userId, items, shipping = 10) {
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    let subtotal = 0;
    items.forEach(i => subtotal += i.price * i.quantity);
    const total = subtotal + shipping;

    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, subtotal, shipping, total)
       VALUES (?, ?, ?, ?)`,
      [userId, subtotal, shipping, total]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, laptop_id, price, quantity)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.laptop_id, item.price, item.quantity]
      );
    }

    await conn.commit();
    return orderId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function getOrdersByUser(userId) {
  const [orders] = await db.query(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  return orders;
}
