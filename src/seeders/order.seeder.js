import db from '../config/db.js';

export default async function orderSeeder() {
  console.log('🧾 Seeding orders for user_id = 4 ...');

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    const userId = 4;
    const shipping = 10;

    // get some laptops
    const [laptops] = await conn.query(
      'SELECT id, price FROM laptops LIMIT 5'
    );

    if (laptops.length === 0) {
      throw new Error('No laptops found');
    }

    // create 5 orders
    for (let i = 0; i < 5; i++) {
      let subtotal = 0;

      // pick 2 laptops per order
      const items = [
        { ...laptops[i % laptops.length], qty: 1 },
        { ...laptops[(i + 1) % laptops.length], qty: 1 }
      ];

      items.forEach(it => {
        subtotal += it.price * it.qty;
      });

      const total = subtotal + shipping;

      const [orderResult] = await conn.query(
        `
        INSERT INTO orders (user_id, subtotal, shipping, total, status)
        VALUES (?, ?, ?, ?, 'pending')
        `,
        [userId, subtotal, shipping, total]
      );

      const orderId = orderResult.insertId;

      for (const it of items) {
        await conn.query(
          `
          INSERT INTO order_items (order_id, laptop_id, price, quantity)
          VALUES (?, ?, ?, ?)
          `,
          [orderId, it.id, it.price, it.qty]
        );
      }
    }

    await conn.commit();
    console.log('✅ Orders seeded successfully');
  } catch (err) {
    await conn.rollback();
    console.error('❌ Order seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
