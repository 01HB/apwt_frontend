import Link from "next/link"
import Image from "next/image";
import NewHead from "./components/newhead";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();


    return (
        <>
            <NewHead title="Error - 404" />
            <div className="flex flex-col p-4 justify-center items-center h-screen w-full">
                <Image src="/minions.png" alt="me" width="150" height="150" />
                <h3 className="mt-2 text-5xl font-extrabold text-[#112b35] tracking-widest">404</h3>
                <span className="my-2 font-[600] text-xl">Page Not Found</span>
                <Link href="/">
                    <button type="button" onClick={() => router.back()} className="mt-8 px-8 py-2 rounded-[8px] font-semibold text-base text-white bg-purple-600 hover:bg-purple-800">
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
}
