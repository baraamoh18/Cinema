import { registerUser, loginUser, logoutUser } from '../../services/authService';
import type { User } from 'firebase/auth';

// Helper to validate and normalize credentials before hitting the service layer
const validateCredentials = (email: string, password: string): { normalizedEmail: string } => {
    const normalizedEmail = email.trim().toLowerCase();
    
    if (!normalizedEmail) {
        throw new Error("Email address cannot be empty.");
    }
    
    if (!password || password.trim().length === 0) {
        throw new Error("Password cannot be empty.");
    }
    
    if (password.length < 6) {
        throw new Error("Password must contain at least 6 characters.");
    }
    
    return { normalizedEmail };
};

export const register = async (email: string, password: string): Promise<User> => {
    const { normalizedEmail } = validateCredentials(email, password);
    const userCredential = await registerUser(normalizedEmail, password);
    return userCredential.user;
};

export const login = async (email: string, password: string): Promise<User> => {
    const { normalizedEmail } = validateCredentials(email, password);
    const userCredential = await loginUser(normalizedEmail, password);
    return userCredential.user;
};

export const logout = async (): Promise<void> => {
    await logoutUser();
};
