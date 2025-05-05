// components/MainLayout.jsx
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
}
