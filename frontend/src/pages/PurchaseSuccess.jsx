import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import axios from "../lib/axios.js";
import { useCartStore } from '../store/useCartStore.js';


export default function PurchaseSuccess() {
    const { clearCart } = useCartStore();
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get("session_id");

        const handleCheckoutSuccess = async () => {
            try {
                
                await axios.post("/payment/checkout-success", { sessionId });
                clearCart();
            } catch (error) {
                console.log(error);
            }
        };
        handleCheckoutSuccess();
    }, [location.search]);

    return (
        <section className='max-w-7xl mx-auto py-16'>
            <div className='max-w-[90%] mx-auto h-[300px] flex flex-col justify-center items-center gap-4 text-center text-gray-600'>
                <FaCheckCircle className='text-6xl text-lime-600' />
                <p className='text-2xl font-semibold'>Thank you for your purchase!</p>
                <button
                    onClick={() => navigate('/shop')}
                    className='mt-4 bg-lime-600 text-white py-2 px-6 rounded-full hover:bg-lime-700 transition-all duration-300'
                >
                    Continue Shopping
                </button>
            </div>
        </section>
    );
}

