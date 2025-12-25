import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

  const login = (token, userData) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData); // ✅ Cập nhật state user
    
    // Điều hướng dựa trên role
    if (userData?.role === "Student") {
      navigate("/home");
    } else if (userData?.role === "Mentor") {
      navigate("/mentor/dashboard");
    } else if (userData?.role === "Admin") {
      navigate("/admin/dashboard");
    } 
    else {
      navigate("/home");
    }
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công!");
    setIsLoggedIn(false);
    setUser(null); // ✅ Xóa user khi logout
    navigate("/home");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    const storedUser = localStorage.getItem("user");
  
    if (storedToken && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser)); // ✅ Gán user từ localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
