import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../components/layout';
import AccSession from '../components/session';
import CartProductCard from '../components/cartproductcard';


export default function Cart({ products }) {
    const router = useRouter();
    const [allproducts, setAllProducts] = useState(products);

    const handleRemove = async (p_id) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to remove the item from the cart?"
            );

            if (confirmed) {
                const response = await axios.delete(`http://localhost:3030/cart/remove/${p_id}`);
                console.log(response.data);
                setAllProducts(allproducts.filter((product) => product.ci_product_id !== p_id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onqtySubmit = async (qtydata, p_id) => {
        try {
            const response = await axios.patch(`http://localhost:3030/cart/update/${p_id}`,
                {
                    quantity: qtydata.quantity,
                });

            if (response.data) {
                const res = await axios.get(`http://localhost:3030/cart/viewitems`);
                const products = res.data;
                setAllProducts(products);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <AccSession />
            <Layout title={`Shopping Cart - AG&G`}>
                <section className="bg-gradient-to-b from-indigo-100 to-fuchsia-100">
                    <div className="flex flex-col items-center w-full min-h-screen py-[55px]">
                        <div className="flex justify-center items-center w-full h-[150px] backdrop-filter backdrop-brightness-[.3]">
                            <h1 className="font-[600] text-3xl text-white">Shopping Cart</h1>
                        </div>
                        <div className="hidden lg:flex justify-evenly w-full max-w-[1024px] h-fit px-[40px] py-3 mt-3">
                            <h4 className="font-[800] text-[15px] text-left leading-4 mx-2 px-4 text-gray-800 w-full max-w-[340px]">Product</h4>
                            <h4 className="font-[800] text-[15px] text-center leading-4 mx-2 text-gray-800 w-full max-w-[170px]">Price</h4>
                            <h4 className="font-[800] text-[15px] text-center leading-4 mx-2 text-gray-800 w-full max-w-[170px]">Quantity</h4>
                            <h4 className="font-[800] text-[15px] text-center leading-4 mx-2 text-gray-800 w-full max-w-[170px]">Total</h4>
                        </div>
                        <hr className="w-11/12 lg:w-full lg:max-w-[1024px] h-[2px] bg-gray-600 mb-5 mt-5 lg:mt-0" />
                        <div className="w-full px-[40px] py-2 justify-items-center grid grid-cols-[repeat(1,_minmax(260px,_1fr))] gap-2">
                            {
                                (allproducts.length > 0) &&
                                (
                                    <>
                                        {allproducts.map((item) => {
                                            const product = {
                                                p_id: item.ci_product_id,
                                                p_name: item.ci_name,
                                                p_price: item.ci_price,
                                                p_image: item.ci_image,
                                                p_quantity: item.ci_quantity,
                                                p_total: item.ci_total,
                                            };
                                            return (
                                                <CartProductCard key={product.p_id} onqtySubmit={onqtySubmit} handleclick={handleRemove} product={product} />
                                            );
                                        })}
                                        <div className="flex flex-col items-end w-full max-w-[1024px] h-fit px-[40px] py-4">
                                            <h2 className="font-[600] text-[18px] text-gray-700 tracking-wide">SUBTOTAL: {allproducts.reduce((ttl, item) => ttl + item.ci_total, 0)} BDT</h2>
                                            <button type="button" onClick={() => { router.push('/checkout'); }} className="flex justify-center w-[200px] h-fit text-white bg-violet-600 hover:bg-violet-800 mt-4 transition-colors duration-[400ms] py-2 px-3 rounded-[8px]">
                                                <span className="font-semibold text-[16px] px-2">Checkout</span>
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                        {
                            (allproducts.length === 0) &&
                            <div className="flex justify-center items-center w-full h-fit p-4">
                                <h2 className="font-[600] text-2xl text-gray-700">Oops! cart is empty</h2>
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {

    const response = await axios.get(`http://localhost:3030/cart/viewitems`);
    const products = response.data;

    return { props: { products } };
}
