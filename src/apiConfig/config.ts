"use client";

// Switches between different environments
const configSwitcher = (environmentType: string) => {
  let configuration;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/api/`,
        ImageUrl: `http://localhost:3000`,
      };
      break;
    case "https://blogs-next-js-iota.vercel.app/":
      configuration = {
        API_URL: `https://blogs-next-js-iota.vercel.app/api/`,
        ImageUrl: `https://blogs-next-js-iota.vercel.app`,
      };
      break;
    default:
      configuration = {
        /* Default Local Config */
        API_URL: `http://localhost:3000/api/`,
        ImageUrl: `http://localhost:3000`,
      };
  }

  return configuration;
};

// Just change the string to 'local', 'sandbox', 'staging' or 'prod' to switch between different environments.
// export const config = configSwitcher(window.location.hostname);
export const config =
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : { API_URL: "", ImageUrl: "" };
