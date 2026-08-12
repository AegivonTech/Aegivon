const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const api = (path: string, opts?: RequestInit) => {
  return fetch(`${API_URL}${path}`, {
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
  return fetch(`${API_URL}${path}`, {
    ...opts,
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header for FormData, browser sets it automatically with boundary
    credentials: 'include',
  });
};
