"use client";

import { ArrowRight, Play, CheckCircle, Users, Clock, Shield, BarChart, TrendingUp, Heart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // <-- 1. Imported Link here

// --- REUSABLE COMPONENTS ---

const HeroMetricsCard = () => (
    <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100/70 w-full max-w-sm ml-auto relative z-20">
        <div className="flex space-x-1.5 mb-6">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500 text-sm font-semibold">Active Employees</div>
            <User className="w-6 h-6 text-fuchsia-400" />
        </div>
        <div className="text-5xl font-extrabold text-gray-900 mb-6">1,247</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-blue-500 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs mt-1">Onboarding</div>
            </div>
            <div className="p-3 rounded-lg bg-indigo-500 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">17</div>
                <div className="text-xs mt-1">Reviews</div>
            </div>
            <div className="p-3 rounded-lg bg-fuchsia-500 text-white text-center shadow-lg">
                <div className="text-2xl font-bold">22</div>
                <div className="text-xs mt-1">Time-Off</div>
            </div>
        </div>
        <div className="text-sm text-gray-700 font-semibold mb-2">Hiring Pipeline</div>
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div></div>
                <div className="text-xs font-semibold inline-block text-gray-600">78%</div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                    style={{ width: "78%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-fuchsia-500 bg-gradient-to-r from-fuchsia-500 to-indigo-500"
                ></div>
            </div>
        </div>
    </div>
);

const MetricCard = ({ icon: Icon, iconColor, title, value, label, valueColor = 'text-gray-900' }) => (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${iconColor} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <p className="text-sm font-semibold text-gray-700">{title}</p>
        </div>
        <div>
            <p className={`text-4xl font-extrabold ${valueColor}`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
        </div>
    </div>
);

const GradientFadeDivider = () => (
    <div
        className="h-20 -mt-10 relative z-20"
        style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 80%)',
        }}
    />
);

const HeroGradient = () => {
    const blurStyle = {
        filter: 'blur(100px)',
        transform: 'translateZ(0)',
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
            <div
                className="absolute top-[-100px] left-[-300px] w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-cyan-400/50 via-transparent to-transparent"
                style={blurStyle}
            />
            <div
                className="absolute top-[-100px] right-[-300px] w-[1200px] h-[1200px] rounded-full bg-gradient-to-tl from-fuchsia-500/50 via-transparent to-transparent"
                style={blurStyle}
            />
        </div>
    );
};

const GradientCircle = () => {
    const blurStyle = {
        filter: 'blur(100px)',
    };

    return (
        <div
            className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-br from-cyan-500/60 via-transparent to-fuchsia-500/60 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
            style={blurStyle}
        />
    );
};

// --- PAGE SECTIONS ---

const HeroContainer = ({ children }) => {
    const gridStyle = {
        backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
        backgroundSize: '20px 30px',
        maskImage: `radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)`,
    };

    return (
        <div className="relative">
            <div
                className="absolute top-0 right-0 bottom-0 left-0 z-0 overflow-hidden"
                style={gridStyle}
            />
            <HeroGradient />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

const TrustBarSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 border-b border-gray-100 mb-12 relative z-10">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Trusted by leading companies around the world
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-70">
            {['Acme Corp', 'TechFlow', 'Innovate Inc', 'CloudBase', 'DataSync', 'NextGen'].map((name) => (
                <span key={name} className="text-xl font-bold text-gray-700 hover:text-fuchsia-600 transition duration-150 cursor-pointer">
                    {name}
                </span>
            ))}
        </div>
    </div>
);

const KeyBenefitsSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
                Why Teams Choose{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600">
                    Minervasutra
                </span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Designed for HR professionals who want to spend less time on admin and more time on people.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="p-3 w-fit mx-auto rounded-xl bg-purple-50 mb-6">
                    <Clock className="w-7 h-7 text-fuchsia-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Save 10+ Hours Weekly</h3>
                <p className="text-gray-600">
                    Automate repetitive HR tasks and focus on what matters most - your people.
                </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="p-3 w-fit mx-auto rounded-xl bg-purple-50 mb-6">
                    <Shield className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stay Compliant</h3>
                <p className="text-gray-600">
                    Built-in compliance tools ensure you meet all regulatory requirements effortlessly.
                </p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
                <div className="p-3 w-fit mx-auto rounded-xl bg-purple-50 mb-6">
                    <BarChart className="w-7 h-7 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Data-Driven Insights</h3>
                <p className="text-gray-600">
                    Make smarter decisions with real-time analytics and customizable reports.
                </p>
            </div>
        </div>
    </div>
);

// 2. Removed useRouter from here and used Link
const WorkflowFeaturesSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
                        Everything You Need to Manage <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-cyan-500">
                            Your Workforce
                        </span>
                    </h2>

                    <p className="text-lg text-gray-700 max-w-md">
                        From hiring to retiring, Minervasutra covers the entire employee lifecycle with powerful, easy-to-use tools.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 pt-4">
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Automated onboarding workflows</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Performance tracking & reviews</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Time-off management</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Payroll integration</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Employee self-service portal</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 mt-1 text-cyan-500 flex-shrink-0" />
                            <p className="text-gray-700">Custom reporting dashboards</p>
                        </div>
                    </div>

                    <Link
                        href="/features"
                        className="inline-flex items-center text-lg font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition duration-150 pt-4 cursor-pointer"
                    >
                        See all features
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex flex-col space-y-6">
                        <MetricCard
                            icon={User}
                            iconColor="text-cyan-500"
                            title="Team Overview"
                            value="156"
                            label="Active members"
                        />
                        <MetricCard
                            icon={Heart}
                            iconColor="text-fuchsia-500"
                            title="Engagement"
                            value="94%"
                            label="Satisfaction rate"
                        />
                    </div>
                    <div className="flex flex-col space-y-6 pt-10">
                        <MetricCard
                            icon={TrendingUp}
                            iconColor="text-green-500"
                            title="Performance"
                            value="+23%"
                            label="This quarter"
                            valueColor="text-green-600"
                        />
                        <MetricCard
                            icon={Clock}
                            iconColor="text-orange-500"
                            title="Time Saved"
                            value="12h"
                            label="Per week"
                            valueColor="text-orange-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Removed useRouter from here and used Link
const CTABannerSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-20 mb-0 relative z-10">
            <div className="p-12 md:p-16 rounded-3xl text-center text-white bg-gradient-to-r from-fuchsia-600 to-cyan-500 shadow-xl">
                <h2 className="text-4xl font-extrabold mb-4">
                    Ready to Transform Your HR?
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-10">
                    Join thousands of companies that trust Minervasutra to streamline their HR operations. Start your free 14-day trial today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/contact?type=start_free_trial#contact-form"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-fuchsia-600 bg-white hover:bg-gray-50 transition duration-150 cursor-pointer">
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                    </Link>
                    <Link
                        href="/pricing?type=pricing#pricing-section"
                        className="inline-flex items-center justify-center px-8 py-3 border border-white/50 text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition duration-150 cursor-pointer">
                        View Pricing
                    </Link>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

// 4. Removed useRouter from here and used Link for Hero CTAs
export default function HomePageComponent() {
    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <HeroContainer>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text and CTAs */}
                        <div className="relative z-10">
                            <p className="flex items-center text-sm font-semibold text-purple-600 mb-4">
                                <CheckCircle className="w-4 h-4 mr-1 text-purple-500" />
                                Trusted by 2,000+ companies worldwide
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600">
                                    Transform
                                </span>{' '}
                                Your HR Operations with{' '}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600">
                                    AI
                                </span>
                            </h1>
                            <p className="mt-6 text-xl text-gray-700 max-w-lg">
                                AI-powered HR platform that handles your entire employee lifecycle from hiring to payroll to performance. Manage everything in one intelligent system built for teams of 10 to 500+.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact?type=start_free_trial#contact-form"
                                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg transition duration-150 ease-in-out cursor-pointer">
                                    Start Free Trial →
                                </Link>
                                <Link
                                    href="/contact?type=watch_demo#contact-form"
                                    className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer">
                                    <Play className="w-4 h-4 mr-2 text-indigo-600" />
                                    Watch Demo
                                </Link>
                            </div>

                            {/* Social Proof */}
                            <div className="mt-8 flex items-center space-x-4">
                                <div className="flex -space-x-2">
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-sm border-2 border-white">A</span>
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-sm border-2 border-white">B</span>
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-600 font-bold text-sm border-2 border-white">C</span>
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-pink-100 text-pink-600 font-bold text-sm border-2 border-white">D</span>
                                </div>
                                <p className="text-gray-500 font-medium">
                                    <span className="font-bold text-gray-800">4.9/5</span> from 500+ reviews
                                </p>
                            </div>
                        </div>

                        {/* Hero Illustration */}
                        <Image
                            src="/home.png"
                            alt="Chat Icon"
                            width={700}
                            height={700}
                        />
                    </div>
                </div>
            </HeroContainer>

            {/* Transition Divider */}
            <GradientFadeDivider />

            {/* Main Content Wrapper */}
            <div className="bg-white relative">
                <TrustBarSection />
                <KeyBenefitsSection />
                <GradientCircle />
                <WorkflowFeaturesSection />
                <CTABannerSection />
            </div>

        </div>
    );
}