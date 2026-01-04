import * as Brand from '../models/brand.model.js';

export const getBrands = async (req, res) => {
  const brands = await Brand.getAllBrands();
  res.json(brands);
};

export const getBrand = async (req, res) => {
  const brand = await Brand.getBrandById(req.params.id);
  if (!brand) return res.status(404).json({ message: 'Brand not found' });
  res.json(brand);
};

export const createBrand = async (req, res) => {
  const { name, logo } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const id = await Brand.createBrand({ name, logo });
  res.status(201).json({ message: 'Brand created', id });
};

export const updateBrand = async (req, res) => {
  await Brand.updateBrand(req.params.id, req.body);
  res.json({ message: 'Brand updated' });
};

export const deleteBrand = async (req, res) => {
  await Brand.deleteBrand(req.params.id);
  res.json({ message: 'Brand deleted' });
};
