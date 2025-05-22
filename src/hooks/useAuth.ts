import {useContext} from "react";
import {AuthContext} from "../context";
import type {AuthContextType} from "../interfaces";

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}