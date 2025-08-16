import { create } from 'zustand';
import axios from '../utils/API';
import toast from 'react-hot-toast';

// User type
interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  auth: boolean;
  otp: string;
  image: string;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Zustand state + actions
interface UserState {
  user: User | null;
  totalUser: number | null;
  newRequest: any[] | null;
  newRequestCount: number | null;

  getAllRequest: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  checkOTP: (otp: string) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  totalUser: null,
  newRequest: null,
  newRequestCount: null,

  getAllRequest: async () => {
    try {
      const res = await axios.get('/users/getAllUsers');
      set({ newRequest: res.data.users, newRequestCount: res.data.count });
    } catch (error: any) {
      toast.error(error?.response?.data?.message?.message || "Failed to fetch users");
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = axios.post('/users/login', { email, password });

      await toast.promise(res, {
        loading: 'Logging in...',
        success: (data) => {
          set({ user: data.data.user });
          return data.data.message.message;
        },
        error: (error) => {
          return error?.response?.data?.message?.message || 'Login failed';
        },
      });

      return true;
    } catch (error: any) {
      toast.error(error?.response?.data?.message?.message || 'Something went wrong');
      return false;
    }
  },

  checkOTP: async (SendOtp: string) => {
    const state = useUserStore.getState();
    const email = state.user?.email;

    try {
      const res = axios.post('/users/otp', {
        email,
        SendOtp
      });
      toast.promise(res, {
        loading: 'Checking OTP...',
        success: (data) => {
          set({ user: data.data.user });
          return data.data.message.message;
        },
        error: (error) => {
          return error?.response?.data?.message?.message || 'OTP check failed';
        },
      })
    } catch (error) {
      console.log(error);
    }
  }
}));

export default useUserStore;
