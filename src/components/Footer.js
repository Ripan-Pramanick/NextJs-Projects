// src/components/Footer.js

import Image from 'next/image';
import { Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

const FooterLink = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="text-gray-500 hover:text-fuchsia-600 transition duration-150"
        >
            {children}
        </a>
    </li>
);

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                {/* Top Section: Logo, Newsletter, and Main Links */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 border-b border-gray-100 pb-10 mb-8">

                    {/* Column 1: Logo and About - UPDATED */}
                    <div className="md:col-span-2">

                        {/* Logo Group: Image + Text */}
                        <div className="flex items-center mb-4">
                            <Image
                                src="/logo1-removebg-preview.png"
                                alt="Minervasutra Logo"
                                width={80}
                                height={80}
                                className="mr-2"
                            />
                            
                        </div>
                        {/* End Logo Group */}

                        <p className="text-gray-500 max-w-sm">
                            The all-in-one AI Powered HR platform designed for efficiency, compliance, and employee success.
                        </p>
                    </div>

                    {/* Column 2: Product Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/features">Features</FooterLink>
                            <FooterLink href="/pricing">Pricing</FooterLink>

                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/about">About Us</FooterLink>

                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-3 mb-6">
                            <FooterLink href="#">Terms of Service</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>

                        </ul>



                    </div>

                </div>

                {/* Bottom Section: Copyright and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>
                        &copy; {new Date().getFullYear()} Minervasutra. All rights reserved. Powered By <a href="#" aria-label="Facebook" className="hover:text-fuchsia-600"></a>Cyberspace Wrorks
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" aria-label="Facebook" className="hover:text-fuchsia-600"><Facebook className="w-5 h-5" /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-fuchsia-600"><Twitter className="w-5 h-5" /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-fuchsia-600"><Linkedin className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}