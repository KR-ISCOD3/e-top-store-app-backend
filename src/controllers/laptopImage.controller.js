import {
  createLaptopImage,
  getImagesByLaptopId,
  getLaptopImageById,
  updateLaptopImage,
  deleteLaptopImage,
} from '../models/laptopImage.model.js';

/**
 * CREATE
 * Accepts:
 * - multipart/form-data (image upload)
 * - JSON (image_url)
 */
export const storeLaptopImage = async (req, res) => {
  try {
    const { laptop_id, image_url } = req.body;

    let imagePath = null;
    let imageUrl = null;

    // uploaded file
    if (req.file) {
      imagePath = req.file.path.replace('public/', '');
    }

    // external URL
    if (image_url) {
      imageUrl = image_url;
    }

    if (!laptop_id) {
      return res.status(400).json({
        message: 'laptop_id is required',
      });
    }

    if (!imagePath && !imageUrl) {
      return res.status(400).json({
        message: 'image_path or image_url is required',
      });
    }

    await createLaptopImage({
      laptop_id,
      image_path: imagePath,
      image_url: imageUrl,
    });

    res.status(201).json({
      message: 'Laptop image created successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * READ ALL by laptop
 */
export const indexLaptopImages = async (req, res) => {
  try {
    const { laptopId } = req.params;
    const images = await getImagesByLaptopId(laptopId);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * READ ONE
 */
export const showLaptopImage = async (req, res) => {
  try {
    const image = await getLaptopImageById(req.params.id);

    if (!image) {
      return res.status(404).json({
        message: 'Laptop image not found',
      });
    }

    res.json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE
 */
export const updateLaptopImageById = async (req, res) => {
  try {
    const { image_url } = req.body;

    let imagePath = null;
    let imageUrl = null;

    if (req.file) {
      imagePath = req.file.path.replace('public/', '');
    }

    if (image_url) {
      imageUrl = image_url;
    }

    if (!imagePath && !imageUrl) {
      return res.status(400).json({
        message: 'image_path or image_url is required',
      });
    }

    await updateLaptopImage(req.params.id, {
      image_path: imagePath,
      image_url: imageUrl,
    });

    res.json({
      message: 'Laptop image updated successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE
 */
export const destroyLaptopImage = async (req, res) => {
  try {
    await deleteLaptopImage(req.params.id);
    res.json({
      message: 'Laptop image deleted successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
