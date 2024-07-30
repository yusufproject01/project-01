// components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '../Layout/Footer';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith('/app/loading.tsx') && !pathname.startsWith('/auth');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
            {showNavbar && <Footer />}
        </>
    );
};

export default ClientLayout;
