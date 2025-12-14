
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Завантаження...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}
