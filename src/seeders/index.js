import brandSeeder from './brand.seeder.js';
import userSeeder from './user.seeder.js';
import laptopSeeder from './laptop.seeder.js';
import laptopSeederCopy from './laptop.seeder_copy.js';
import orderSeeder from './order.seeder.js';

async function runSeeders() {
  console.log('🚀 Running seeders...');
  await brandSeeder();
  await userSeeder();
  // await laptopSeeder();
  await laptopSeederCopy()
  // await orderSeeder();
  // await laptopS();
  console.log('🌱 All seeders executed successfully');
  process.exit(0);
}

runSeeders();
