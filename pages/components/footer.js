import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <div className="bg-gradient-to-b from-[#300e5f] to-[#50128b] h-fit">
                <div className="m-auto px-6 py-3 flex flex-col justify-between items-center">
                    <div className="w-full mt-8 flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-4">
                        <div className="flex md:flex-row flex-col md:pl-24 md:pr-8 px-8 md:justify-evenly justify-center items-center md:gap-10 gap-4">
                            <Link href="#"><h3 className="text-[13px] font-[500] text-neutral-50 block">Terms of services</h3></Link>
                            <Link href="#"><h3 className="text-[13px] font-[500] text-neutral-50 block">Privacy policy</h3></Link>
                            <Link href="#"><h3 className="text-[13px] font-[500] text-neutral-50 block">Our Stores</h3></Link>
                        </div>

                        <div className="flex md:pl-8 md:pr-24 px-8 justify-evenly items-center gap-10">
                            <Link href="#"><Image src="/facebook-48.png" alt="..." width="30" height="30" className="filter drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_2px_3px_rgba(255,255,255,0.95)] transition duration-200" /></Link>
                            <Link href="#"><Image src="/instagram-48.png" alt="..." width="30" height="30" className="filter drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_2px_3px_rgba(255,255,255,0.95)] transition duration-200" /></Link>
                            <Link href="#"><Image src="/github-48.png" alt="..." width="30" height="30" className="filter drop-shadow-[0_2px_5px_rgba(255,255,255,0.8)] hover:drop-shadow-[0_2px_3px_rgba(255,255,255,0.95)] transition duration-200" /></Link>
                        </div>
                    </div>
                    <p className="mt-9 mb-2 text-[10px] font-[400] text-neutral-50">&copy; {new Date().getFullYear()} Apple Gadgets & Gears. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}
