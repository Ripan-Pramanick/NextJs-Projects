'use client';

import React, { useState } from 'react';
import { Check, X, ArrowRight, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- PRICE CALCULATION ---
const calculateYearlyPrice = (monthlyPrice) => {
    const yearlyTotal = monthlyPrice * 12;
    return Math.round(yearlyTotal);
};

// --- DATA STRUCTURES ---
const pricingPlans = [
    {
        name: "Starter",
        monthlyPrice: 99,
        yearlyPrice: calculateYearlyPrice(99),
        description: "Perfect for small teams getting started with HR.",
        features: [
            "Up to 25 employees",
            "Employee Directory",
            "Seamless Onboarding",
            "Time & Attendance",
            "Employee Self-Service",
            "Basic Reporting",
            "Email Support",
        ],
        buttonText: "Start Free Trial",
        theme: "border-gray-200"
    },
    {
        name: "Professional",
        monthlyPrice: 399,
        yearlyPrice: calculateYearlyPrice(399),
        description: "For growing companies that need more power.",
        features: [
            "Up to 100 employees",
            "All Starter features",
            "Smart Recruitment",
            "Performance Reviews",
            "Advanced Reporting",
            "Payroll Integration",
            "Priority Support",
        ],
        buttonText: "Start Free Trial",
        theme: "border-gray-200"
    },
    {
        name: "Enterprise",
        monthlyPrice: "Custom",
        yearlyPrice: "Custom",
        description: "For large organizations with complex HR needs.",
        features: [
            "Unlimited employees",
            "All Professional features",
            "Custom Workflows",
            "Compliance Audits",
            "API & System Integrations",
            "Dedicated Account Manager",
            "24/7 Phone Support",
        ],
        buttonText: "Contact Sales",
        theme: "border-gray-200"
    }
];

const comparisonData = [
    { feature: "Max No. of Employees", starter: "25", professional: "100", enterprise: "Unlimited" },
    { feature: "Time Tracking", starter: true, professional: true, enterprise: true },
    { feature: "Employee Directory", starter: true, professional: true, enterprise: true },
    { feature: "Onboarding & HRIS", starter: true, professional: true, enterprise: true },
    { feature: "Payroll Integration", starter: false, professional: true, enterprise: true },
    { feature: "Recruiter workflows", starter: false, professional: true, enterprise: true },
    { feature: "API Access", starter: false, professional: false, enterprise: true },
    { feature: "Custom Workflows", starter: false, professional: false, enterprise: true },
    { feature: "Dedicated CSM", starter: false, professional: false, enterprise: true },
];

const faqData = [
    {
        question: "Can I switch plans at any time?",
        answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect on your next billing cycle.",
    },
    {
        question: "What happens when I exceed my employee limit?",
        answer: "We will notify you when you are close to your limit. You will have the option to upgrade to a plan that fits your team's size.",
    },
    {
        question: "Do you offer discounts for non-profits?",
        answer: "Yes! We offer a 20% discount for registered non-profit organizations. Contact our sales team to verify your status and apply the discount.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes, all plans come with a 14-day free trial. No credit card required to start.",
    }
];

// --- REUSABLE COMPONENTS ---

// Pricing Card Component
const PricingCard = ({ plan, billingCycle }) => {
    const router = useRouter();
    const isProfessional = plan.name === "Professional";

    const displayPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const displayInterval = billingCycle === 'monthly' ? 'per user / monthly' : 'per user / year';

    let buttonClasses = "w-full py-3 mt-8 text-base font-semibold rounded-lg transition duration-300 shadow-md cursor-pointer";
    if (isProfessional) {
        buttonClasses += " text-white bg-fuchsia-600 hover:bg-fuchsia-700";
    } else {
        buttonClasses += " text-fuchsia-600 bg-white border border-fuchsia-600 hover:bg-fuchsia-50";
    }

    // Determine URL parameter based on plan type
    const getQueryType = () => {
        return plan.name === "Enterprise" ? "pricing" : "start_free_trial";
    };

    // --- NEW: Map Pricing plans to Contact form plan options ---
    const getPlanValue = () => {
        if (plan.name === "Starter") return "Basic Plan (Free)";
        if (plan.name === "Professional") return "Professional";
        if (plan.name === "Enterprise") return "Enterprise Plan";
        return "";
    };

    return (
        <div className={`flex flex-col p-8 bg-white rounded-xl ${plan.theme}`}>
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-sm text-gray-600">{plan.description}</p>

            <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">₹{displayPrice}</span>
                <span className="text-base font-medium text-gray-600 ml-1">{displayInterval}</span>
            </p>

            <ul className="mt-6 space-y-3 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 flex-shrink-0 text-cyan-500 mr-2 mt-1" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                // --- UPDATED: Passing both type and plan in the URL ---
                onClick={() => router.push(`/contact?type=${getQueryType()}&plan=${encodeURIComponent(getPlanValue())}#contact-form`)}
                className={buttonClasses}
            >
                {plan.buttonText}
                {plan.buttonText.includes("Trial") && <ArrowRight className="w-4 h-4 ml-2 inline-block" />}
            </button>
        </div>
    );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-gray-800">{question}</h4>
                <Minus className={`w-5 h-5 text-fuchsia-500 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-45'}`} />
            </div>
            {isOpen && (
                <p className="mt-4 text-gray-600 text-sm max-w-2xl">
                    {answer}
                </p>
            )}
        </div>
    );
};

