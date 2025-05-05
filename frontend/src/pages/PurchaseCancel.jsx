import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegSadCry } from "react-icons/fa";

export default function PurchaseCancel() {
    const navigate = useNavigate();

    return (
        <section className='max-w-7xl mx-auto py-16'>
            <div className='max-w-[90%] mx-auto h-[300px] flex flex-col justify-center items-center gap-4 text-center text-gray-600'>
                <FaRegSadCry className='text-6xl text-lime-600' />
                <p className='text-2xl font-semibold'>Your payment was canceled.</p>
                <p className='text-lg text-gray-500'>No worries! You can continue shopping or try again later.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className='mt-4 bg-lime-600 text-white py-2 px-6 rounded-full hover:bg-lime-700 transition-all duration-300'
                >
                    Back to Shop
                </button>
            </div>
        </section>
    )
}
