import roleSeeder from './role.seeder.js';
import userSeeder from './user.seeder.js';

async function runSeeders() {
  try {
    console.log('🚀 Running seeders...');

    await roleSeeder();   
    await userSeeder();   

    console.log('🌱 All seeders executed successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err.message);
    process.exit(1);
  }
}

runSeeders();
