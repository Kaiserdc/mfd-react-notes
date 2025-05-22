import {createContext, useState} from 'react';
import type {ReactNode} from 'react';
import type {AuthContextType, User} from "../interfaces";



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const value = {
        user,
        signIn: (email: string, callback: VoidFunction) => {
            const newUser = {email};
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
            callback();
        },
        signOut: (callback: VoidFunction) => {
            setUser(null);
            localStorage.removeItem('user');
            callback();
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

