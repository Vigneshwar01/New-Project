import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data; 
      console.log(data); 
  
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  });
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, 
  status: 'idle', 
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); 
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; 
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
