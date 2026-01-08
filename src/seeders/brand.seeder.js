import db from '../config/db.js';

export default async function brandSeeder() {
  console.log('🏷️ Seeding brands...');

  const brands = [
    { name: 'Apple', logo: 'https://www.freeiconspng.com/uploads/apple-icon-4.png' },
    { name: 'Dell', logo: 'https://www.freepnglogos.com/uploads/dell-png-logo/world-brand-dell-png-logo-5.png' },
    { name: 'HP', logo: 'https://download.logo.wine/logo/Hewlett-Packard/Hewlett-Packard-Logo.wine.png' },
    { name: 'Lenovo', logo: 'https://www.pngall.com/wp-content/uploads/8/Lenovo-Logo-PNG-File.png' },
    { name: 'Asus', logo: 'https://download.logo.wine/logo/Asus/Asus-Logo.wine.png' },
    { name: 'Acer', logo: 'https://www.logo.wine/a/logo/Acer_Inc./Acer_Inc.-Logo.wine.svg' },
    { name: 'MSI', logo: 'https://static.cdnlogo.com/logos/m/21/msi.png' },
    { name: 'Microsoft', logo: 'https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png' },
    { name: 'Samsung', logo: 'https://www.freepnglogos.com/uploads/original-samsung-logo-10.png' },
    { name: 'LG', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhQwllgzkJF844-_bi7qz6XZSF9YJ3uppIA&s' },
    { name: 'Razer', logo: 'https://cdn.freebiesupply.com/logos/large/2x/razer-logo-png-transparent.png' },
    { name: 'Huawei', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwv5y6NPP5Tkt1WNLAztzfyFtG0eomZwcVXw&s' },
    { name: 'Xiaomi', logo: 'https://www.freepnglogos.com/uploads/xiaomi-png/mi-logo-png-3.png' },
    { name: 'Sony', logo: 'https://www.logo.wine/a/logo/Sony_Mobile/Sony_Mobile-Logo.wine.svg' },
    { name: 'Toshiba', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/TOSHIBA_Logo.png/1200px-TOSHIBA_Logo.png' },
  ];

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 🧹 Clean brands
    await conn.query('DELETE FROM brands');

    for (const brand of brands) {
      await conn.query(
        'INSERT INTO brands (name, logo) VALUES (?, ?)',
        [brand.name, brand.logo]
      );
    }

    await conn.commit();
    console.log(`✅ ${brands.length} brands seeded successfully`);
  } catch (err) {
    await conn.rollback();
    console.error('❌ Brand seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
