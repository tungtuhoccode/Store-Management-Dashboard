import React from 'react'

import { motion, useAnimation } from 'framer-motion';
import { ShoppingBag, Check } from "lucide-react"

export default function AddToCartIcon() {
    const controls = useAnimation();
    const [clicked, setClicked] = React.useState(false);
    const [showCheck, setShowCheck] = React.useState(false);

    async function handleClick() {
        setClicked(true);

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
                color: "black", // Back to normal
                transition: { duration: 0.3 },

            })
        ])

        setClicked(false);
    }

    return (
        <motion.div
            animate={controls}
            className='hidden absolute top-2 right-2 group-hover:block bg-white p-2 rounded-3xl'
            onClick={handleClick}
        >
            {showCheck ? (
                <Check size={20} />
            ) : (
                <ShoppingBag size={20} />
            )}
        </motion.div>
    )
}


