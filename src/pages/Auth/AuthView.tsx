import React from 'react';
import { useAuthViewModel } from './useAuthViewModel';
import './AuthView.css';

const AuthView: React.FC = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        mode,
        loading,
        error,
        handleSubmit,
        toggleMode
    } = useAuthViewModel();

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">
                    {mode === 'login' ? 'Login' : 'Create Account'}
                </h2>
                
                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-submit" 
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {mode === 'login' 
                            ? "Don't have an account?" 
                            : "Already have an account?"}
                    </p>
                    <button 
                        type="button" 
                        className="btn-toggle" 
                        onClick={toggleMode}
                    >
                        {mode === 'login' ? 'Create one now' : 'Login instead'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthView;
