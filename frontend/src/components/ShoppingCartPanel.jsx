import React, { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react'; // or any cart/close icons
import { Link } from 'react-router-dom';

function ShoppingCartPanel({ isOpen, setIsOpen }) {


    return (
        <div>
            {/* Overlay background (optional for click-outside effect) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Cart Panel */}
            <div
                className={`fixed top-0 right-0 h-full sm:w-[650px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>

                {/* Empty Cart Message */}
                <div className="flex flex-col items-center justify-center h-[70%] text-gray-500">
                    <p>No products in the cart.</p>
                </div>

                {/* Continue Button */}
                <div className="absolute bottom-4 w-full px-6">
                    <button onClick={() => setIsOpen(false)} className="w-full bg-lime-600 text-white font-medium py-3 rounded-full">
                        <Link to="/shop">Continue Shopping</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCartPanel;
