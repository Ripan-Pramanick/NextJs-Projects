// src/components/LayoutWrapper.js

'use client'; // This directive makes this file a Client Component

import { usePathname } from 'next/navigation';

import Navbar from './Navbar'; // Your renamed header
import Footer from './Footer'; // The footer component we created

export default function LayoutWrapper({ children }) {
    // Use the hook to get the current URL path (e.g., '/', '/features')
    const currentPath = usePathname();

    return (
        // This wrapper handles the background gradient and structural layout
        <div className="relative z-10 min-h-screen flex flex-col bg-gradient-to-br from-cyan-100 via-white to-fuchsia-500">

            {/* Pass the current path to the Navbar for active link styling */}
            <Navbar activePath={currentPath} />

            <main className="grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}