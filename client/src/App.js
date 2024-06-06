// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Homepage/Homepage.js';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import AboutUs from './pages/AboutUs/AboutUs.js';
import Contact from './pages/Contacts/Contacts.js';
import Profile from './pages/Profile/Profile.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import { useAuth, AuthProvider } from './context/AuthContext.js';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <MainRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

const MainRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/about" element={<AboutUs />} />
      <Route exact path="/contacts" element={<Contact />} />
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
