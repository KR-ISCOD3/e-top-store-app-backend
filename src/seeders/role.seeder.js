import db from '../config/db.js';

export default async function roleSeeder() {
  console.log('🌱 Seeding roles...');

  const roles = ['admin', 'seller', 'customer'];

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // Clean roles safely
    await conn.query('DELETE FROM roles');

    for (const role of roles) {
      await conn.query(
        'INSERT INTO roles (name) VALUES (?)',
        [role]
      );
    }

    await conn.commit();
    console.log('✅ Roles seeded successfully');
  } catch (err) {
    await conn.rollback();
    console.error('❌ Role seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
