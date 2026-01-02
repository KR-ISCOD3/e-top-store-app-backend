import bcrypt from 'bcrypt';
import db from '../config/db.js';

export default async function userSeeder() {
  console.log('🌱 Seeding users (7 users)...');

  const users = [
    // admin
    { name: 'Admin User', email: 'admin@etopstore.com',password: '123456', role: 'admin',},

    // seller
    { name: 'Seller User', email: 'seller@etopstore.com', password: '123456', role: 'seller',},

    // customers (5)
    { name: 'Sok Pisey', email: 'sok.pisey@etopstore.com', password: '123456', role: 'customer',},
    { name: 'Ta Sok', email: 'ta.sok@etopstore.com',  password: '123456', role: 'customer',},
    { name: 'Ta Hour', email: 'ta.hour@etopstore.com', password: '123456', role: 'customer',},
    { name: 'Ta Heng', email: 'ta.heng@etopstore.com', password: '123456', role: 'customer',},
    { name: 'Ta Rong', email: 'ta.rong@etopstore.com', password: '123456',role: 'customer',},
  ];

  // FK-safe cleanup (no TRUNCATE)
  await db.query("DELETE FROM users WHERE email LIKE '%@etopstore.com'");

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [user.name, user.email, hash, user.role]
    );
  }

  console.log('✅ 7 users seeded successfully');
}
