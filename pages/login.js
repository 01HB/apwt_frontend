import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from './components/layout';
import LoggedinSession from './components/loggedin_session';
import Link from 'next/link';

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errormsg, setErrormsg] = useState('');
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3030/login',
                {
                    email: data.l_email,
                    password: data.l_pass
                }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (response.data == 'incorrect password' || response.data == 'email does not exist') {
                setErrormsg(response.data);
            } else {
                sessionStorage.setItem('email', response.data);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            setErrormsg("Something went wrong!");
        }
    };

    return (
        <>
            <LoggedinSession />
            <Layout title="Login - AG&G">
                <section className="bg-cover bg-center bg-[url('/apple_bg.jpg')]">
                    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-black bg-opacity-60">
                        <div className='flex w-full mt-[100px] justify-center'>
                            <h1 className="text-2xl font-semibold text-neutral-50">Welcome Back</h1>
                        </div>
                        <div className="bg-slate-100 w-80 h-auto 2xl:w-[400px] p-8 border rounded-md shadow-lg mt-4 mb-[70px]">
                            <form onSubmit={handleSubmit(onSubmit)} encType="application/json" action="#">
                                <div className='flex flex-col'>

                                    <label htmlFor="l_email" className="font-semibold text-sm text-gray-800 pb-1 block">Email</label>
                                    <input type="email" id="l_email" {...register('l_email', { required: true })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.l_email &&
                                        <div className="flex items-center justify-center">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-5">email is required</p>
                                        </div>
                                    }

                                    <div className='pb-1 flex items-center justify-between'>
                                        <label htmlFor="l_pass" className="font-semibold text-sm text-gray-800 block">Password</label>
                                        <Link href="#" className='font-semibold text-sm text-violet-600 block'>Forgot password?</Link>
                                    </div>
                                    <input type="password" id="l_pass" {...register('l_pass', { required: true })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.l_pass &&
                                        <div className="flex items-center justify-center">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-3">password is required</p>
                                        </div>
                                    }

                                    <button type="submit" className="bg-violet-600 hover:bg-violet-800 mt-6 transition-all w-full text-white text-[16px] font-bold py-2 px-4 rounded-md">Login</button>
                                    {
                                        errormsg &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 py-2">{errormsg}</p>
                                        </div>
                                    }
                                    <div className='flex w-full mt-4 mb-1 justify-center'>
                                        <h4 className='font-semibold text-sm text-gray-700 py-2'>Don&apos;t have an account?&nbsp;&nbsp;<Link href="/signup" className='text-violet-600'>Sign up</Link></h4>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
