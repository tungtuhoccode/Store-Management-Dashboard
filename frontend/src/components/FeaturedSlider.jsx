import React from 'react'
import { motion } from 'framer-motion';


export default function FeaturedSlider({ products }) {
    const [index, setIndex] = React.useState(2);

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
    const isLargeScreen = useMediaQuery("(min-width: 1024px)");


    function prevSlide() {
        setIndex((prevIndex) => (prevIndex === 0 ? (isLargeScreen ? products.length - 2 : products.length - 1) : prevIndex - 1));

    }
    function nextSlide() {
        setIndex((prevIndex) => (prevIndex === (isLargeScreen ? products.length - 2 : products.length - 1) ? 0 : prevIndex + 1));

    }


    return (
        <div className='relative max-w-[90%] overflow-hidden mx-auto mt-10 '>
            <motion.div
                className='flex'
                animate={{ x: `-${isLargeScreen ? (index * (100 / 3)) : (index * 100)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className='w-full lg:w-1/3 flex-shrink-0 px-6 py-48 bg-white border rounded-lg shadow text-center mx-6'
                    >
                        <div>{product.name}</div>
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-green-600 mt-2">{product.price}</p>
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
        </div >
    )
}


