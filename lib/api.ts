/** @format */

const API_BASE_URL = 'https://fombina-backend.onrender.com';

export async function fetchSpaces() {
  const response = await fetch(`${API_BASE_URL}/api/spaces`);
  if (!response.ok) throw new Error('Failed to fetch spaces');
  return response.json();
}

export async function fetchSpace(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/spaces/${id}`);
  if (!response.ok) throw new Error('Failed to fetch space');
  return response.json();
}

export async function createBooking(bookingData: any) {
  const response = await fetch(`${API_BASE_URL}/api/book-space`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
}

export async function verifyPayment(reference: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/verify-payment/${reference}`
  );
  if (!response.ok) throw new Error('Failed to verify payment');
  return response.json();
}

export async function fetchGallery() {
  const response = await fetch(`${API_BASE_URL}/api/gallery`);
  if (!response.ok) throw new Error('Failed to fetch gallery');
  return response.json();
}

export async function fetchTimeline() {
  const response = await fetch(`${API_BASE_URL}/api/timeline`);
  if (!response.ok) throw new Error('Failed to fetch timeline');
  return response.json();
}

export async function submitContact(contactData: any) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
  return response.json();
}

export async function adminLogin(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Failed to login');
  return response.json();
}

export async function userLogin(credentials: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error('Failed to login');
  return response.json();
}

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to register');
  }
  return response.json();
}

export async function requestPasswordReset(email: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/reset-password-request`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );
  if (!response.ok) throw new Error('Failed to request password reset');
  return response.json();
}

export async function confirmPasswordReset(token: string, newPassword: string) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/reset-password-confirm`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, new_password: newPassword }),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to reset password');
  }
  return response.json();
}

export async function fetchTransactions(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/admin/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
}

export async function fetchBookings(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
}

export async function uploadMedia(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/admin/upload-media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload media');
  return response.json();
}
