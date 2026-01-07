import crypto from "crypto";

export function generatePurchaseHash(data, apiKey) {
  return crypto
    .createHmac("sha512", apiKey)
    .update(data)
    .digest("base64");
}
