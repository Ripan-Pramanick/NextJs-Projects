// src/components/Navbar.js
// NOTE: This component requires the 'activePath' prop passed from the LayoutWrapper.js

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar({ activePath = '/' }) {
    // 1. State for controlling the mobile menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 2. Function to toggle the menu state
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 transition-shadow duration-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo1-removebg-preview.png"
                            alt="Minervasutra Logo"
                            width={100}
                            height={100}
                            className="w-24 h-18 mr-2"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex space-x-2">
                        {navItems.map((item) => {
                            const isActive = activePath === item.href;

                            // Single-line string to prevent Next.js hydration errors
                            const linkClasses = `px-5 py-2 rounded-full text-base font-medium transition duration-150 ease-in-out ${
                                isActive ? 'bg-fuchsia-600 text-cyan-200 shadow-lg' : 'text-gray-700 hover:text-fuchsia-600 hover:bg-cyan-200'
                            }`;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={linkClasses}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Button: "Request Demo" (Desktop) */}
                    <div className="flex items-center space-x-4">
                        {/* --- 1. Link updated to route to /contact#contact-form --- */}
                        <Link
                            href="/contact?type=demo"
                            className="hidden sm:inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg transition duration-150 ease-in-out cursor-pointer"
                        >
                            Request Demo
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            className="lg:hidden p-2 text-cyan-600 hover:text-fuchsia-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 cursor-pointer"
                            aria-label="Toggle navigation"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Mobile Menu Panel */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 inset-x-0 p-2 transition transform origin-top-right">
                    <div className="rounded-lg shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                        <div className="px-5 pt-4 pb-6 space-y-1">
                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={toggleMenu}
                                        className={`block w-full px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out ${
                                            activePath === item.href ? 'bg-fuchsia-600 text-cyan-200' : 'text-gray-700 hover:text-cyan-600 hover:bg-fuchsia-200'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        
                        {/* Mobile Action Button: "Request Demo" */}
                        <div className="py-4 px-5">
                            {/* --- 2. Mobile link also updated to route to /contact#contact-form --- */}
                            <Link
                                href="/contact?type=demo"
                                onClick={toggleMenu}
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg transition duration-150 ease-in-out cursor-pointer"
                            >
                                Request Demo
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    ); 
}