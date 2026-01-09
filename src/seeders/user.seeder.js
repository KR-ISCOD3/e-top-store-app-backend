import bcrypt from 'bcrypt';
import db from '../config/db.js';

export default async function userSeeder() {
  console.log('👤 Seeding users (7 users)...');

  const users = [
    { name: 'Admin User', email: 'admin@etopstore.com', phone: '012000001', password: '123456', role: 'admin' },
    { name: 'Seller User', email: 'seller@etopstore.com', phone: '012000002', password: '123456', role: 'seller' },
    { name: 'Sok Pisey', email: 'sok.pisey@etopstore.com', phone: '012000003', password: '123456', role: 'customer' },
    { name: 'Ta Sok', email: 'ta.sok@etopstore.com', phone: '012000004', password: '123456', role: 'customer' },
    { name: 'Ta Hour', email: 'ta.hour@etopstore.com', phone: '012000005', password: '123456', role: 'customer' },
    { name: 'Ta Heng', email: 'ta.heng@etopstore.com', phone: '012000006', password: '123456', role: 'customer' },
    { name: 'Ta Rong', email: 'ta.rong@etopstore.com', phone: '012000007', password: '123456', role: 'customer' }
  ];

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    for (const u of users) {
      const hashed = await bcrypt.hash(u.password, 10);

      await conn.query(
        `
        INSERT INTO users (name, email, phone, password, role)
        VALUES (?, ?, ?, ?, ?)
        `,
        [u.name, u.email, u.phone, hashed, u.role]
      );
    }

    await conn.commit();
    console.log('✅ Users seeded successfully');
  } catch (err) {
    await conn.rollback();
    console.error('❌ User seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
