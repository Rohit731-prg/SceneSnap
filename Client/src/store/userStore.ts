import { create } from 'zustand';
import axios from '../utils/API';
import toast from 'react-hot-toast';

// User type
interface User {
  username: string;
  email: string;
  password: string;
  otp: string;
  image: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Zustand state + actions
interface UserState {
  user: User | null;

  registerUser: (name: string, email: string, password: string, image: File) => Promise<void>;
  verifyUser: (otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Helper functions for localStorage
const loadUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const useUserStore = create<UserState>((set, get) => ({
  user: loadUser(),

  registerUser: async (name, email, password, image) => {
    try {
      const formData = new FormData();
      formData.append('username', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('profile', image);

      const response = axios.post('/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.promise(response, {
        loading: 'Registering...',
        success: (res) => res.data.message || 'Registered Successfully',
        error: (err) => err.response?.data?.message || 'Registration Failed',
      });

      const { data } = await response;
      console.log(data);
      set({ user: data.user });
      saveUser(data.user);  // Save to localStorage
    } catch (error: any) {
      console.error("Registration Error:", error);
    }
  },

  verifyUser: async (otp) => {
    try {
      const user = get().user;
      if (!user) {
        toast.error("User not found");
        return;
      }
      const response = axios.post('/user/verify', { email: user.email, otp });
      toast.promise(response, {
        loading: 'Verifying...',
        success: (res) => res.data.message || 'Verified Successfully',
        error: (err) => err.response?.data?.message || 'Verification Failed',
      });
    } catch (error) {
      console.error("Verification Error:", error);
    }
  },

  login: async (email, password) => {
    try {
      console.log("Attempting login with:", email, password);
      const response = axios.post('/user/login', { email, password });
      toast.promise(response, {
        loading: 'Logging in...',
        success: (res) => res.data.message || 'Logged in Successfully',
        error: (err) => err.response?.data?.message || 'Login Failed',
      });
      const { data } = await response;
      set({ user: data.user });
      saveUser(data.user); // Save to localStorage
      return true;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  },

  logout: () => {
    set({ user: null });
    removeUser();
    toast.success("Logged out successfully");
  }
}));

export default useUserStore;
