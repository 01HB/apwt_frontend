import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AccSession() {
    const router = useRouter();

    useEffect(() => {
        const session = sessionStorage.getItem('email');

        if (!session) {
            router.push('/login');
        }
    }, [router]);

    return null;
}
