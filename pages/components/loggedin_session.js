import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoggedinSession() {
    const router = useRouter();

    useEffect(() => {
        const session = sessionStorage.getItem('email');

        if (session) {
            router.push('/');
        }
    }, [router]);

    return null;
}
