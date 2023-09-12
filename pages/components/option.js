import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import { HeartIcon, ShoppingCartIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

export default function Option() {
    const [email, setEmail] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = sessionStorage.getItem('email');
            if (session) {
                setEmail(sessionStorage.getItem('email'));
            }
        }
    }, []);

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:3030/account/logout')
            console.log(response.data);
            sessionStorage.clear();
            setEmail(null);
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {email !== null ? (
                <div className='flex md:flex-row flex-col md:justify-evenly justify-center items-center md:gap-10 gap-4'>
                    <Link href="/account/wishlist" className="hover:text-violet-800 transition duration-200">
                        <HeartIcon className="h-6 w-6" />
                    </Link>
                    <Link href="/cart" className="hover:text-violet-800 transition duration-200">
                        <ShoppingCartIcon className="h-6 w-6" />
                    </Link>
                    <Link href="/account" className="hover:text-violet-800 transition duration-200">
                        <UserCircleIcon className="h-6 w-6" />
                    </Link>
                    <button className="hover:text-violet-800 transition duration-200" onClick={handleLogout}>
                        <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    </button>
                </div>
            ) : (
                <div className='flex md:flex-row flex-col md:justify-evenly justify-center items-center md:gap-10 gap-4'>
                    <Link href="/signup" className="hover:text-violet-600 transition duration-200">Sign Up</Link>
                    <Link href="/login"><button className="flex text-white bg-violet-600 border-0 py-2 px-6 transition duration-200 hover:bg-violet-800 rounded-[24px]">Login</button></Link>
                </div>
            )}
        </>
    );
}
