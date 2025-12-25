import { Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function PrivateRouter() {
    const { login } = useContext(AuthContext); // Lấy user từ context

    return login ? <Outlet /> : <Navigate to="/login" replace />;
}
