import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AccSession from "../components/session";
import Layout from "../components/layout";
import axios from "axios";
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function Checkout({ cartdata }) {

    const router = useRouter();
    const [cartproducts, setCartProducts] = useState(cartdata);
    let itemnames = [];
    let carttotal = 0;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [statusmsg, setStatusMsg] = useState('');

    const onSubmit = async (data) => {

        try {
            const checkoutinfo = {
                o_items: itemnames,
                o_amount: carttotal,
                o_email: data.email,
                o_contact: data.contact,
                o_address: data.address,
            };

            sessionStorage.setItem('checkoutinfo', JSON.stringify(checkoutinfo));
            router.push('/checkout/confirm');
        }
        catch (error) {
            console.log(error.response.data.message);
            setStatusMsg("Something went wrong!");
        }
    };

    return (
        <>
            <AccSession />
            <Layout title={`Checkout - AG&G`}>
                <section className="lg:bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-gradient-to-t">
                    <div className="flex flex-row-reverse max-lg:flex-col lg:justify-center max-lg:items-center w-full min-h-screen py-[55px]">
                        <div className="flex flex-col lg:items-start items-center lg:w-full w-[320px] lg:min-h-screen h-fit px-[20px] py-[25px] bg-slate-300">
                            {
                                <>
                                    {cartproducts.map((item) => {
                                        carttotal += parseInt(item.ci_total);
                                        itemnames.push(item.ci_name);
                                        return (
                                            <div key={item.ci_product_id} className="flex justify-between w-11/12 max-w-[600px] h-fit mb-3">
                                                <div className="flex justify-center min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] rounded-[8px] overflow-hidden">
                                                    <Image src={`http://localhost:3030/productimages/${item.ci_image}`} alt="..." width="60" height="60" className="object-cover" />
                                                </div>
                                                <div className="flex flex-col items-start w-full px-3">
                                                    <h4 className="font-[600] text-[14px] leading-4 text-gray-800">{item.ci_name}</h4>
                                                </div>
                                                <div className="flex justify-end items-center w-full h-fit px-2 py-2">
                                                    <h4 className="font-[600] text-[14px] leading-4 text-gray-800">{item.ci_quantity} × {item.ci_price} BDT</h4>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <hr className="w-11/12 max-w-[600px] h-[2px] bg-gray-500 mb-5 mt-5" />
                                    <div className="flex justify-between w-11/12 max-w-[600px] h-fit mb-3 px-2">
                                        <h3 className="font-[600] text-[15px] leading-4 text-gray-800">Total</h3>
                                        <h3 className="font-[600] text-[15px] leading-4 text-emerald-800">{carttotal} BDT</h3>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="flex flex-col lg:items-end items-center lg:w-full w-[320px] lg:min-h-screen h-fit px-[20px] py-[25px] bg-slate-100">
                            <form onSubmit={handleSubmit(onSubmit)} encType="application/json" action="#" className="w-11/12 max-w-[600px]">
                                <div className="flex flex-col px-3 py-5">

                                    <label htmlFor="email" className="font-semibold text-sm text-gray-800 pb-1 block">Email<span className="font-normal text-base text-red-600"> *</span></label>
                                    <input type="email" id="email" {...register('email', { required: true })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full p-2 mb-1 border-b-2 bg-transparent border-gray-300 focus:outline-0 focus:border-violet-600 transition duration-300" />
                                    {
                                        errors.email &&
                                        <div className="flex items-center justify-center w-full h-fit my-1 overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">email is required</p>
                                        </div>
                                    }

                                    <label htmlFor="contact" className="font-semibold text-sm text-gray-800 mt-7 pb-1 block">Contact<span className="font-normal text-base text-red-600"> *</span></label>
                                    <input type="text" id="contact" {...register('contact', { required: true, pattern: /^(\+880|0)(1[3-9]\d{8})$/ })} className="font-[600] text-[13px] leading-4 text-stone-950 w-full p-2 mb-1 border-b-2 bg-transparent border-gray-300 focus:outline-0 focus:border-violet-600 transition duration-300" />
                                    {
                                        errors.contact &&
                                        <div className="flex items-center justify-center w-full h-fit my-1 overflow-hidden">
                                            {
                                                errors.contact.type === 'required' ?
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">contact is required</p>
                                                    :
                                                    <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">invalid Bangladeshi number</p>
                                            }
                                        </div>
                                    }

                                    
                                    <label htmlFor="address" className="font-semibold text-sm text-gray-800 mt-7 pb-1 block">Address<span className="font-normal text-base text-red-600"> *</span></label>
                                    <textarea id="address" rows="3" {...register('address', { required: "please provide a shipping address" })} className="w-full bg-transparent rounded-[8px] border-2 border-gray-300 focus:border-violet-600 focus:caret-violet-500 font-[600] text-[13px] outline-0 text-stone-950 mb-1 py-1 px-3 leading-8 transition duration-300 ease-in-out" />
                                    {
                                        errors.address &&
                                        <div className="flex items-center justify-center w-full h-fit my-1 overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 pb-2">{errors.address.message}</p>
                                        </div>
                                    }


                                    <div className="flex w-full justify-end max-lg:justify-center">
                                        <button type="submit" className="bg-violet-600 hover:bg-violet-800 mt-[60px] transition-all w-fit text-white text-[14px] font-bold py-2 px-7 rounded-md">Continue</button>
                                    </div>
                                    {
                                        statusmsg &&
                                        <div className="flex items-center justify-center w-full h-fit overflow-hidden">
                                            <p className="font-semibold text-red-700 text-[12px] leading-4 py-2">{statusmsg}</p>
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


export async function getServerSideProps() {

    const response = await axios.get(`http://localhost:3030/checkout`);
    const cartdata = response.data;

    if (cartdata === false) {
        return {
            redirect: {
                destination: '/cart',
                permanent: false,
            },
        };
    }

    return { props: { cartdata } };
}
