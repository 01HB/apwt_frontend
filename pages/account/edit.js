import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Layout from '../components/layout';
import AccSession from '../components/session';
import Image from 'next/image';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';


export default function EditAccount() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const [statusmsg, setStatusMsg] = useState('');
    const [successmsg, setSuccessMsg] = useState('');
    const [account, setAccount] = useState({});

    useEffect(() => {

        const fetchAccInfo = async () => {
            const session = sessionStorage.getItem('email');

            if (session) {
                const response = await axios.get("http://localhost:3030/account/info");
                console.log(response.data);
                setAccount(response.data);
                setValue('name', response.data.name);
                setValue('email', response.data.email);
                setValue('contact', response.data.contact);
                setValue('gender', response.data.gender);
                setValue('address', response.data.address);
            }
        };
        try {
            fetchAccInfo();
        }
        catch (error) {
            console.error(error);
        }
    }, [setValue]);

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        formData.append('photo', data.photo[0]);

        try {
            const response = await axios.patch("http://localhost:3030/account/info/update",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data == 'email already exists, use another') {
                setSuccessMsg('');
                setStatusMsg(response.data);
            } else if (response.data == 'account updated successfully') {
                setStatusMsg('');
                setSuccessMsg(response.data);
                setTimeout(() => {
                    setSuccessMsg('');
                }, 3000);
            } else {
                sessionStorage.setItem('email', response.data);
                setStatusMsg('');
                setSuccessMsg('account updated with new email');
                setTimeout(() => {
                    setSuccessMsg('');
                }, 3000);
            }
        }
        catch (error) {
            console.log(error.response.data.message);
            setStatusMsg("Something went wrong!");
        }
    };

    const validateFile = (value) => {
        if (value.length > 0) {
            const file = value[0];
            const allowed = ["image/jpg", "image/png", "image/jpeg"];

            if (!allowed.includes(file.type)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    return (
        <>
            <AccSession />
            <Layout title="Edit Account Info - AG&G">
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
                            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#">
                                <div className='flex flex-col lg:w-[500px] w-[275px] px-3 py-5'>

                                    <label htmlFor="photo" className="font-semibold text-sm text-gray-800 pb-1 block">Upload Photo</label>
                                    <input type="file" id="photo" {...register('photo', { validate: validateFile })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full py-2 mb-2 bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-violet-700 hover:file:text-white hover:file:bg-violet-600 file:transition file:duration-[250ms]" />
                                    {
                                        errors.photo &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">only jpeg/jpg/png is allowed</p>
                                        </div>
                                    }

                                    <label htmlFor="name" className="font-semibold text-sm text-gray-800 pb-1 block">Name</label>
                                    <input type="text" id="name" {...register('name', { required: true, pattern: /^[A-Z][a-zA-Z]*(?:\s[a-zA-Z]*)*$/ })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600 transition-[font-size,color] duration-150" />
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
                                    <input type="email" id="email" {...register('email', { required: true })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600 transition-[font-size,color] duration-150" />
                                    {
                                        errors.email &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">email is required</p>
                                        </div>
                                    }

                                    <label htmlFor="contact" className="font-semibold text-sm text-gray-800 pb-1 block">Contact</label>
                                    <input type="text" id="contact" {...register('contact', { required: true, pattern: /^(\+880|0)(1[3-9]\d{8})$/ })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full p-2 mb-2 border-b-2 bg-transparent border-gray-400 focus:outline-0 focus:border-violet-600 transition-[font-size,color] duration-150" />
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
                                            <label className="ml-2 font-semibold text-[13px] text-stone-950 focus:text-[14px] hover:text-violet-700">Male</label>
                                        </div>
                                        <div className="flex justify-center items-center w-fit h-fit">
                                            <input type="radio" name="gender" value="female" {...register('gender', { required: true })} className="leading-tight checked:accent-violet-600" />
                                            <label className="ml-2 font-semibold text-[13px] text-stone-950 focus:text-[14px] hover:text-violet-700">Female</label>
                                        </div>
                                        <div className="flex justify-center items-center w-fit h-fit">
                                            <input type="radio" name="gender" value="other" {...register('gender', { required: true })} className="leading-tight checked:accent-violet-600" />
                                            <label className="ml-2 font-semibold text-[13px] text-stone-950 focus:text-[14px] hover:text-violet-700">Other</label>
                                        </div>
                                    </div>
                                    {
                                        errors.gender &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">gender is required</p>
                                        </div>
                                    }

                                    <label htmlFor="address" className="font-semibold text-sm text-gray-800 pb-1 block">Address</label>
                                    <textarea id="address" rows="2" {...register('address')} className="w-full bg-transparent border-t-2 border-b-2 border-gray-400 focus:border-violet-600 focus:caret-violet-500 font-[600] text-[13px] outline-0 text-stone-950 py-1 px-3 leading-8 transition duration-300 ease-in-out" />


                                    <button type="submit" className="bg-violet-600 hover:bg-violet-800 mt-6 transition-all w-fit text-white text-[14px] font-bold py-2 px-10 rounded-md">Update</button>
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
