import axios from "axios";
import FormData from "form-data";
import { generatePurchaseHash } from "../utils/abaRsaSign.js";

export const createAbaPayment = async (req, res) => {
  try {
    const { order_id, amount } = req.body;

    const req_time = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const merchant_id = process.env.ABA_MERCHANT_ID;
    const currency = "USD";
    const type = "purchase";

    const payment_option = "abapay_khqr_deeplink";

    // EXACT HASH ORDER (DO NOT CHANGE)
    const beforeHash =
      req_time +
      merchant_id +
      order_id +
      amount +
      "" + "" + "" + "" + "" + "" +
      type +
      payment_option +
      "" + "" + "" + "" +
      currency +
      "" + "" + "" + "" + "" + "" + "" + "";

    const hash = generatePurchaseHash(
      beforeHash,
      process.env.ABA_PUBLIC_KEY
    );

    const form = new FormData();
    form.append("req_time", req_time);
    form.append("merchant_id", merchant_id);
    form.append("tran_id", order_id);
    form.append("amount", amount);
    form.append("currency", currency);
    form.append("type", type);
    form.append("payment_option", payment_option);
    form.append("hash", hash);

    const response = await axios.post(
      process.env.ABA_PURCHASE_URL,
      form,
      { headers: form.getHeaders() }
    );

    res.json({
      success: true,
      mode: "qr",
      qrImage: response.data.qrImage,
      qrString: response.data.qrString,
      deeplink: response.data.abapay_deeplink,
      tran_id: response.data.status.tran_id
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
};
