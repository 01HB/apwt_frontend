import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from './components/layout';
import LoggedinSession from './components/loggedin_session';
import Link from 'next/link';


export default function SignupPage() {
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

    const onSubmit = async (data) => {
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirm_password', data.confirm_password);
        formData.append('contact', data.contact);
        formData.append('gender', data.gender);

        try {
            const response = await axios.post("http://localhost:3030/signup",
                formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data == 'email already exists') {
                setSuccessMsg('');
                setStatusMsg(response.data);
            } else {
                setStatusMsg('');
                setSuccessMsg('signed up successfully');
                reset();
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            setStatusMsg("Something went wrong!");
        }
    };

    const password = watch('password', '');

    return (
        <>
            <LoggedinSession />
            <Layout title="Signup - AG&G">
                <section className="bg-fixed bg-cover bg-center bg-[url('/apple_bg.jpg')]">
                    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-black bg-opacity-60">
                        <div className='flex w-full mt-[100px] justify-center'>
                            <h1 className="text-2xl font-semibold text-neutral-50">Create Account</h1>
                        </div>
                        <div className="bg-slate-100 w-[350px] h-auto 2xl:w-[420px] p-8 rounded-md shadow-lg mt-4 mb-[70px]">
                            <form onSubmit={handleSubmit(onSubmit)} encType="application/json" action="#">
                                <div className='flex flex-col'>

                                    <label htmlFor="name" className="font-semibold text-sm text-gray-800 pb-1 block">Name</label>
                                    <input type="text" id="name" {...register('name', { required: true, pattern: /^[A-Z][a-zA-Z]*(?:\s[a-zA-Z]*)*$/ })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.name &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.name.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">name is required</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[10px] leading-3 pb-2">first character must be capital, only alphabets & spaces are allowed</p>
                                            }
                                        </div>
                                    }

                                    <label htmlFor="email" className="font-semibold text-sm text-gray-800 pb-1 block">Email</label>
                                    <input type="email" id="email" {...register('email', { required: true })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.email &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">email is required</p>
                                        </div>
                                    }

                                    <label htmlFor="password" className="font-semibold text-sm text-gray-800 pb-1 block">Password</label>
                                    <input type="password" id="password" {...register('password', { required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!.@>#$%^&*+-_<?])[a-zA-Z\d~!.@>#$%^&*+-_<?]{8,20}$/, })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.password &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.password.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">password is required</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[10px] leading-3 pb-2">password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character & length must be between 8-20</p>
                                            }
                                        </div>
                                    }

                                    <label htmlFor="confirm_password" className="font-semibold text-sm text-gray-800 pb-1 block">Confirm-Password</label>
                                    <input type="password" id="confirm_password" {...register('confirm_password', { required: true, validate: (value) => value === password || 'passwords do not match', })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.confirm_password &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.confirm_password.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">re-enter the password</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">{errors.confirm_password.message}</p>
                                            }
                                        </div>
                                    }

                                    <label htmlFor="contact" className="font-semibold text-sm text-gray-800 pb-1 block">Contact</label>
                                    <input type="text" id="contact" {...register('contact', { required: true, pattern: /^(\+880|0)(1[3-9]\d{8})$/ })} className="font-[600] text-[13px] leading-4 text-gray-700 w-full p-2 mb-2 border-2 rounded-md focus:outline-1 focus:outline-violet-400" />
                                    {
                                        errors.contact &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            {
                                                errors.contact.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">contact is required</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[10px] leading-3 pb-2">invalid Bangladeshi number</p>
                                            }
                                        </div>
                                    }

                                    <label htmlFor="gender" className="font-semibold text-sm text-gray-800 pb-1 block">Gender</label>
                                    <div id="gender" className="w-full pt-1 pb-2 mb-2 flex justify-evenly items-center">
                                        <div className="flex justify-center items-center w-fit h-fit">
                                            <input type="radio" name="gender" value="male" {...register('gender', { required: true })} className="leading-tight checked:accent-violet-600" />
                                            <label className="ml-2 font-semibold text-[13px] text-gray-800 hover:text-violet-700">Male</label>
                                        </div>
                                        <div className="flex justify-center items-center w-fit h-fit">
                                            <input type="radio" name="gender" value="female" {...register('gender', { required: true })} className="leading-tight checked:accent-violet-600" />
                                            <label className="ml-2 font-semibold text-[13px] text-gray-800 hover:text-violet-700">Female</label>
                                        </div>
                                        <div className="flex justify-center items-center w-fit h-fit">
                                            <input type="radio" name="gender" value="other" {...register('gender', { required: true })} className="leading-tight checked:accent-violet-600" />
                                            <label className="ml-2 font-semibold text-[13px] text-gray-800 hover:text-violet-700">Other</label>
                                        </div>
                                    </div>
                                    {
                                        errors.gender &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">gender is required</p>
                                        </div>
                                    }

                                    <button type="submit" className="bg-violet-600 hover:bg-violet-800 mt-6 transition-all w-full text-white text-[16px] font-bold py-2 px-4 rounded-md">Sign Up</button>
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
                                    <div className='flex w-full mt-4 mb-1 justify-center'>
                                        <h4 className='font-semibold text-sm text-gray-700 py-2'>Already have an account?&nbsp;&nbsp;<Link href="/login" className='text-violet-600'>Login</Link></h4>
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
