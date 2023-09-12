import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../components/layout';
import AccSession from '../components/session';
import Image from 'next/image';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';


export default function ChangePassword() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const [statusmsg, setStatusMsg] = useState('');
    const [successmsg, setSuccessMsg] = useState('');
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

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('password', data.password);
        formData.append('new_password', data.new_password);
        formData.append('confirm_password', data.confirm_password);

        try {
            const response = await axios.patch("http://localhost:3030/account/change-pass",
                formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data == 'current password is incorrect' || response.data == 'new password cannot be same as current') {
                setSuccessMsg('');
                setStatusMsg(response.data);
            } else if (response.data == 'password changed') {
                setStatusMsg('');
                setSuccessMsg(response.data);
                reset();
                setTimeout(() => {
                    router.push('/account');
                }, 2000);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            setStatusMsg("Something went wrong!");
        }
    };

    const new_password = watch('new_password', '');

    return (
        <>
            <AccSession />
            <Layout title="Change Password - AG&G">
                <section className="bg-gradient-to-b from-indigo-100 to-fuchsia-100">
                    <div className="flex md:flex-row flex-col justify-center md:items-start items-center w-full min-h-screen py-[55px] px-[40px]">
                        <div className='flex flex-col w-[300px] py-[30px] items-center'>
                            <div className="w-[200px] h-[200px] flex justify-center items-center overflow-clip rounded-full m-2 bg-white border-[2px] border-neutral-500">
                                <Image src="/cat_iphn.png" alt="profile_pic" width="250" height="250" className="object-cover origin-center" />
                            </div>
                            <h2 className="text-xl mt-2 font-semibold text-gray-900">{account.name}</h2>
                            <h3 className="text-base mt-2 font-semibold text-gray-900">{account.email}</h3>
                        </div>
                        <div className="relative flex justify-center w-full max-w-[1000px] p-8 rounded-md shadow-xl">
                            <button type="button" onClick={() => router.back()} className="absolute left-4 top-4 px-3 py-1 rounded-[6px] text-white bg-gray-500 hover:bg-violet-600">
                                <ArrowUturnLeftIcon className="h-5 w-5" />
                            </button>
                            <form onSubmit={handleSubmit(onSubmit)} encType="application/json" action="#">
                                <div className='flex flex-col w-[250px] px-3 py-5'>

                                    <label htmlFor="password" className="font-semibold text-sm text-gray-800 pb-1 block">Current Password</label>
                                    <input type="password" id="password" {...register('password', { required: true })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600" />
                                    {
                                        errors.password &&
                                        <div className="flex items-center justify-center">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">current password is required</p>
                                        </div>
                                    }

                                    <label htmlFor="new_password" className="font-semibold text-sm text-gray-800 pb-1 block">New Password</label>
                                    <input type="password" id="new_password" {...register('new_password', { required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!.@>#$%^&*+-_<?])[a-zA-Z\d~!.@>#$%^&*+-_<?]{8,20}$/, })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600" />
                                    {
                                        errors.new_password &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.new_password.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">enter your new password</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[10px] leading-3 pb-2">password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character & length must be between 8-20</p>
                                            }
                                        </div>
                                    }

                                    <label htmlFor="confirm_password" className="font-semibold text-sm text-gray-800 pb-1 block">Confirm New Password</label>
                                    <input type="password" id="confirm_password" {...register('confirm_password', { required: true, validate: (value) => value === new_password || 'new passwords do not match', })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600" />
                                    {
                                        errors.confirm_password &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.confirm_password.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">re-enter your new password</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">{errors.confirm_password.message}</p>
                                            }
                                        </div>
                                    }

                                    <button type="submit" className="bg-violet-600 hover:bg-violet-800 mt-6 transition-all w-full text-white text-[14px] font-bold py-2 px-4 rounded-md">Change Password</button>
                                    {
                                        statusmsg &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 py-2">{statusmsg}</p>
                                        </div>
                                    }
                                    {
                                        successmsg &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-green-700 text-[12px] leading-4 py-2">{successmsg}</p>
                                        </div>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
