import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import AccSession from '../components/session';
import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, LockClosedIcon, HeartIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';


export default function AccountDashboard() {

    const [account, setAccount] = useState({});

    const fetchAccInfo = async () => {
        const session = sessionStorage.getItem('email');

        if (session) {
            const response = await axios.get("http://localhost:3030/account/info");
            console.log(response.data);
            setAccount(response.data);
        }
    };

    useEffect(() => {
        try {
            fetchAccInfo();
        }
        catch (error) {
            console.error(error);
        }
    }, []);


    return (
        <>
            <AccSession />
            <Layout title="Account - AG&G">
                <section className="bg-gradient-to-b from-indigo-100 to-fuchsia-100">
                    <div className="flex md:flex-row flex-col justify-center md:items-start items-center w-full min-h-screen py-[55px] px-[40px]">
                        <div className='flex flex-col w-[300px] py-[30px] items-center'>
                            <div className="w-[200px] h-[200px] flex justify-center items-center overflow-clip rounded-full m-2 bg-white border-[2px] border-neutral-500">
                                <Image src="/cat_iphn.png" alt="profile_pic" width="250" height="250" className="object-cover origin-center" />
                            </div>
                            <h2 className="text-xl mt-2 font-semibold text-gray-900">{account.name}</h2>
                            <h3 className="text-base mt-2 font-semibold text-gray-900">{account.email}</h3>
                        </div>
                        <div className="w-full max-w-[1000px] p-8 justify-items-center place-content-center grid md:grid-cols-[repeat(2,_minmax(200px,_1fr))] xl:grid-cols-[repeat(4,_minmax(200px,_1fr))] grid-cols-[repeat(1,_minmax(200px,_1fr))] gap-2">
                            <Link href="/account/edit">
                                <button className="flex flex-col justify-center items-center font-semibold text-gray-900 px-[20px] py-[12px] bg-white hover:bg-slate-100 w-[200px] h-[150px] rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                                    <PencilSquareIcon className="h-7 w-7 mb-2" />
                                    <h3 className="text-[14px] font-semibold">Edit Account Info</h3>
                                </button>
                            </Link>
                            <Link href="/account/changepassword">
                                <button className="flex flex-col justify-center items-center font-semibold text-gray-900 px-[20px] py-[12px] bg-white hover:bg-slate-100 w-[200px] h-[150px] rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                                    <LockClosedIcon className="h-7 w-7 mb-2" />
                                    <h3 className="text-[14px] font-semibold">Change Password</h3>
                                </button>
                            </Link>
                            <Link href="/account/wishlist">
                                <button className="flex flex-col justify-center items-center font-semibold text-gray-900 px-[20px] py-[12px] bg-white hover:bg-slate-100 w-[200px] h-[150px] rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                                    <HeartIcon className="h-7 w-7 mb-2" />
                                    <h3 className="text-[14px] font-semibold">Wishlist</h3>
                                </button>
                            </Link>
                            <Link href="/account/orders">
                                <button className="flex flex-col justify-center items-center font-semibold text-gray-900 px-[20px] py-[12px] bg-white hover:bg-slate-100 w-[200px] h-[150px] rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                                    <ClipboardDocumentListIcon className="h-7 w-7 mb-2" />
                                    <h3 className="text-[14px] font-semibold">Orders</h3>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
