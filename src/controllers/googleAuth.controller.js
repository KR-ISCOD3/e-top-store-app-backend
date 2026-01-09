import db from "../config/db.js";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleVerify.util.js";

export async function googleLogin(req, res) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Missing token" });
    }

    // 🔹 Verify with Google OAuth
    const googleUser = await verifyGoogleToken(idToken);

    // 🔐 IMPORTANT SECURITY CHECK
    if (googleUser.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const email = googleUser.email;
    const name = googleUser.name || "Google User";

    // 🔹 Check MySQL
    const [rows] = await db.query(
      "SELECT id, role FROM users WHERE email = ?",
      [email]
    );

    let userId;
    let role = "customer";

    if (rows.length === 0) {
      const [result] = await db.query(
        "INSERT INTO users (name, email, role) VALUES (?, ?, 'customer')",
        [name, email]
      );
      userId = result.insertId;
    } else {
      userId = rows[0].id;
      role = rows[0].role;
    }

    // 🔹 Issue YOUR OWN JWT
    const token = jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Google login success",
      token,
      user: {
        id: userId,
        name,        // ✅ ADD THIS
        email,
        role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Google login failed" });
  }
}
