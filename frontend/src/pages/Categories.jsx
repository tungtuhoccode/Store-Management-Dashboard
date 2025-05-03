import React, { use } from 'react'
import { useProductStore } from '../store/useProductStore'
import { useParams } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { motion } from 'framer-motion';
import AddToCartIcon from '../components/AddToCartIcon';

import {  FaBoxOpen } from "react-icons/fa6";


export default function Categories() {
  const { category } = useParams();

  const { fetchCategory, loading, products } = useProductStore();
  React.useEffect(() => {
    fetchCategory(category);
  }, [fetchCategory]);

  return (
    <div>
      <div className='relative'>
        <img
          className='min-w-full max-h-[400px] object-cover'
          style={{ objectPosition: 'center 40%' }}
          src={`/images/${category}PageWallPaper.avif`}
          alt="shop wallpaper" />
        <h1 className='absolute w-screen h-[400px] top-0 flex justify-center items-center font-pacifico md:text-3xl sm:text-2xl text-white'>{category[0].toUpperCase() + category.slice(1)}</h1>
      </div>

      {loading
        ?
        <LoadingScreen />
        :
        <section className='max-w-7xl mx-auto py-16'>
          {products.length === 0 ?
            <div className='max-w-[90%] mx-auto h-[300px] flex flex-col justify-center items-center gap-4 text-center text-gray-600'>
              <FaBoxOpen className='text-6xl' />
              <p className='text-2xl'>We don’t have products in this category right now.</p>
              <p className='text-lg text-gray-500'>Please check back soon or explore other categories!</p>
            </div>



            :
            <div
              className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-16 mx-auto mt-10 max-w-[90%]'>
              {products.map((product, index) => {
                const delayIndex = index % 3; // reset every 3 items
                return (
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: [-30, 0] }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.6 * delayIndex,
                      scale: { duration: 0.6 },
                      boxShadow: { duration: 0.6 },
                    }}
                    viewport={{ once: true, amount: 0.5 }}

                    key={product.id}
                    className='relative group max-h-[530px] rounded-b-lg cursor-pointer'
                    onClick={() => navigate(`/product/${product.id}`)}
                  >


                    <AddToCartIcon productId={product.id} />

                    <img
                      className='w-full max-w-[386px] h-[75%] rounded-t-lg'
                      src={product.image}
                      alt={product.name} />
                    <div className='pt-3 transition-all group-hover:translate-x-2 lg:group-hover:translate-x-3 duration-600'>
                      <h2 className="text-sm sm:text-lg lg:text-xl truncate">{product.name}</h2>

                      <div className='text-xs lg:text-sm text-gray-500'>{product.categories}</div>

                      <div className='text-xs lg:text-sm'>${product.price}</div>

                      <div>{product.stock_quantity}
                        <span className='text-xs lg:text-sm text-gray-500'> in stocks
                        </span>
                      </div>
                    </div>

                  </motion.div>

                )

              })}
            </div>
          }

        </section>
      }


    </div>
  )
}
