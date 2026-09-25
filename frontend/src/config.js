// Base URL of the Flask API (backend/). Set VITE_API_URL at build time to use another server.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001').replace(/\/$/, '');
