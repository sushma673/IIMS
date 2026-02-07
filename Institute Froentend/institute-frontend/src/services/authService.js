import axios from "axios";

const API_URL = "http://localhost:8090/api";

export const registerUser = (email) =>
  axios.post(`${API_URL}/auth/register`, { email });

export const sendOtp = (email) =>
  axios.post(`${API_URL}/auth/send-otp`, { email });

export const verifyOtp = (email, otp) =>
  axios.post(`${API_URL}/auth/verify-otp`, { email, otp });

export const adminLogin = (email, password) =>
  axios.post(`${API_URL}/admin/login`, { email, password });