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

    const laptops = laptops = [
      // 🍎 Apple
      {
        brand: "Apple",
        name: "MacBook Air M1",
        price: 999,
        discount: 0,
        stock: 10,
        cpu: "Apple M1",
        ram: "8GB",
        storage: "256GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/71jG+e7roXL.jpg",
        description: "Lightweight, silent, and powerful with Apple M1 chip.",
        status: 1
      },
      {
        brand: "Apple",
        name: "MacBook Pro M2",
        price: 1299,
        discount: 50,
        stock: 8,
        cpu: "Apple M2",
        ram: "16GB",
        storage: "512GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/318IUzGaq2L.jpg",
        description: "High-performance MacBook for professional workloads.",
        status: 1
      },

      // 💻 Dell
      {
        brand: "Dell",
        name: "Dell XPS 13",
        price: 1099,
        discount: 0,
        stock: 12,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/710EGJBdIML.jpg",
        description: "Premium ultrabook with compact design.",
        status: 1
      },
      {
        brand: "Dell",
        name: "Dell Inspiron 15",
        price: 699,
        discount: 30,
        stock: 20,
        cpu: "Intel Core i5",
        ram: "8GB",
        storage: "512GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/615uLnwMQNL.jpg",
        description: "Reliable everyday laptop for work and study.",
        status: 1
      },

      // 🧠 HP
      {
        brand: "HP",
        name: "HP Pavilion 15",
        price: 729,
        discount: 20,
        stock: 15,
        cpu: "Intel Core i5",
        ram: "8GB",
        storage: "512GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/71r5gZx4u0L.jpg",
        description: "Affordable performance laptop for daily use.",
        status: 1
      },
      {
        brand: "HP",
        name: "HP Spectre x360",
        price: 1399,
        discount: 100,
        stock: 6,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://sm.pcmag.com/pcmag_me/review/h/hp-spectre/hp-spectre-x360-16-2024_krrn.jpg",
        description: "Premium 2-in-1 laptop for professionals.",
        status: 1
      },

      // 🧱 Lenovo
      {
        brand: "Lenovo",
        name: "ThinkPad X1 Carbon",
        price: 1499,
        discount: 0,
        stock: 7,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/61GSvJjxBuL.jpg",
        description: "Durable business laptop with excellent keyboard.",
        status: 1
      },
      {
        brand: "Lenovo",
        name: "IdeaPad Slim 3",
        price: 499,
        discount: 50,
        stock: 25,
        cpu: "AMD Ryzen 5",
        ram: "8GB",
        storage: "256GB SSD",
        thumbnail: "https://youget.pt/167672-large_default/lenovo-ideapad-slim-3-laptop-15iah8-043-156-i5-12450h-ssd-512-16gb.jpg",
        description: "Budget-friendly laptop for students.",
        status: 1
      },

      // 🎮 Asus
      {
        brand: "Asus",
        name: "ROG Zephyrus G14",
        price: 1599,
        discount: 120,
        stock: 6,
        cpu: "AMD Ryzen 9",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://s3.ap-southeast-1.amazonaws.com/uploads-store/uploads/all/t9P6y7fSRcLUPjKBpZkpURQs0I1BjxcqHQXqG8EU.png",
        description: "Powerful 14-inch gaming laptop.",
        status: 1
      },

      // 🔥 Acer
      {
        brand: "Acer",
        name: "Acer Nitro 5",
        price: 1099,
        discount: 70,
        stock: 10,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/71ctRE34RuL.jpg",
        description: "Gaming-focused laptop with strong performance.",
        status: 1
      },

      // 🟥 MSI
      {
        brand: "MSI",
        name: "MSI Stealth 15",
        price: 1799,
        discount: 150,
        stock: 5,
        cpu: "Intel Core i9",
        ram: "32GB",
        storage: "1TB SSD",
        thumbnail: "https://asset.msi.com/resize/image/global/product/product_1668750953e9457684f790246d93cc40066a7b1ca2.png62405b38c58fe0f07fcef2367d8a9ba1/600.png",
        description: "High-end gaming laptop with slim design.",
        status: 1
      },

      // 🪟 Microsoft
      {
        brand: "Microsoft",
        name: "Surface Laptop 5",
        price: 1299,
        discount: 150,
        stock: 12,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD",
        thumbnail: "https://m.media-amazon.com/images/I/61lYDihIxqL.jpg",
        description: "Sleek touchscreen laptop for productivity.",
        status: 1
      },

      // 📱 Samsung
      {
        brand: "Samsung",
        name: "Galaxy Book3 Pro",
        price: 1449,
        discount: 0,
        stock: 9,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "512GB SSD",
        thumbnail: "https://cdn.cs.1worldsync.com/bd/7f/bd7f8656-2e31-4e4e-b1a3-71e4af29b650.jpg",
        description: "AMOLED display with premium performance.",
        status: 1
      },

      // 🧊 LG
      {
        brand: "LG",
        name: "LG Gram 17",
        price: 1599,
        discount: 150,
        stock: 7,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://www.lg.com/content/dam/channel/wcms/au/images/laptops/17z90q-g_aa78a_ehap_au_c/gallery/17Z90Q-G.AA76A3-Laptops-DZ-2.jpg",
        description: "Ultra-light laptop with large display.",
        status: 1
      },

      // 🐍 Razer
      {
        brand: "Razer",
        name: "Razer Blade 15",
        price: 2499,
        discount: 200,
        stock: 4,
        cpu: "Intel Core i9",
        ram: "32GB",
        storage: "1TB SSD",
        thumbnail: "https://i5.walmartimages.com/asr/9e9821b2-11aa-4cf8-9560-234c3a82fac6.39caa4147b836043c01d45038f34eed7.jpeg",
        description: "Premium gaming laptop with aluminum body.",
        status: 1
      },

      // 🌐 Huawei
      {
        brand: "Huawei",
        name: "MateBook X Pro",
        price: 1699,
        discount: 0,
        stock: 7,
        cpu: "Intel Core i7",
        ram: "16GB",
        storage: "1TB SSD",
        thumbnail: "https://www.dxomark.com/wp-content/uploads/medias/post-175116/Huawei-MateBook-X-Pro-featured-image-packshot-review.jpg",
        description: "Ultra-thin laptop with stunning display.",
        status: 1
      }
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
