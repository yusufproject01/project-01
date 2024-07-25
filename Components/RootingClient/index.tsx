// components/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '../Layout/Footer';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const showNavbar = !pathname.startsWith('/auth');

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
            {showNavbar && <Footer />}
        </>
    );
};

export default ClientLayout;
