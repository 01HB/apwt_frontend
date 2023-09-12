import axios from 'axios';
import Layout from '../../components/layout';
import ProductCard from '../../components/productcard';

export default function ProductsCategory({ category, products }) {

    return (
        <>
            <Layout title={`category ${category} - AG&G`}>
                <section className='bg-gradient-to-b from-indigo-100 to-fuchsia-100'>
                    <div className="flex flex-col justify-center items-center w-full min-h-screen py-[55px]">
                        <div className="flex justify-center items-center w-full h-[400px] bg-fixed bg-cover bg-center bg-[url('/apple_header.jpg')]">
                            <div className="flex flex-col justify-center items-center w-full h-full backdrop-filter backdrop-brightness-[.3]">
                                <h1 className="font-[600] text-3xl text-white">Choose your {category}</h1>
                            </div>
                        </div>

                        <div className="w-full p-8 justify-items-center grid md:grid-cols-[repeat(2,_minmax(250px,_1fr))] lg:grid-cols-[repeat(3,_minmax(250px,_1fr))] xl:grid-cols-[repeat(4,_minmax(250px,_1fr))] 2xl:grid-cols-[repeat(5,_minmax(250px,_1fr))] grid-cols-[repeat(1,_minmax(250px,_1fr))] gap-7">
                            {
                                (products.length > 0) &&
                                products.map((product) => (
                                    <ProductCard key={product.p_id} product={product} />
                                ))
                            }
                        </div>
                        {
                            (products.length === 0) &&
                            <div className="flex justify-center items-center w-full h-fit p-4">
                                <h2 className="font-[600] text-2xl text-gray-700">Nothing to show</h2>
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const category = context.params.category;

    const response = await axios.get(`http://localhost:3030/products/category/${category}`);
    const products = response.data;

    return { props: { category, products } };
}
