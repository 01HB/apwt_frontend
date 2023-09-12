import Link from "next/link";
import Image from "next/image";
import { useForm, Controller } from 'react-hook-form';
import { XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from "react";

export default function CartProductCard({ onqtySubmit, handleclick, product }) {
    const [p_total, setTotal] = useState(parseInt(product.p_total));

    const {
        control,
        handleSubmit,
        setValue,
        trigger,
    } = useForm();

    const onSubmit = (data) => {
        onqtySubmit(data, product.p_id);
    };

    const handleChange = async (fieldname, value) => {
        if (value < 1) {
            value = product.p_quantity;
        }
        setValue(fieldname, value);
        setTotal(parseInt(product.p_price) * parseInt(value));
        await trigger(fieldname);
    };

    const handleRemove = () => {
        handleclick(product.p_id);
    };

    const validateQuantity = async (value) => {
        const info = await axios.get(`http://localhost:3030/products/${product.p_id}`);
        const p_stock = info.data.p_stock;
        if (value < 1) {
            return 'invalid quantity';
        } else if (value > p_stock) {
            return 'stock limit exceeded';
        } else {
            return true;
        }
    };

    return (
        <>
            <div className="relative flex flex-col justify-center items-center lg:w-[920px] w-fit h-fit bg-transparent mb-2">
                <button type="button" onClick={handleRemove} className="absolute top-[3px] right-[3px] p-1 rounded-full z-10">
                    <XCircleIcon className="h-7 w-7 text-gray-700 hover:text-red-600" />
                </button>
                <div className="flex lg:flex-row flex-col p-1 lg:justify-between justify-center w-[280px] lg:w-full pr-[60px]">
                    <Link href={`/products/${product.p_id}`} className="flex justify-center w-full max-w-[300px]">
                        <div className="flex justify-center items-center overflow-clip bg-white hover:bg-purple-100 min-w-[130px] min-h-[130px] max-w-[130px] max-h-[130px] rounded-[5px] transition duration-300">
                            <Image src={`http://localhost:3030/productimages/${product.p_image}`} alt="product" width={130} height={130} className="object-contain origin-center" />
                        </div>
                        <h4 className="px-2 py-1 w-full h-fit font-semibold text-[14px] leading-6 text-gray-950 hover:text-sky-700 transition duration-200">{product.p_name}</h4>
                    </Link>
                    <h4 className="font-semibold text-left text-[14px] leading-4 my-2 overflow-hidden text-emerald-800">{product.p_price}</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center w-fit h-fit">
                        <Controller
                            name="quantity"
                            control={control}
                            defaultValue={product.p_quantity}
                            rules={{
                                required: 'required*',
                                validate: validateQuantity,
                            }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="flex justify-center items-center">
                                            <input
                                                type="number"
                                                {...field}
                                                onBlur={(e) => {
                                                    field.onBlur(e);
                                                    handleChange(field.name, e.target.value);
                                                }}
                                                className="w-[80px] font-[600] text-[14px] text-gray-800 text-center bg-transparent border-2 border-gray-700 focus:outline-0 focus:border-violet-600 px-3 py-1 rounded-full transition-colors duration-[400ms]"
                                            />
                                            <button type="submit" className="flex justify-center items-center ml-1 w-fit h-fit text-gray-800 hover:text-violet-500 transform rotate-0 transition-transform duration-[500ms] rounded-full focus:rotate-[180deg]">
                                                <ArrowPathIcon className="h-6 w-6" />
                                            </button>
                                        </div>
                                        {
                                            fieldState.error && <p className="font-semibold text-red-700 text-[11px] leading-4 py-1">{fieldState.error.message}</p>
                                        }
                                    </div>
                                </>
                            )}
                        />
                    </form>
                    <h4 className="font-semibold text-left text-[14px] leading-4 my-2 overflow-hidden text-gray-800">{p_total}</h4>
                </div>
            </div>
        </>
    );
}
