import {
  createLaptop,
  getAllLaptops,
  getLaptopById,
  updateLaptop,
  deleteLaptop,
} from '../models/laptop.model.js';

// CREATE
export const storeLaptop = async (req, res) => {
  try {
    await createLaptop(req.body);
    res.status(201).json({ message: 'Laptop created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
export const indexLaptops = async (req, res) => {
  try {
    const laptops = await getAllLaptops();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const showLaptop = async (req, res) => {
  try {
    const laptop = await getLaptopById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ message: 'Laptop not found' });
    }
    res.json(laptop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateLaptopById = async (req, res) => {
  try {
    await updateLaptop(req.params.id, req.body);
    res.json({ message: 'Laptop updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const destroyLaptop = async (req, res) => {
  try {
    await deleteLaptop(req.params.id);
    res.json({ message: 'Laptop deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
