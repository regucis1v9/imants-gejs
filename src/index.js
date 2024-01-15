import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes} from 'react-router-dom'; // Don't forget to import Route
import { BrowserRouter as Router } from 'react-router-dom';
import { 
  Landing,
  Login,
  Verification,
  Profile
} from './views';
import AuthWrapper from './functions/AuthWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/verification/:id" element={<Verification  />} />
      </Routes>
    </AuthWrapper>
  </Router>
);