// --- MAIN PRICING PAGE COMPONENT ---

export default function PricingComponent() {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState('monthly');

    const isMonthly = billingCycle === 'monthly';
    const isYearly = billingCycle === 'yearly';

    return (
        <div className="bg-white min-h-screen relative">
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                    Simple, <span className="text-fuchsia-600">Transparent</span> Pricing
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Choose the plan that fits your organization, and get a 7-day free trial.
                </p>

                {/* Billing Toggle */}
                <div className="mt-8 inline-flex p-1 bg-gray-100 rounded-full text-sm font-medium">
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-4 py-1 rounded-full cursor-pointer transition-colors duration-200 ${isMonthly ? 'text-white bg-fuchsia-600 shadow-md' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`px-4 py-1 rounded-full cursor-pointer transition-colors duration-200 ${isYearly ? 'text-white bg-fuchsia-600 shadow-md' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Yearly <span className="text-xs text-green-500 ml-1">Save 15%</span>
                    </button>
                </div>
            </div>

            {/* Pricing Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
                    {pricingPlans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} />
                    ))}
                </div>
            </div>

            {/* Comparison Table Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 bg-gray-50">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Compare Plans
                </h2>
                <p className="text-center text-gray-600 mb-10">See exactly what you get with each plan.</p>

                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Feature</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 whitespace-nowrap">Starter</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 whitespace-nowrap">Professional</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 whitespace-nowrap">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {comparisonData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                    <td className="px-6 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{row.feature}</td>
                                    {['starter', 'professional', 'enterprise'].map((key) => (
                                        <td key={key} className="px-6 py-3 text-center text-sm text-gray-700 whitespace-nowrap">
                                            {typeof row[key] === 'boolean' ? (
                                                row[key] ? (
                                                    <Check className="w-5 h-5 text-cyan-500 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                                                )
                                            ) : (
                                                row[key] || <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-4xl mx-auto divide-y divide-gray-200">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>

            {/* Final CTA Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
                <div className="p-12 md:p-16 rounded-3xl text-center text-white bg-gradient-to-r from-fuchsia-600 to-cyan-500 shadow-xl">
                    <h2 className="text-4xl font-extrabold mb-4">
                        Ready to Transform Your HR?
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto mb-10">
                        Join thousands of companies that trust Minervasutra to streamline their HR operations. Start your free 14-day trial today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => router.push('/contact?type=start_free_trial#contact-form')}
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-fuchsia-600 bg-white hover:bg-gray-50 transition duration-150 cursor-pointer"
                        >
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                        </button>
                        <button
                            onClick={() => router.push('/pricing?type=pricing#pricing-section')}
                            className="px-8 py-3 border border-white/50 text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition duration-150 cursor-pointer"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}