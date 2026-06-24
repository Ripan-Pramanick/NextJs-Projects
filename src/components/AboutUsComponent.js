// src/components/AboutUsComponent.js
'use client'; // <-- Added directive for Next.js routing hooks

import React, { useState, useEffect, useRef } from 'react'; // <-- Imported hooks for animation
import { Target, Heart, Zap, Shield, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- DATA STRUCTURES ---

const ourValues = [
    {
        icon: Heart,
        title: "People First",
        description: "We believe HR should be human. We prioritize empathy, support, and fostering a happy, productive, and inclusive work environment.",
    },
    {
        icon: Zap,
        title: "Simplicity & Clarity",
        description: "HR software should simplify, not complicate. We design intuitive, clean tools that require minimal training.",
    },
    {
        icon: Shield,
        title: "Trust & Compliance",
        description: "We handle your most sensitive data. We are committed to security, transparency, and staying ahead of global compliance requirements.",
    },
    {
        icon: Target,
        title: "Continuous Growth",
        description: "We are obsessed with improving. We provide tools that align individual goals with company objectives for sustained success.",
    },
];

const leadershipTeam = [
    { name: "JW", role: "CEO & Founder" },
    { name: "MK", role: "CTO" },
    { name: "CL", role: "Head of Product" },
    { name: "RG", role: "Head of Sales" },
    { name: "SD", role: "VP of Engineering" },
    { name: "NC", role: "CFO" },
];

// Static background styles moved outside to prevent unnecessary re-renders
const gridStyle = {
    backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
    backgroundSize: '20px 30px',
    maskImage: `radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
};

const blurStyle = {
    filter: 'blur(100px)',
    transform: 'translateZ(0)',
};

// --- REUSABLE COMPONENTS ---

// Value Card Component
const ValueCard = ({ value }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100/50 hover:shadow-xl transition duration-300 space-y-3">
        <div className="w-12 h-12 rounded-full bg-fuchsia-100 flex items-center justify-center">
            <value.icon className="w-6 h-6 text-fuchsia-600" />
        </div>
        <h4 className="text-xl font-bold text-gray-900">{value.title}</h4>
        <p className="text-sm text-gray-600">{value.description}</p>
    </div>
);

// Timeline Item Component
const TimelineItem = ({ year, title, description, alignment }) => (
    <div className={`flex ${alignment === 'left' ? 'justify-start' : 'justify-end'} w-full`}>
        <div className={`w-full md:w-1/2 flex ${alignment === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
            <div className={`w-full max-w-sm ${alignment === 'left' ? 'text-right' : 'text-left'}`}>
                <p className="text-lg font-extrabold text-fuchsia-600 mb-1">{year}</p>
                <h5 className="text-xl font-bold text-gray-900">{title}</h5>
                <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
        </div>
    </div>
);


// --- MAIN ABOUT US COMPONENT ---

export default function AboutUsComponent() {
    const router = useRouter();

    // --- Timeline Scroll Animation Logic ---
    const timelineRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            
            // Get the timeline container's position relative to the viewport
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start filling the line when the top of the timeline reaches the middle of the screen
            const scrollPosition = (windowHeight / 2) - rect.top;
            
            // Calculate percentage (0 to 100)
            let progress = (scrollPosition / rect.height) * 100;
            
            // Clamp the value between 0 and 100 to prevent overflow
            progress = Math.max(0, Math.min(100, progress));
            
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // ---------------------------------------

    return (
        <div className="bg-white min-h-screen relative">
            {/* Grid Background */}
            <div className="absolute top-0 right-0 bottom-0 left-0 z-0 overflow-hidden" style={gridStyle} />
            
            {/* Gradient Background */}
            <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-[-100px] left-[-300px] w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-cyan-400/50 via-transparent to-transparent"
                    style={blurStyle}
                />
                <div
                    className="absolute top-[-100px] right-[-300px] w-[1200px] h-[500px] rounded-full bg-gradient-to-tl from-fuchsia-500/50 via-transparent to-transparent"
                    style={blurStyle}
                />
            </div>

            {/* Header / Hero Section */}
            <div className="pt-32 pb-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                    Making HR <span className="text-fuchsia-600">Human</span> Again
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    We believe that HR is about people, not paperwork. Minervasutra makes it easy to build an engaged, productive, and happy workforce.
                </p>

                {/* Statistics */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <div className="p-4 bg-fuchsia-50 rounded-xl">
                        <p className="text-3xl font-extrabold text-gray-900">2,000+</p>
                        <p className="text-sm text-gray-600">Customers</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 rounded-xl">
                        <p className="text-3xl font-extrabold text-gray-900">50+</p>
                        <p className="text-sm text-gray-600">Countries</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 rounded-xl">
                        <p className="text-3xl font-extrabold text-gray-900">500K+</p>
                        <p className="text-sm text-gray-600">Employees Managed</p>
                    </div>
                    <div className="p-4 bg-fuchsia-50 rounded-xl">
                        <p className="text-3xl font-extrabold text-gray-900">98%</p>
                        <p className="text-sm text-gray-600">Retention Rate</p>
                    </div>
                </div>
            </div>

            {/* 1. Our Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-fuchsia-600 inline-block pb-1">Our Mission</h2>
                        <p className="text-lg text-gray-600">
                            Our mission is to empower teams to work well, and prosper, together. Employee satisfaction is the key to business success, and Minervasutra is the platform that makes prioritizing your people easy.
                        </p>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-cyan-50 rounded-xl shadow-md">
                                <p className="text-4xl font-extrabold text-cyan-700">5Y</p>
                                <p className="text-lg text-gray-700 mt-1">Projected revenue growth</p>
                            </div>
                            <div className="p-6 bg-fuchsia-50 rounded-xl shadow-md">
                                <p className="text-4xl font-extrabold text-fuchsia-700">$57M</p>
                                <p className="text-lg text-gray-700 mt-1">Total funding raised</p>
                            </div>
                            <div className="p-6 bg-fuchsia-50 rounded-xl shadow-md">
                                <p className="text-4xl font-extrabold text-fuchsia-700">200+</p>
                                <p className="text-lg text-gray-700 mt-1">Key integrations</p>
                            </div>
                            <div className="p-6 bg-cyan-50 rounded-xl shadow-md">
                                <p className="text-4xl font-extrabold text-cyan-700">4.9</p>
                                <p className="text-lg text-gray-700 mt-1">Average platform rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Our Values Section */}
            <div className="bg-gray-50 py-16 lg:py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Values</h2>
                    <p className="text-lg text-gray-600 mb-12">The principles that guide everything we do.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ourValues.map((value, index) => (
                            <ValueCard key={index} value={value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Our Journey (Timeline) Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Journey</h2>

                {/* Attached the ref to track the scroll position of this container */}
                <div className="relative" ref={timelineRef}>
                    
                    {/* Vertical Center Line (Background) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block rounded-full overflow-hidden">
                        {/* Animated Colored Scroll Line */}
                        <div 
                            className="w-full bg-fuchsia-600 transition-all duration-150 ease-out rounded-full"
                            style={{ height: `${scrollProgress}%` }} 
                        />
                    </div>

                    <div className="space-y-16">
                        <TimelineItem
                            year="2021"
                            title="Founded"
                            description="Minervasutra was born from a desire to take the admin out of HR, allowing teams to focus on people."
                            alignment="left"
                        />
                        <TimelineItem
                            year="2022"
                            title="Series A Funding"
                            description="Raised $5M to accelerate product development and expand our team."
                            alignment="right"
                        />
                        <TimelineItem
                            year="2023"
                            title="1,000 Customers"
                            description="Reached our first milestone of 1,000 active global customers."
                            alignment="left"
                        />
                        <TimelineItem
                            year="2024"
                            title="Global Expansion"
                            description="Opened offices in London and Singapore to serve European and APAC markets."
                            alignment="right"
                        />
                        <TimelineItem
                            year="2025"
                            title="Series B Funding"
                            description="Secured $50M to invest in AI and machine learning for smarter HR capabilities."
                            alignment="left"
                        />
                        <TimelineItem
                            year="2026"
                            title="AI Pioneer Feature"
                            description="Launched our generative AI capabilities for smarter HR management."
                            alignment="right"
                        />
                    </div>
                </div>
            </div>

            {/* 4. Meet Our Leadership */}
            <div className="bg-gray-50 py-16 lg:py-20 text-center relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Leadership</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-center">
                        {leadershipTeam.map((member, index) => (
                            <div key={index} className="space-y-3">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-fuchsia-200 mx-auto flex items-center justify-center text-3xl font-extrabold text-fuchsia-700 border-4 border-fuchsia-300">
                                    {member.name}
                                </div>
                                <p className="text-lg font-bold text-gray-900">{member.name}</p>
                                <p className="text-sm text-fuchsia-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Final CTA Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
                <div className="p-12 md:p-16 rounded-3xl text-center text-white bg-gradient-to-r from-fuchsia-600 to-cyan-500 shadow-xl">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Join Us on Our Mission
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-10">
                        We are hiring! Work alongside a passionate team committed to helping every company put its people first.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {/* Button 1: Routes to Contact page for Career inquiries */}
                        <button 
                            onClick={() => router.push('/contact?type=careers#contact-form')}
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-fuchsia-600 bg-white hover:bg-gray-50 transition duration-150 cursor-pointer"
                        >
                            View Open Careers
                            <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                        </button>
                        
                        {/* Button 2: Routes directly to the Request Demo section */}
                        <button 
                            onClick={() => router.push('/contact?type=demo#contact-form')}
                            className="px-8 py-3 border border-white/50 text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition duration-150 cursor-pointer"
                        >
                            Request Demo
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}