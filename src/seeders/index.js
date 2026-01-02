import userSeeder from './user.seeder.js';

async function runSeeders() {
  try {
    await userSeeder();
    console.log('🌱 All seeders executed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
  }
}

runSeeders();
