import { createOrder, getOrdersByUser } from '../models/order.model.js';

export const storeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderId = await createOrder(userId, items);

    res.status(201).json({
      message: 'Order created successfully',
      order_id: orderId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getOrdersByUser(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
