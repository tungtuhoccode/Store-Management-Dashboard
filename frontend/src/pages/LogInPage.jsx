import React from 'react'
import { motion } from "framer-motion"
import { Mail, Lock, MoveRight, MoveLeft } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';

function LogInPage() {
    const loading = true;
    const navigate = useNavigate();
    const [switchPage, setSwitchPage] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <div className='min-h-[calc(100vh-5rem)] flex items-center justify-center bg-emerald-500'>
            <div className="bg-white rounded-lg p-8 flex w-11/12 max-w-4xl mx-auto">


                {/* for user sign up page */}

                <form onSubmit={handleSubmit} className='w-full md:w-1/2 flex flex-col items-center justify-center p-4 '>
                    <div className='w-full'>
                        <motion.div
                            initial={!switchPage ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                            animate={!switchPage ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h2 className='mt-36 mb-16 text-center text-3xl font-bold '>Member Login</h2>


                            <div className='space-y-4'>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none'>
                                        <Mail className="h-5 w-4 text-gray-400" aria-hidden
                                            ="true" />
                                    </div>
                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className='block w-full py-4 pl-12 bg-gray-200 border border-white rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='Email'
                                    />
                                </div>

                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none'>
                                        <Lock className="h-5 w-4 text-gray-400" aria-hidden
                                            ="true" />
                                    </div>
                                    <input
                                        type='text'
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className='block w-full py-4 pl-12 bg-gray-200 border border-white rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm '
                                        placeholder='Password'
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={!switchPage ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                            animate={!switchPage ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={!switchPage ? { duration: 0.8, delay: 1.0 } : { duration: 0.8 }}
                        >
                            <button className='block w-full py-4 text-white bg-green-400 rounded-3xl shadow-md hover:bg-gray-800 sm:text-sm mt-6 mb-3'>Sign up</button>
                            {/* forget password and sign in */}
                            <div className='h-36 flex flex-col justify-between items-center sm:text-sm'>
                                <div className='text-gray-400'>Forgot Username / Password?</div>
                                <div className='text-gray-400'>
                                    <div
                                        onClick={() => {
                                            setSwitchPage(true);
                                            setTimeout(() => navigate("/signup"), 2000)
                                        }}
                                        className='text-gray-400 hover:text-green-500 cursor-pointer flex justify-center items-center gap-1'
                                    >
                                        <MoveLeft size={20} /> Create you Account
                                    </div>
                                </div>
                            </div>


                        </motion.div>
                    </div>
                </form>
               
                {/* for logo */}
                <motion.div className='hidden md:flex md:w-1/2 justify-center items-center '
                    initial={!switchPage ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                    animate={!switchPage ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={!switchPage ? { duration: 0.8 } : { duration: 0.8, delay: 1.0 }} //could include delay here to delay when it will show up
                >
                    <img src="/images/hoodiesSignInPage.avif" alt="Sneakers" className="h-full object-cover rounded-2xl" />
                </motion.div>

            </div >


        </div >
    )
}

export default LogInPage
