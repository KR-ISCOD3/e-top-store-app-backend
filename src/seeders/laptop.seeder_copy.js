import db from '../config/db.js';

export default async function laptopSeederCopy() {
  console.log('💻 Seeding laptops (full data)...');

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // get admin user
    const [[admin]] = await conn.query(
      "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
    );

    if (!admin) throw new Error('Admin user not found');

    // load brands
    const [brands] = await conn.query('SELECT id, name FROM brands');
    const brandMap = {};
    brands.forEach(b => (brandMap[b.name] = b.id));

    // clean old laptops
    await conn.query("DELETE FROM laptops WHERE thumbnail LIKE '%example.com%'");

    const laptops = [
      {
        brand: 'Apple',
        name: 'MacBook Air M1',
        price: 999,
        discount: 0,
        stock: 10,
        cpu: 'Apple M1',
        ram: '8GB',
        storage: '256GB SSD',
        thumbnail: 'https://example.com/macbook-air-m1.png',
        description: `The MacBook Air M1 delivers excellent performance and power efficiency.
It is designed for students, professionals, and everyday users who need a lightweight
and reliable laptop. The fanless design ensures silent operation, while the long battery
life allows all-day productivity without frequent charging.`
      },
      {
        brand: 'Apple',
        name: 'MacBook Pro M2',
        price: 1299,
        discount: 50,
        stock: 8,
        cpu: 'Apple M2',
        ram: '16GB',
        storage: '512GB SSD',
        thumbnail: 'https://example.com/macbook-pro-m2.png',
        description: `The MacBook Pro M2 is built for professionals who require higher
performance for development, video editing, and creative tasks.`
      },
      {
        brand: 'Dell',
        name: 'Dell XPS 13',
        price: 1099,
        discount: 0,
        stock: 12,
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '512GB SSD',
        thumbnail: 'https://example.com/dell-xps-13.png',
        description: `The Dell XPS 13 is a premium ultrabook with a compact design and
powerful performance.`
      },
      {
        brand: 'Dell',
        name: 'Dell Inspiron 15',
        price: 699,
        discount: 30,
        stock: 20,
        cpu: 'Intel Core i5',
        ram: '8GB',
        storage: '512GB SSD',
        thumbnail: 'https://example.com/dell-inspiron-15.png',
        description: `The Dell Inspiron 15 is a reliable laptop designed for everyday use.`
      },
      {
        brand: 'HP',
        name: 'HP Pavilion 15',
        price: 729,
        discount: 20,
        stock: 15,
        cpu: 'Intel Core i5',
        ram: '8GB',
        storage: '512GB SSD',
        thumbnail: 'https://example.com/hp-pavilion-15.png',
        description: `The HP Pavilion 15 balances performance and affordability.`
      },
      {
        brand: 'HP',
        name: 'HP Spectre x360',
        price: 1399,
        discount: 100,
        stock: 6,
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '1TB SSD',
        thumbnail: 'https://example.com/hp-spectre-x360.png',
        description: `The HP Spectre x360 is a premium 2-in-1 laptop.`
      },
      {
        brand: 'Lenovo',
        name: 'ThinkPad X1 Carbon',
        price: 1499,
        discount: 0,
        stock: 7,
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '1TB SSD',
        thumbnail: 'https://example.com/thinkpad-x1.png',
        description: `The ThinkPad X1 Carbon is known for durability and comfort.`
      },
      {
        brand: 'Asus',
        name: 'Asus TUF Gaming F15',
        price: 1199,
        discount: 80,
        stock: 9,
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '512GB SSD',
        thumbnail: 'https://example.com/asus-tuf-f15.png',
        description: `The Asus TUF Gaming F15 delivers strong gaming performance.`
      },
      {
        brand: 'Acer',
        name: 'Acer Nitro 5',
        price: 1099,
        discount: 70,
        stock: 10,
        cpu: 'Intel Core i7',
        ram: '16GB',
        storage: '1TB SSD',
        thumbnail: 'https://example.com/acer-nitro-5.png',
        description: `The Acer Nitro 5 is designed for gamers and power users.`
      },
      {
        brand: 'MSI',
        name: 'MSI Stealth 15',
        price: 1799,
        discount: 150,
        stock: 5,
        cpu: 'Intel Core i9',
        ram: '32GB',
        storage: '1TB SSD',
        thumbnail: 'https://example.com/msi-stealth-15.png',
        description: `The MSI Stealth 15 is a high-end gaming laptop.`
      }
    ];

    for (const l of laptops) {
      await conn.query(
        `
        INSERT INTO laptops
        (user_id, brand_id, name, price, discount, stock, cpu, ram, storage, thumbnail, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          admin.id,
          brandMap[l.brand],
          l.name,
          l.price,
          l.discount,
          l.stock,
          l.cpu,
          l.ram,
          l.storage,
          l.thumbnail,
          l.description
        ]
      );
    }

    await conn.commit();
    console.log('✅ Laptop seeding completed');
  } catch (err) {
    await conn.rollback();
    console.error('❌ Laptop seeding failed:', err.message);
  } finally {
    conn.release();
  }
}
