import express from 'express';
import {
  storeLaptop,
  indexLaptops,
  showLaptop,
  updateLaptopById,
  destroyLaptop,
} from '../controllers/laptop.controller.js';

const router = express.Router();

router.get('/', indexLaptops);
router.get('/:id', showLaptop);
router.post('/', storeLaptop);
router.put('/:id', updateLaptopById);
router.delete('/:id', destroyLaptop);

export default router;
