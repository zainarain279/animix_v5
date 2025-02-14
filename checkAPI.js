const axios = require("axios");
const { log } = require("./utils"); // Path theek kar lo agar zarurat ho
const settings = require("./config/config");

const urlChecking = "https://raw.githubusercontent.com/zainarain279/APIs-checking/refs/heads/main/endpoints.json";

async function checkBaseUrl() {
  console.log("API checking...".blue);
  if (settings.ADVANCED_ANTI_DETECTION) {
    const result = await getBaseApi(urlChecking);
    if (result.endpoint) {
      log("No change in api!", "success");
      return result; // Agar API se message hai toh wahi show hoga
    }
  } else {
    return { endpoint: settings.BASE_URL }; // Yahan koi message nahi, sirf endpoint
  }
}

async function getBaseApi(url) {
  try {
    const response = await axios.get(url);
    const content = response.data;
    if (content?.animix) {
      return { endpoint: content.animix, message: content.copyright || '' }; // Agar message diya ho toh dikhai dega
    } else {
      return { endpoint: null }; // Agar endpoint nahi mila toh sirf null return karenge
    }
  } catch (e) {
    return { endpoint: null }; // Agar error aaya toh bhi sirf null
  }
}

module.exports = { checkBaseUrl };