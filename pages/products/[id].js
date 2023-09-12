import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import Image from 'next/image';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/24/solid';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import Modal from '../components/modal';


export default function Product({ data }) {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [modalmsg, setModalmsg] = useState('');
    const [cartmodal, setCartModal] = useState(false);
    const [cartmodalmsg, setCartModalmsg] = useState('');
    const [wlbutton, setWlButton] = useState(false);

    useEffect(() => {

        const fetchwldata = async () => {
            const session = sessionStorage.getItem('email');
            if (session) {
                const wli_status = await axios.get(`http://localhost:3030/account/wishlist/check/${data.p_id}`);
                if (wli_status.data) {
                    setWlButton(true);
                }
            }
        };
        try {
            fetchwldata();
        } catch (error) {
            console.error(error);
        }
    }, [data.p_id]);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quantity: 1,
        },
    });

    const handleWishlist = async (event) => {
        event.preventDefault();
        try {
            const session = sessionStorage.getItem('email');

            if (!session) {
                setModal(true);
                setModalmsg('Please login to add to wishlist');
                setTimeout(() => {
                    setModal(false);
                    setModalmsg('');
                }, 3000);
            } else {
                const response = await axios.post(`http://localhost:3030/account/wishlist/add/${data.p_id}`);
                console.log(response.data);
                setModal(true);
                setModalmsg(response.data);
                if (!wlbutton) {
                    setWlButton(true);
                }
                setTimeout(() => {
                    setModal(false);
                    setModalmsg('');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (cartdata) => {

        try {
            const session = sessionStorage.getItem('email');

            if (!session) {
                setCartModal(true);
                setCartModalmsg('Please login to add to cart');
                setTimeout(() => {
                    setCartModal(false);
                    setCartModalmsg('');
                }, 3000);
            } else {
                const response = await axios.post(`http://localhost:3030/cart/add/${data.p_id}`,
                    {
                        quantity: cartdata.quantity,
                    });
                console.log(response.data);
                setCartModal(true);
                setCartModalmsg(response.data);
                setTimeout(() => {
                    setCartModal(false);
                    setCartModalmsg('');
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateQuantity = (value) => {
        if (value < 1) {
            return 'quantity must be greater than 0';
        } else if (value > data.p_stock) {
            return 'sorry! insufficient stock';
        } else {
            return true;
        }
    };

    const closeModal = () => {
        setModal(false);
        setModalmsg('');
    };

    const closeCartModal = () => {
        setCartModal(false);
        setCartModalmsg('');
    };

    return (
        <>
            <Layout title={`${data.p_name} - AG&G`}>
                <section className="bg-gradient-to-b from-indigo-100 to-fuchsia-100">
                    <div className="flex md:flex-row flex-col justify-center md:items-start items-center w-full min-h-screen py-[55px] px-[40px]">
                        <div className="relative flex justify-center items-center overflow-hidden lg:w-[500px] lg:h-[500px] w-[300px] h-[300px] py-5 mt-[50px] mr-0 md:mr-5 rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                            <button type="button" onClick={() => router.back()} className="absolute z-10 top-[0px] left-0 px-3 py-1 rounded-br-[10px] rounded-tl-[10px] text-white bg-gray-500 hover:bg-violet-600">
                                <ArrowUturnLeftIcon className="h-5 w-5" />
                            </button>
                            <Image src={`http://localhost:3030/productimages/${data.p_image}`} alt="product" width={500} height={500} className="object-contain origin-center hover:scale-105 transition-transform duration-[650ms]" />
                        </div>
                        <div className="flex flex-col p-5 mt-5 lg:w-full w-[300px] max-w-[450px] rounded-lg">
                            <h3 className="font-semibold text-left text-[24px] leading-7 mt-7 overflow-hidden text-gray-900">{data.p_name}</h3>
                            <h3 className="font-semibold text-left text-[20px] leading-8 mt-2 overflow-hidden text-emerald-900">Tk {data.p_price}</h3>
                            <h3 className="font-semibold text-left text-[14px] leading-4 my-10 overflow-hidden text-gray-700">{data.p_description}</h3>
                            <h3 className="font-semibold text-left text-[16px] leading-8 mt-5 overflow-hidden">
                                {
                                    data.p_stock > 0 ?
                                        <span className="text-gray-800">In Stock</span>
                                        :
                                        <span className="text-red-500">Out of Stock</span>
                                }
                            </h3>
                            <div className="relative flex">
                                {
                                    wlbutton ?
                                        (<button type="button" onClick={() => router.push('/account/wishlist')} className="flex w-fit h-fit text-slate-900 hover:text-white bg-transparent hover:bg-slate-900 border-[2px] border-slate-900 mt-6 transition-colors duration-[400ms] py-2 px-2 rounded-full">
                                            <span className="font-semibold text-[16px] px-2">Browse wishlist</span>
                                            <HeartIcon className="pr-1 h-6 w-6" />
                                        </button>) :
                                        (<button type="button" onClick={handleWishlist} className="flex w-fit h-fit text-slate-900 hover:text-white bg-transparent hover:bg-slate-900 border-[2px] border-slate-900 mt-6 transition-colors duration-[400ms] py-2 px-2 rounded-full">
                                            <span className="font-semibold text-[16px] px-2">Add to wishlist</span>
                                            <HeartIcon className="pr-1 h-6 w-6" />
                                        </button>)
                                }
                                <Modal isShown={modal} handleclick={closeModal} text={modalmsg} />
                            </div>
                            <div className="relative flex">
                                <Modal isShown={cartmodal} handleclick={closeCartModal} text={cartmodalmsg} />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-fit h-fit">
                                <input type="number" id="quantity" {...register('quantity', { required: "enter a quantity", validate: validateQuantity })} className="w-[100px] font-[600] text-[16px] text-gray-800 text-center bg-transparent border-2 border-gray-700 focus:outline-0 focus:border-violet-600 px-3 py-1 rounded-full mt-4 transition-colors duration-[400ms]" />
                                {
                                    errors.quantity && <p className="font-semibold text-red-700 text-[12px] leading-4 py-2">{errors.quantity.message}</p>
                                }
                                <button type="submit" className="flex justify-center w-[200px] h-fit text-white bg-violet-600 hover:bg-violet-800 mt-4 transition-colors duration-[400ms] py-2 px-3 rounded-[8px]">
                                    <span className="font-semibold text-[16px] px-2">Add to Cart</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;

    const response = await axios.get(`http://localhost:3030/products/${id}`);
    const data = response.data;

    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        };
    }

    return { props: { data } };
}
