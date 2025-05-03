import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"

import AddToCartIcon from './AddToCartIcon';


export default function FeaturedSlider({ products }) {
    const [index, setIndex] = React.useState(2);
    const [isHovered, setIsHovered] = React.useState(false);
    const isLargeScreen = useMediaQuery("(min-width: 640px)");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isHovered) return; // Don't run if hovered

        const intervalId = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(intervalId); // Clean up before setting a new one
    }, [isHovered, isLargeScreen, products.length]);

    function useMediaQuery(query) {
        const [matches, setMatches] = React.useState(false);
        React.useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) setMatches(media.matches);

            const listener = () => setMatches(media.matches)
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }, [matches, query])
        return matches;
    }



    function prevSlide() {
        setIndex((prevIndex) => (prevIndex === 0 ? (isLargeScreen ? products.length - 2 : products.length - 1) : prevIndex - 1));

    }
    function nextSlide() {
        setIndex((prevIndex) => (prevIndex === (isLargeScreen ? products.length - 2 : products.length - 1) ? 0 : prevIndex + 1));

    }


    return (
        <motion.div

            className='relative max-w-[90%] overflow-hidden mx-auto mt-10'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className='flex'
                animate={{ x: `-${isLargeScreen ? (index * (100 / 3)) : (index * 100)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className='group relative w-full sm:w-1/3 flex-shrink-0 border shadow-lg rounded-lg sm:mx-6 cursor-pointer'
                        onClick={() => navigate(`product/${product.id}`)}
                    >
                        <AddToCartIcon productId={product.id} />

                        <img src={product.image} alt={product.name} className='rounded-t-lg h-[75%] w-full object-cover' />


                        <div className='mt-3 ml-3'>
                            <h2 className="text-lg lg:text-xl truncate">{product.name}</h2>
                            <p className='text-sm text-gray-500'>{product.categories}</p>
                            <p className="text-green-600 mt-2">${product.price}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow"
                onClick={prevSlide}
            >
                ←
            </button>

            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow"
                onClick={nextSlide}
            >
                →
            </button>
        </motion.div >
    )
}


