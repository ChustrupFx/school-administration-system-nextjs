import { useEffect } from 'react';
import { useAuth } from '../../context/Auth';
import { useRouter } from 'next/router';

const ProtectedRoute = () => {
    const { isSigned, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !isSigned) {
            router.push('/');
        }
    })

    return null;
}

export default ProtectedRoute