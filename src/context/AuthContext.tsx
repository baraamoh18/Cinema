import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { subscribeToAuthChanges, logoutUser } from '../services/authService';

interface AuthContextType {
    user: User | null;
    authLoading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(true);

    useEffect(() => {
        // subscribeToAuthChanges returns the Firebase unsubscribe function natively
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });

        // Clean up the listener when the provider unmounts
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    // Show a loading state while authentication is being initialized
    if (authLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#141414', color: 'white' }}>
                <h2>Initializing session...</h2>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, authLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
