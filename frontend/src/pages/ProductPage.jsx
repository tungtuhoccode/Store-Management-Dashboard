import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore';
import { useUserStore } from '../store/useUserStore';
import { useCartStore } from '../store/useCartStore';

import LoadingScreen from '../components/LoadingScreen';

import toast from 'react-hot-toast';

export default function ProductPage() {
    const { id } = useParams();
    const { product, fetchAProduct, loading: pageLoading } = useProductStore();
    const { user } = useUserStore();
    const { cart, addToCart, updateCart } = useCartStore();

    const [quantity, setQuantity] = React.useState(1);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchAProduct(id);
    }, [fetchAProduct])

    return (
        <div className='relative'>
            {pageLoading ?
                <LoadingScreen />
                :
                <section className='max-w-7xl mx-auto'>
                    <div className='mx-auto max-w-[80%] py-16'>
                        <div className='flex flex-col lg:flex-row w-full gap-10 text-gray-700'>
                            <img className='max-w-[100%] lg:max-w-[45%] rounded-xl' src={product.image} alt={product.name} />
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-1 text-sm text-gray-500'>
                                    <div
                                        className='hover:text-green-500 cursor-pointer'
                                        onClick={() => navigate("/")}
                                    >
                                        Home
                                    </div> /
                                    <div
                                        className='hover:text-green-500 cursor-pointer'
                                        onClick={() => navigate(`/category/${(product.categories).toLowerCase()}`)}
                                    >
                                        {product.categories}
                                    </div> /
                                    <div>{product.name}</div>
                                </div>
                                <div
                                    className='text-lime-600 cursor-pointer hover:text-lime-700'
                                    onClick={() => navigate(`/category/${(product.categories).toLowerCase()}`)}
                                >
                                    {product.categories}
                                </div>
                                <h1 className='text-xl font-bold'>{product.name}</h1>
                                <div className='text-2xl font-medium'>${product.price}</div>
                                <div>
                                    <p className='mb-7'>Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices.</p>
                                    <p>Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.</p>
                                </div>
                                <div className='flex gap-4'>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value)
                                        }}
                                        className='w-16 border border-gray-300 p-1 rounded'
                                    />
                                    <button
                                        className={`bg-lime-600 text-white py-1 px-4 rounded-full hover:bg-lime-700 transition-all duration-500 flex justify-center items-center text-sm`}
                                        onClick={() => {
                                            if (!(user.email && user.userName)) {
                                                toast.error("Please log in to continue adding to cart!");
                                            } else {
                                                const cartItem = cart.find(item => item.id === id);

                                                if (cartItem) {
                                                    // Already in cart: update quantity
                                                    toast.promise(
                                                        updateCart({ [id]: Number(quantity) }),
                                                        {
                                                            loading: 'Updating cart...',
                                                            success: <b>Cart updated!</b>,
                                                            error: <b>Failed to update cart.</b>,
                                                        }
                                                    );
                                                } else {
                                                    // Not in cart yet: add to cart
                                                    toast.promise(
                                                        Promise.all([
                                                            addToCart(id),
                                                            updateCart({ [id]: Number(quantity) }),
                                                        ]),

                                                        {
                                                            loading: 'Adding...',
                                                            success: <b>Added to cart!</b>,
                                                            error: <b>Failed to add to cart.</b>,
                                                        }
                                                    );
                                                }
                                            }
                                        }}

                                    >
                                        Add to cart
                                    </button>
                                </div>
                                <div className='text-sm border-t py-2'>
                                    Category: <span
                                        className='text-lime-600 cursor-pointer hover:text-lime-700'
                                        onClick={() => navigate(`/category/${(product.categories).toLowerCase()}`)}
                                    >
                                        {product.categories}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='mx-auto max-w-[80%] border-t'>
                        <div className='w-fit border-t border-t-lime-600 py-2 font-medium'>Description</div>
                        <div>
                            <p className='mb-7'>Faucibus lacus tincidunt molestie accumsan nibh non odio aenean molestie purus tristique sed tempor consequat risus tellus amet augue egestas mauris scelerisque donec ultrices.</p>
                            <p className='mb-7'>Tincidunt mauris, pharetra aliquam in magnis ornare sit mi velit, quis semper ut a malesuada pharetra volutpat euismod vulputate pellentesque et risus in malesuada pellentesque dictumst amet vitae vitae ut phasellus quam et enim feugiat eget mauris aenean eu volutpat, dictum donec gravida nunc egestas viverra justo sed.</p>
                            <p>Sollicitudin facilisis massa pellentesque in ultrices enim nunc ac egestas elementum ut in ornare sit malesuada.</p>
                        </div>
                    </div>
                </section >
            }
        </div>




    )
}

