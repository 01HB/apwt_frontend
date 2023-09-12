import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Layout from './components/layout';
import ProductCard from './components/productcard';

export default function Home() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3030');
    setProducts(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    try {
      fetchProducts();
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  const categories = [
    { name: 'iPhone', href: '/products/category/iPhone', src: 'cat_iphn' },
    { name: 'iPad Pro', href: '/products/category/iPad-Pro', src: 'cat_iPad_Pro' },
    { name: 'MacBook', href: '/products/category/MacBook', src: 'cat_macbook' },
    { name: 'Apple Watch', href: '/products/category/Apple-Watch', src: 'cat_apple_watch' },
    { name: 'iPad Air', href: '/products/category/iPad-Air', src: 'cat_iPad_Air' },
    { name: 'iMac', href: '/products/category/iMac', src: 'cat_iMac' },
  ];


  return (
    <>
      <Layout title="Home - AG&G">
        <section className='bg-gradient-to-b from-indigo-100 to-fuchsia-100'>
          <div className="flex flex-col justify-center items-center w-full min-h-screen py-[55px]">
            <div className="flex justify-center items-center w-full h-[400px] bg-fixed bg-cover bg-center bg-[url('/apple_header.jpg')]">
              <div className="flex flex-col justify-center items-center w-full h-full backdrop-filter backdrop-brightness-[.3]">
                <h1 className="font-[600] text-5xl text-white">Apple Gadgets & Gears</h1>
                <h2 className="font-[500] text-sm text-white mt-3">A Home of Apple Products</h2>
              </div>
            </div>

            <div className="flex flex-col mt-5 justify-center items-center w-full min-h-[260px] bg-white">
              <div className="justify-items-center p-4 w-full h-full grid md:grid-cols-[repeat(3,_minmax(150px,_1fr))] lg:grid-cols-[repeat(4,_minmax(150px,_1fr))] xl:grid-cols-[repeat(6,_minmax(150px,_1fr))] grid-cols-[repeat(2,_minmax(150px,_1fr))] gap-5">
                { categories.map((item) => (
                  <div key={item.src} className="flex justify-center items-center w-fit">
                    <Link href={item.href} className="group/myimg flex flex-col justify-center items-center">
                      <div className='w-[150px] h-[150px] flex justify-center items-center overflow-clip rounded-full m-2 bg-white border-[3px] border-indigo-400'>
                        <Image src={`/${item.src}.png`} alt="..." width="180" height="180" className="transition duration-[800ms] transform group-hover/myimg:scale-110 object-cover" />
                      </div>
                      <div className="bg-transparent flex justify-center items-center h-10 w-fit px-8 py-4 mx-2 hover:bg-gray-800 text-gray-900 hover:text-white transition duration-[300ms] rounded-[5px]">
                        <h3 className="font-semibold text-[14px] leading-5">{item.name}</h3>
                      </div>
                    </Link>
                  </div>
                  ))
                }
              </div>
            </div>

            <div className="w-full p-8 justify-items-center grid md:grid-cols-[repeat(2,_minmax(250px,_1fr))] lg:grid-cols-[repeat(3,_minmax(250px,_1fr))] xl:grid-cols-[repeat(4,_minmax(250px,_1fr))] 2xl:grid-cols-[repeat(5,_minmax(250px,_1fr))] grid-cols-[repeat(1,_minmax(250px,_1fr))] gap-7">
              {products.map((product) => (
                <ProductCard key={product.p_id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
