import Link from "next/link";
import Image from "next/image";
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function WLProductCard({ handleclick, product }) {

    const handleRemove = () => {
        handleclick(product.p_id);
    };

    return (
        <>
            <div className="relative flex flex-col justify-center items-center w-fit h-fit bg-transparent">
                <button type="button" onClick={handleRemove} className="absolute top-[5px] right-[15px] p-1 rounded-full z-10">
                    <XCircleIcon className="h-6 w-6 text-gray-600 hover:text-violet-600" />
                </button>
                <Link href={`/products/${product.p_id}`}>
                    <div className="flex justify-center items-center overflow-clip bg-white hover:bg-purple-100 w-[250px] h-[250px] rounded-[10px] shadow-md hover:shadow-lg transition duration-300">
                        <Image src={`http://localhost:3030/productimages/${product.p_image}`} alt="product" width={275} height={275} className="transition duration-[800ms] transform hover:scale-110 object-contain origin-center" />
                    </div>
                </Link>
                <div className="flex flex-col justify-center w-[275px] h-fit p-5">
                    <Link href={`/products/${product.p_id}`}>
                        <h4 className="font-semibold text-left text-[16px] leading-7 overflow-hidden text-gray-950 hover:text-sky-700 transition duration-200">{product.p_name}</h4>
                    </Link>
                    <h4 className="font-[500] text-left text-[15px] leading-4 overflow-hidden text-gray-700">Tk {product.p_price}</h4>
                </div>
            </div>
        </>
    );
}
