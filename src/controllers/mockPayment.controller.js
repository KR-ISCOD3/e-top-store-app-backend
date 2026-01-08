import { mockPayments } from "../utils/mockPaymentStore.js";

/**
 * Create MOCK payment (NO ABA, NO HASH)
 */
export const createMockPayment = (req, res) => {
  const { order_id, amount } = req.body;

  const tran_id = "MOCK_" + Date.now();

  mockPayments[tran_id] = {
    order_id,
    amount,
    status: "PENDING",
    created_at: new Date()
  };

  res.json({
    success: true,
    tran_id,
    message: "Mock payment created",
    qr_fake: true
  });
};

/**
 * Confirm MOCK payment (simulate bank success)
 */
export const confirmMockPayment = (req, res) => {
  const { tran_id } = req.body;

  if (!mockPayments[tran_id]) {
    return res.status(404).json({
      success: false,
      message: "Mock transaction not found"
    });
  }

  mockPayments[tran_id].status = "SUCCESS";

  res.json({
    success: true,
    tran_id,
    status: "SUCCESS"
  });
};

/**
 * Check payment status
 */
export const getMockStatus = (req, res) => {
  const { tran_id } = req.params;

  if (!mockPayments[tran_id]) {
    return res.status(404).json({
      success: false,
      message: "Mock transaction not found"
    });
  }

  res.json({
    success: true,
    data: mockPayments[tran_id]
  });
};
