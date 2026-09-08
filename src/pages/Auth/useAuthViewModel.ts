import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from './AuthModel';

export const useAuthViewModel = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const toggleMode = () => {
        setMode((prev) => (prev === 'login' ? 'register' : 'login'));
        setError(null); // Clear errors when switching modes
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }
        
        setError(null);
        setLoading(true);

        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await register(email, password);
            }
            
            // Clear the password on successful authentication for security
            setPassword('');
            navigate('/'); // Send user back to home on success
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        mode,
        loading,
        error,
        handleSubmit,
        toggleMode
    };
};
