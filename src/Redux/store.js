// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import notesReducer from './notesslice';

const store = configureStore({
  reducer: { auth: authReducer,
    notes: notesReducer

   },
});

export default store;
