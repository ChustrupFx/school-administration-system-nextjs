import { useRouter } from 'next/router';
import { createContext, useState, useEffect, useContext, useRef } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const mounted = useRef(true);

    useEffect(() => {
        getAuthProperties();

        return () => { mounted.current = false; console.log('unmounted auth') }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isSigned, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

    async function getAuthProperties() {
        if (isSigned) return;
        const response = await api.get('user/authUser');
        if (!mounted.current) return;
        const responseData = response.data;
        if (responseData.ok) {
            api.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
            setUser(responseData.user);
            setIsSigned(true);
        }
        setLoading(false);
    }

    async function login({ registrationCode, password }) {
        const response = await api.post('/user/login', {
            registrationCode,
            password,
        });
        const responseData = response.data;
        console.log(responseData);
    
        if (!mounted.current) return;
        if (responseData.ok) {
            await getAuthProperties();
            router.push('/home');
        }

        return responseData;
    }

    async function logout() {
        const response = await api.post('user/logout');
        const responseData = response.data;

        if (responseData.ok) {
            router.push('/error', '/');
        }
    }
}


export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}