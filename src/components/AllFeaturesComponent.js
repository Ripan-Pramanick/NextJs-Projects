// src/components/AllFeaturesComponent.js
'use client'; // <-- 1. Added mandatory directive for Next.js navigation hooks

import React from 'react';
import { ArrowRight, Check, User, Clock, Briefcase, DollarSign, Activity, FileText, Globe, Zap, BookOpen, BarChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // <-- Added Link for optimized Next.js routing
import { useRouter } from 'next/navigation';

// Grid and gradient styles
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

// --- REUSABLE FEATURE CARD COMPONENT ---
const FeatureCard = ({ icon: Icon, title, description, benefits, image }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center border-b border-gray-100 py-16 lg:py-24">

        {/* Left Side: Text and Benefits */}
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Icon className="w-8 h-8 text-fuchsia-600" />
                <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
            </div>

            <p className="text-lg text-gray-700">
                {description}
            </p>

            {/* Benefit List */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{benefit}</span>
                    </div>
                ))}
            </div>

            {/* Updated standard anchor tag to Next.js Link pointing to demo form */}
            <Link href="/contact#contact-form" className="inline-flex items-center text-base font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition duration-150 pt-4 cursor-pointer">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </div>

        {/* Right Side: Image Placeholder (Cleaned single-line string classNames) */}
        <div className="h-80 rounded-2xl relative overflow-hidden flex items-center justify-center">
            <Image
                src={image}
                alt={title}
                width={500}
                height={400}
            />
        </div>
    </div>
);

// --- SECTION DEFINITIONS ---

const FeatureDetails = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FeatureCard
            icon={User}
            title="Smart Recruitment"
            description="Streamline your hiring process with AI-powered candidate screening, automated scheduling, and collaborative hiring workflows. Track candidates from application to offer."
            benefits={["AI/Smart screening", "Collaborative Feedback", "Automated interview scheduling", "Smart Recruiter Prediction"]}
            image="/jobposting.png"
        />

        <FeatureCard
            icon={Briefcase}
            title="Seamless Onboarding"
            description="Create memorable first impressions with automated onboarding workflows. New hires complete paperwork, training, and orientation before day one."
            benefits={["Digital document signing", "Task checklists", "Training management", "New hire portals"]}
            image="/job.png" 
        />

        <FeatureCard
            icon={Activity}
            title="Performance Management"
            description="Drive growth with continuous feedback, goal tracking, and performance reviews. Align individual goals with company objectives."
            benefits={["360-degree feedback", "Performance reviews", "Goal setting & tracking", "Recognition system"]}
            image="/Timesheet.png"
        />

        <FeatureCard
            icon={DollarSign}
            title="Payroll Integration"
            description="Connect with leading payroll providers for seamless salary processing. Automate tax calculations, deductions, and compliance reporting."
            benefits={["Multi-state support", "Tax compliance", "Automated calculations", "Expense management"]}
            image="/employee.png"
        />

        <FeatureCard
            icon={Clock}
            title="Time & Attendance"
            description="Track time-off requests, attendance, and leave balances. Automated approval workflows and calendar integration keep everyone in sync."
            benefits={["Leave management", "Shift scheduling", "Time tracking", "Calendar sync"]}
            image="/Attendence.png"
        />

        <FeatureCard
            icon={BarChart}
            title="HR Analytics"
            description="Make data-driven decisions with powerful analytics dashboards. Track turnover, engagement, headcount trends, and more."
            benefits={["Custom dashboards", "Headcount planning", "Turnover analysis", "Export reports"]}
            image="/HR analytics.png"
        />
    </div>
);

// Additional Capabilities Section
const AdditionalCapabilitiesSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">
                And So Much More
            </h2>
            <p className="mt-4 text-xl text-gray-600">
                Additional capabilities to power your complete HR operation.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <FileText className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance</h3>
                <p className="text-gray-600 text-sm">
                    Stay compliant with automated policy updates and regulatory reporting.
                </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <BookOpen className="w-8 h-8 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Employee Directory</h3>
                <p className="text-gray-600 text-sm">
                    Organizational charts and employee profiles.
                </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <Zap className="w-8 h-8 text-fuchsia-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Automation</h3>
                <p className="text-gray-600 text-sm">
                    Custom workflows and triggers.
                </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <Globe className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Support</h3>
                <p className="text-gray-600 text-sm">
                    Multi-language, multi-currency compliance.
                </p>
            </div>
        </div>
    </div>
);

// Final CTA Banner
const FinalCTABanner = () => {
    // 2. Hook successfully moved inside functional component scope
    const router = useRouter(); 

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
            {/* 3. Replaced multi-line string with single line to fix Hydration mismatch */}
            <div className="p-12 md:p-16 rounded-3xl text-center text-white bg-gradient-to-r from-fuchsia-600 to-cyan-500 shadow-xl">
                <h2 className="text-4xl font-extrabold mb-4">
                    Ready to See Minervasutra in Action?
                </h2>
                <p className="text-xl max-w-3xl mx-auto mb-10">
                    Schedule a personalized demo and see how Minervasutra can transform your HR operations.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => router.push('/contact?type=demo')}
                        className="px-8 py-3 border border-transparent text-base font-medium rounded-lg cursor-pointer text-fuchsia-600 bg-white hover:bg-gray-50 transition duration-150"
                    >
                        Request Demo
                        <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                    </button>
                    
                    {/* 4. Fixed logical bug: Now correctly redirects to /pricing */}
                    <button
                        onClick={() => router.push('/pricing?type=pricing')}
                        className="px-8 py-3 border border-white/50 text-base font-medium rounded-lg cursor-pointer text-white bg-transparent hover:bg-white/10 transition duration-150"
                    >
                        View Pricing
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN FEATURES COMPONENT ---
export default function AllFeaturesComponent() {
    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute top-0 right-0 bottom-0 left-0 z-0 overflow-hidden" />

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

            {/* Introductory Header */}
            <div className="bg-transparent pt-32 pb-16 text-center relative z-10">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                    All the Tools You Need to<br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-indigo-600">
                        Manage Your Workforce
                    </span>
                </h1>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    From recruitment to retirement, Minervasutra provides comprehensive solutions for every stage of the employee lifecycle
                </p>
            </div>

            {/* Main Content Container */}
            <div className="relative">
                <FeatureDetails />
                <AdditionalCapabilitiesSection />
                <FinalCTABanner />

                <div className="h-20 lg:h-32"></div>
            </div>
        </div>
    );
}