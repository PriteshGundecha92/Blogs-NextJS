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
    // case "http://localhost:3000":
    //   configuration = {
    //     API_URL: `http://localhost:3000/api/`,
    //     ImageUrl: `http://localhost:3000`,
    //   };
    //   break;
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