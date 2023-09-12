
export default function Modal({ isShown, handleclick, text, children }) {

    return (
        <>
            {
                isShown && (
                    <>
                        <button tabIndex={-2} onClick={handleclick} className="fixed inset-0 w-full h-screen z-[5] cursor-default"></button>
                        <div className="flex flex-col justify-center items-center absolute px-10 py-5 z-[20] left-[10px] -top-[80px] rounded-[8px] bg-gray-700 h-fit md:w-[300px] w-[250px] font-[500] text-white shadow-lg space-y-4 cursor-default">
                            <h3 className="text-[14px] ">{text}</h3>
                            {children}
                        </div>
                    </>
                )
            }
        </>
    );
}
