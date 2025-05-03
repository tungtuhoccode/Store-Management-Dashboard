import React from 'react'
import { motion } from 'framer-motion'
import { categories } from "../constants/categories.js"
import { useNavigate } from 'react-router-dom'

export default function CategoriesList() {
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto mt-10 max-w-[90%]'>
            {categories.map((category, index) => {
                return (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, y: [30, -30, 0], x: index % 2 === 0 ? [30, 0] : [-30, 0] }}
                        transition={{ duration: 0.4, delay: 0.2 * index }}
                        onClick={() => navigate(`/category/${category.href}`)}
                        className=''

                    >
                        <div
                            className='relative text-white hover:text-black cursor-pointer sm:hover:z-50 transition-transform duration-300 ease-in-out sm:hover:scale-150 rounded-lg hover:shadow-2xl'
                        >
                            <img className='object-cover rounded-lg' src={category.image} />
                            <div className={`absolute top-[90%] left-[40%] font-pacifico `}>{category.name}</div>
                        </div>

                    </motion.div>
                )
            })}
        </div>
    )
}


