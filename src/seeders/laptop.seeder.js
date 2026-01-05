import db from '../config/db.js';

export default async function laptopSeeder() {
  console.log('💻 Seeding 20 laptops (full data)...');

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 🔎 Get admin user (owner of laptops)
    const [[admin]] = await conn.query(
      "SELECT id FROM users WHERE role_id = (SELECT id FROM roles WHERE name='admin') LIMIT 1"
    );

    if (!admin) throw new Error('Admin user not found');

    // 🔎 Load brands
    const [brands] = await conn.query('SELECT id, name FROM brands');
    const brandMap = {};
    brands.forEach(b => (brandMap[b.name] = b.id));

    // 🧹 Clean old seeded laptops
    await conn.query(
      "DELETE FROM laptops WHERE thumbnail LIKE '%example.com%'"
    );

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
life allows all-day productivity without frequent charging.`,
        status: 1,
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
performance for development, video editing, and creative tasks. It provides fast
processing, smooth multitasking, and a high-quality Retina display.`,
        status: 1,
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
powerful performance. It is perfect for office work, students, and professionals who
need portability without compromising speed.`,
        status: 1,
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
        description: `The Dell Inspiron 15 is a reliable laptop designed for everyday use.
It handles daily productivity tasks smoothly and offers a comfortable keyboard and
large display for work and study.`,
        status: 1,
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
        description: `The HP Pavilion 15 balances performance and affordability.
It is suitable for students, home users, and office work, offering stable performance
and modern design.`,
        status: 1,
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
        description: `The HP Spectre x360 is a premium 2-in-1 laptop built for professionals
who need flexibility and power. It supports tablet and laptop modes for creative and
business use.`,
        status: 1,
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
        description: `The ThinkPad X1 Carbon is known for durability and comfort.
It is designed for business users who work long hours and need a reliable machine.`,
        status: 1,
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
        description: `The Asus TUF Gaming F15 delivers strong performance for gaming
and heavy workloads. It features a durable build and stable cooling system.`,
        status: 1,
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
        description: `The Acer Nitro 5 is designed for gamers and power users who
need strong graphics and processing performance at a reasonable price.`,
        status: 1,
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
        description: `The MSI Stealth 15 is a high-end gaming laptop with a slim
design and powerful hardware for gaming and creative professionals.`,
        status: 1,
      },
    ];

    for (const l of laptops) {
      await conn.query(
        `INSERT INTO laptops
        (user_id, brand_id, name, price, discount, stock, cpu, ram, storage, thumbnail, description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
          l.description,
          l.status,
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
