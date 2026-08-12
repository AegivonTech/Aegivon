const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://aegivon-9sc9-eight.vercel.app';
const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

export const api = (path: string, opts?: RequestInit) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return fetch(`${baseUrl}${normalizedPath}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
    // Required to send and receive the httpOnly admin_token cookie
    credentials: 'include',
  });
};

export const apiFormData = (path: string, formData: FormData, opts?: RequestInit) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return fetch(`${baseUrl}${normalizedPath}`, {
    ...opts,
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header for FormData, browser sets it automatically with boundary
    credentials: 'include',
  });
};
