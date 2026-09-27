// This file manages all our connections to the backend server
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    // Return some fallback data so the site doesn't crash completely
    return [
      { value: 12400, suffix: "+", label: "Commitments tracked" },
      { value: 94, suffix: "%", label: "Assigned an owner within the call" },
      { value: 3.5, suffix: " hrs", label: "Saved per team, per week" }
    ];
  }
};

export const fetchHomepageContent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/homepage`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching homepage:", error);
    return null;
  }
};

export const fetchAd = async (index: number) => {
  const response = await fetch(`${BASE_URL}/ads/${index}`);
  if (!response.ok) throw new Error('Failed to fetch ad');
  return response.json();
};

export const createOrder = async (amount: number) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  if (!response.ok) throw new Error('Failed to create order');
  return response.json();
};

export const verifyPayment = async (paymentData: any) => {
  const response = await fetch(`${BASE_URL}/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  if (!response.ok) throw new Error('Payment verification failed');
  return response.json();
};
