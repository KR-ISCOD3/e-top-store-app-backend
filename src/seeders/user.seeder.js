import bcrypt from 'bcrypt';
import db from '../config/db.js';

export default async function userSeeder() {
  console.log('🌱 Seeding users (7 users)...');

  const users = [
    { name: 'Admin User', email: 'admin@etopstore.com', password: '123456', role: 'admin' },
    { name: 'Seller User', email: 'seller@etopstore.com', password: '123456', role: 'seller' },

    { name: 'Sok Pisey', email: 'sok.pisey@etopstore.com', password: '123456', role: 'customer' },
    { name: 'Ta Sok', email: 'ta.sok@etopstore.com', password: '123456', role: 'customer' },
    { name: 'Ta Hour', email: 'ta.hour@etopstore.com', password: '123456', role: 'customer' },
    { name: 'Ta Heng', email: 'ta.heng@etopstore.com', password: '123456', role: 'customer' },
    { name: 'Ta Rong', email: 'ta.rong@etopstore.com', password: '123456', role: 'customer' },
  ];

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // Load roles → map name → id
    const [roles] = await conn.query('SELECT id, name FROM roles');
    const roleMap = {};
    roles.forEach(r => (roleMap[r.name] = r.id));

    // Safety check
    if (!roleMap.admin || !roleMap.seller || !roleMap.customer) {
      throw new Error('Roles not seeded yet');
    }

    // Clean old seeded users
    await conn.query(
      "DELETE FROM users WHERE email LIKE '%@etopstore.com'"
    );

    for (const user of users) {
      const hash = await bcrypt.hash(user.password, 10);

      await conn.query(
        `INSERT INTO users (name, email, password, role_id)
         VALUES (?, ?, ?, ?)`,
        [user.name, user.email, hash, roleMap[user.role]]
      );
    }

    await conn.commit();
    console.log('✅ 7 users seeded successfully');
  } catch (err) {
    await conn.rollback();
    console.error('❌ User seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
