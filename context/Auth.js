import { createContext, useState, useEffect, useContext, useRef } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children, maconha }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if (isSigned) return;
        const response = await api.get('user/authUser');
        const responseData = response.data;
        
        if (responseData.ok) {
            setUser(responseData.user);
            setIsSigned(true);
        }

        setLoading(false);
    });

    return (
        <AuthContext.Provider value={{user, token, isSigned, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}