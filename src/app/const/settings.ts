const settings = {
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  clientId: import.meta.env.VITE_CTP_CLIENT_ID,
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  authUrl: import.meta.env.VITE_CTP_AUTH_URL,
  apiUrl: import.meta.env.VITE_CTP_API_URL,
  scopes: import.meta.env.VITE_CTP_SCOPES,
  currency: import.meta.env.VITE_CTP_DEFAULT_CURRENCY,
};

// предельная ширина мобильного экрана
export const mobileWidth = 1100;

export default settings;
