// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import SignIn from './Pages/SignInPage';
import SignUp from './Pages/SignUpPage';
import Home from './Pages/Home';
import Notes from './Pages/Notes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/notes" element={<Notes />} /> 

      </Routes>
    </Provider>
  );
};

export default App;
