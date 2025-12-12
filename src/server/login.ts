import api from './api'
import type { ILoginResponse } from '../interfaces/server';

export const login = async (email: string, password: string): Promise<ILoginResponse> => {
  try {
    const res = await api.post('/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Login response:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
};