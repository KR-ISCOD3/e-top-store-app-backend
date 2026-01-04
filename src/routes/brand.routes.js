import express from 'express';
import {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} from '../controllers/brand.controller.js';

const router = express.Router();

router.get('/', getBrands);
router.get('/:id', getBrand);
router.post('/', createBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

export default router;

// INSERT INTO brands (name, logo) VALUES
// ('Apple', 'https://www.freeiconspng.com/uploads/apple-icon-4.png'),
// ('Dell', 'https://www.freepnglogos.com/uploads/dell-png-logo/world-brand-dell-png-logo-5.png'),
// ('HP', 'https://download.logo.wine/logo/Hewlett-Packard/Hewlett-Packard-Logo.wine.png'),
// ('Lenovo', 'https://www.pngall.com/wp-content/uploads/8/Lenovo-Logo-PNG-File.png'),
// ('Asus', 'https://download.logo.wine/logo/Asus/Asus-Logo.wine.png'),
// ('Acer', 'https://www.logo.wine/a/logo/Acer_Inc./Acer_Inc.-Logo.wine.svg'),
// ('MSI', 'https://static.cdnlogo.com/logos/m/21/msi.png'),
// ('Microsoft', 'https://static.vecteezy.com/system/resources/previews/027/127/473/non_2x/microsoft-logo-microsoft-icon-transparent-free-png.png'),
// ('Samsung', 'https://www.freepnglogos.com/uploads/original-samsung-logo-10.png'),
// ('LG', 'https://logo.clearbit.com/lg.com'),
// ('Razer', 'https://cdn.freebiesupply.com/logos/large/2x/razer-logo-png-transparent.png'),
// ('Huawei', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwv5y6NPP5Tkt1WNLAztzfyFtG0eomZwcVXw&s'),
// ('Xiaomi', 'https://www.freepnglogos.com/uploads/xiaomi-png/mi-logo-png-3.png'),
// ('Sony', 'https://www.logo.wine/a/logo/Sony_Mobile/Sony_Mobile-Logo.wine.svg'),
// ('Toshiba', 'https://upload.wikimedia.org/wikipedia/commons/d/df/TOSHIBA_Logo.png');
