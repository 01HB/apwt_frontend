import Image from "next/image";
import Link from "next/link";
import Option from "./option";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Navpanel() {
    const [hovered, setHovered] = useState(false);

    const handleMouseClick = () => {
        setHovered(!hovered);
    };

    return (
        <>
            <div className="fixed z-[100] top-0 left-0 bg-purple-50 bg-opacity-90 backdrop-filter backdrop-blur-md md:h-[55px] h-[300px] w-full">
                <div className="flex justify-between items-center w-full max-w-[2000px] mx-auto px-10 py-2">
                    <div className="flex justify-center items-center">
                        <Link href="/"><h2 className="font-extrabold text-3xl text-rose-950">AG&G</h2></Link>
                    </div>
                    <div className="font-semibold text-[14px] text-gray-900 mr-2 flex md:flex-row flex-col md:justify-evenly justify-center items-center md:gap-10 gap-4">
                        <Link href="/" className="hover:text-violet-600 transition duration-200">Home</Link>
                        <div className="relative flex">
                            <button className="flex justify-center group" onClick={handleMouseClick}>
                                <span className="group-hover:text-violet-600 transition duration-200 cursor-pointer">Categories</span>
                                <ChevronDownIcon className="h-5 w-5 ml-1 group-hover:text-violet-600 transition duration-200" />
                            </button>
                            {hovered && (
                                <>
                                    <button tabIndex={-1} onClick={handleMouseClick} className="fixed inset-0 w-full h-screen -z-[5] cursor-default"></button>
                                    <div className="flex flex-col justify-center items-center absolute px-10 py-5 z-[5] top-[40px] -left-[110px] rounded-[8px] bg-gray-700 h-fit w-[300px] font-[500] text-white shadow-2xl shadow-black space-y-4">
                                        <Link href="/products/category/iPhone" className="hover:text-violet-400 transition duration-200">iPhone</Link>
                                        <Link href="/products/category/iPad-Pro" className="hover:text-violet-400 transition duration-200">iPad Pro</Link>
                                        <Link href="/products/category/MacBook" className="hover:text-violet-400 transition duration-200">MacBook</Link>
                                        <Link href="/products/category/Apple-Watch" className="hover:text-violet-400 transition duration-200">Apple Watch</Link>
                                        <Link href="/products/category/iPad-Air" className="hover:text-violet-400 transition duration-200">iPad Air</Link>
                                        <Link href="/products/category/iMac" className="hover:text-violet-400 transition duration-200">iMac</Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <Link href="/about" className="hover:text-violet-600 transition duration-200">About</Link>
                        <Option />
                    </div>
                </div>
            </div>
        </>
    );
}
