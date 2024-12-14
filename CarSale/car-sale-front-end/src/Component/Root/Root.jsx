import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../HomePage/Navbar';
import Footer from '../HomePage/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;