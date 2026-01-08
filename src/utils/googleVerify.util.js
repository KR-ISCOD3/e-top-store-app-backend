import axios from "axios";

export async function verifyGoogleToken(idToken) {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
  const res = await axios.get(url);
  return res.data;
}
