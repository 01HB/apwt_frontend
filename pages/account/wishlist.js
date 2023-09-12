import axios from 'axios';
import Layout from '../components/layout';
import WLProductCard from '../components/wlproductcard';
import { useState } from 'react';
import AccSession from '../components/session';

export default function Wishlist({ products }) {
    const [allproducts, setAllProducts] = useState(products);

    const handleRemove = async (p_id) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to remove the item from wishlist?"
            );

            if (confirmed) {
                const response = await axios.delete(`http://localhost:3030/account/wishlist/remove/${p_id}`);
                console.log(response.data);
                setAllProducts(allproducts.filter((product) => product.wi_product_id !== p_id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <AccSession />
            <Layout title={`Wishlist - AG&G`}>
                <section className='bg-gradient-to-b from-indigo-100 to-fuchsia-100'>
                    <div className="flex flex-col items-center w-full min-h-screen py-[55px]">
                        <div className="flex justify-center items-center w-full h-[250px] bg-slate-400">
                            <div className="flex flex-col justify-center items-center w-full h-full backdrop-filter backdrop-brightness-[.3]">
                                <h1 className="font-[600] text-3xl text-white">Your Wishlist</h1>
                            </div>
                        </div>

                        <div className="w-full p-8 justify-items-center grid md:grid-cols-[repeat(2,_minmax(250px,_1fr))] lg:grid-cols-[repeat(3,_minmax(250px,_1fr))] xl:grid-cols-[repeat(4,_minmax(250px,_1fr))] 2xl:grid-cols-[repeat(5,_minmax(250px,_1fr))] grid-cols-[repeat(1,_minmax(250px,_1fr))] gap-7">
                            {
                                (allproducts.length > 0) &&
                                allproducts.map((item) => {
                                    const product = {
                                        p_id: item.wi_product_id,
                                        p_name: item.wi_name,
                                        p_price: item.wi_price,
                                        p_image: item.wi_image,
                                    };
                                    return (
                                        <WLProductCard key={product.p_id} handleclick={handleRemove} product={product} />
                                    );
                                })
                            }
                        </div>
                        {
                            (allproducts.length === 0) &&
                            <div className="flex justify-center items-center w-full h-fit p-4">
                                <h2 className="font-[600] text-2xl text-gray-700">Wishlist is empty</h2>
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {

    const response = await axios.get(`http://localhost:3030/account/wishlist`);
    const products = response.data;

    return { props: { products } };
}
