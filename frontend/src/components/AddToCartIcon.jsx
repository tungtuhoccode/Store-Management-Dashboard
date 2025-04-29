import React from 'react'

import { motion, useAnimation } from 'framer-motion';
import { ShoppingBag, Check, LoaderCircle } from "lucide-react"

import { useCartStore } from '../store/useCartStore';

export default function AddToCartIcon({ productId }) {
    const { loading, addToCart } = useCartStore();


    const controls = useAnimation();
    const [clicked, setClicked] = React.useState(false);
    const [showCheck, setShowCheck] = React.useState(false);

    async function handleClick() {
        setClicked(true);

        if (!loading) {
            await Promise.all([
                controls.start({
                    y: -20,
                    transition: { type: "spring", stiffness: 500, damping: 10 }
                }),
                controls.start({
                    rotate: [0, 10, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                }),
                controls.start({
                    color: "#00FF00", // Turn green
                    transition: { duration: 0.3 }
                }),
                setShowCheck(true)
            ]);



            await Promise.all([
                setShowCheck(false),
                await controls.start({
                    y: 0,
                    color: "rgba(0, 0, 0, 1)", // Back to normal
                    transition: { duration: 0.3 },

                })
            ])

            setClicked(false);
        }

    }

    return (
        <motion.div
            animate={controls}
            className='block sm:hidden absolute top-2 right-2 group-hover:block bg-white p-2 rounded-3xl group/inner'
            onClick={handleClick}
        >
            {loading ? <LoaderCircle size={20} className='animate-spin' /> :
                showCheck ? (
                    <Check size={20} />
                ) : (
                    <>
                        <ShoppingBag size={20} onClick={(() => addToCart(productId))} />
                        <div className="absolute w-[250%] right-full top-1/2 -translate-y-1/2 mr-3 bg-black text-white text-sm rounded px-2 py-2 opacity-0 invisible group-hover/inner:opacity-100 group-hover/inner:visible transition-all duration-300 after:content-[''] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-black">
                            Add to cart
                        </div>
                    </>

                )
            }

        </motion.div>


    )
}


