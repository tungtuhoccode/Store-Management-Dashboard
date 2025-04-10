import React from 'react'
import { motion } from "framer-motion"
import { Mail, Lock } from "lucide-react"

function SignUpPages() {
    const loading = true;
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-green-500'>
            <div className="bg-white rounded-lg p-8 flex w-full max-w-4xl mx-auto mb-20">
                {/* for logo */}
                <motion.div className='hidden  bg-red-500 md:flex md:w-1/2 justify-center items-center '
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }} //could include delay here to delay when it will show up
                >
                    a
                </motion.div>

                {/* for user sign up page */}
          
                    <form onSubmit={handleSubmit} className='w-full md:w-1/2 flex flex-col items-center justify-center p-4 '>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <h2 className='my-16 text-center text-3xl font-bold '>Create your account</h2>

                            <div className='space-y-4'>
                                <div className='relative rounded-lg shadow-sm'>
                                    <div className='absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none'>
                                        <Mail className="h-5 w-4 text-gray-400" aria-hidden
                                            ="true" />
                                    </div>
                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className='block w-full px-4 py-4 pl-12 bg-gray-200 border-white rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='Email'
                                    />
                                </div>

                                <div className='relative rounded-lg shadow-sm'>
                                    <div className='absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none'>
                                        <Lock className="h-5 w-4 text-gray-400" aria-hidden
                                            ="true" />
                                    </div>
                                    <input
                                        type='text'
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className='block w-full px-4 py-4 pl-12 bg-gray-200 border-white rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='Password'
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            <button className=''>Sign up</button>
                            <div>
                                <p>Forget username/password</p>

                            </div>


                        </motion.div>
                    </form>
                    
              
            </div>


        </div>
    )
}

export default SignUpPages
