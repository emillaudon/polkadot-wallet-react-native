import React from 'react';
import AuthContextProvider from './AuthContext';
import AuthNavigation from './navigation /AuthNavigation';

export default function App() {
  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>
  );
}
