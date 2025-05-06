// components/MainLayout.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
    return (
        <>
            <div className="min-h-screen relative overflow-hidden">
                <div className="relative z-50 pt-20">
                    <ScrollToTop />
                    <NavBar />
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
}
