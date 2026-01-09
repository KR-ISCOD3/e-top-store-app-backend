import { createOrder } from '../models/order.model.js';

export async function checkout(req, res) {
  try {
    const { phone, address, note, items } = req.body;

    // ✅ SAFE VALIDATION (VERY IMPORTANT)
    if (!phone || !address) {
      return res.status(400).json({
        message: 'Phone and address are required',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: 'Cart items are required',
      });
    }

    // ✅ CALCULATE TOTALS
    const subtotal = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const shipping = 10;
    const total = subtotal + shipping;

    // ✅ CREATE ORDER
    const orderId = await createOrder({
      user_id: req.user.id, // must come from auth middleware
      phone,
      address,
      note: note || null,
      subtotal,
      shipping,
      total,
      payment_method: 'cash',
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order_id: orderId,
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return res.status(500).json({
      message: 'Checkout failed',
      error: err.message,
    });
  }
}
