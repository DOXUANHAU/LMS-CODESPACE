import { useEffect } from 'react';
import './App.css'
import AuthProvider from './context/AuthProvider';
import AppRoutes from './routes/index';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
