// src/components/ContactComponent.js
'use client';

import React, { useState, useEffect } from 'react'; // <-- 1. Imported useEffect
import { Mail, Phone, MapPin, Clock, Heart, ArrowRight } from 'lucide-react';

export default function ContactComponent() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        companySize: 'Select Size',
        inquiryType: 'General Inquiry', // <-- 2. Added default state for Inquiry Type
        message: '',
    });
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

    // 3. Automatically detect URL parameter and update dropdown on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const typeParam = params.get('type');

            if (typeParam === 'demo') {
                setFormData((prev) => ({ ...prev, inquiryType: 'Request Demo' }));
            } else if (typeParam === 'pricing') {
                setFormData((prev) => ({ ...prev, inquiryType: 'Pricing Information' }));
            } else if (typeParam === 'careers') {
                setFormData((prev) => ({ ...prev, inquiryType: 'Careers' }));
            }
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simple client-side validation
        if (!formData.fullName || !formData.email || !formData.message) {
            setStatus('error');
            alert('Please fill in all required fields (Name, Email, Message).');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                // Reset full form including the new inquiryType field
                setFormData({
                    fullName: '', email: '', company: '',
                    companySize: 'Select Size', inquiryType: 'General Inquiry', message: ''
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server failed to send email.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            alert(`Error: ${error.message}. Please try again.`);
        }
    };

    const isSubmitting = status === 'loading';

    // Data from the provided design image with clickable links
    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            detail: 'contact@minervasutra.com',
            subtext: 'Drop us a line anytime',
            href: 'mailto:contact@minervasutra.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            detail: '+91 6290735934',
            subtext: 'Mon-Fri, 9am-6pm EST',
            href: 'tel:+916290735934'
        },
        {
            icon: MapPin,
            title: 'Office',
            detail: 'Park Circus, Kolkata, West Bengal',
            subtext: 'West Bengal, PIN-700017',
            href: null
        },
        {
            icon: Clock,
            title: 'Hours',
            detail: '9:00 AM - 6:00 PM',
            subtext: 'Pacific Standard Time',
            href: null
        },
    ];

    return (
        <div className="min-h-screen bg-white relative">
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="inline-flex items-center text-sm font-semibold text-fuchsia-600 mb-2">
                    <Heart className="w-4 h-4 mr-2" />
                    We'd love to hear from you
                </div>
                <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900">
                    Get in <span className="text-fuchsia-600">Touch</span>
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Have questions about Minervasutra? Want to schedule a demo? Our team is here to help.
                </p>
            </div>

            {/* Main Content Grid (Form + Info) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* --- 1. Contact Form --- */}
                    <div id="contact-form" className="lg:col-span-1 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

                        {status === 'success' ? (
                            <div className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-base font-semibold text-gray-900">Message Sent Successfully!</h3>
                                    <p className="text-sm text-gray-500 mt-1">We will respond within 24 hours.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-gray-700 font-medium">Full Name <span className="text-red-500">*</span></span>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900 placeholder-gray-500"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-gray-700 font-medium">Email <span className="text-red-500">*</span></span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900 placeholder-gray-500"
                                            placeholder="john@company.com"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-gray-700 font-medium">Company</span>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900 placeholder-gray-500"
                                            placeholder="Acme Inc."
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-gray-700 font-medium">Company Size</span>
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900"
                                        >
                                            <option value="Select Size" className="text-gray-500">Select Size</option>
                                            <option value="1-50 employees">1-50 employees</option>
                                            <option value="51-200 employees">51-200 employees</option>
                                            <option value="201-1000 employees">201-1000 employees</option>
                                            <option value="1000+ employees">1000+ employees</option>
                                        </select>
                                    </label>
                                </div>

                                {/* --- 4. New Inquiry Type Dropdown --- */}
                                <label className="block">
                                    <span className="text-gray-700 font-medium">Inquiry Type</span>
                                    <select
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Request Demo">Request Demo</option>
                                        <option value="Pricing Information">Pricing Information</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Careers">Careers</option>
                                    </select>
                                </label>

                                <label className="block">
                                    <span className="text-gray-700 font-medium">Message <span className="text-red-500">*</span></span>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-gray-900 placeholder-gray-500"
                                        placeholder="Tell us how we can help..."
                                        required
                                    ></textarea>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 text-lg font-semibold rounded-lg text-white transition duration-200 cursor-pointer ${isSubmitting ? 'bg-fuchsia-400 cursor-not-allowed' : 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg'
                                        }`}
                                >
                                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                                </button>

                                {status === 'error' && (
                                    <p className="text-sm text-red-500 mt-2">
                                        There was an error sending your message. Please check the console or try again later.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>

                    {/* --- 2. Contact Information and Live Map --- */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                            <p className="text-gray-600 mb-6">
                                Reach out through any of these channels and we'll respond within 24 hours.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-start space-x-3">
                                        <item.icon className="w-5 h-5 text-fuchsia-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>

                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    className="text-base text-fuchsia-600 hover:text-fuchsia-800 hover:underline transition-colors duration-200"
                                                >
                                                    {item.detail}
                                                </a>
                                            ) : (
                                                <p className="text-base text-fuchsia-600">{item.detail}</p>
                                            )}

                                            <p className="text-xs text-gray-500 mt-1">{item.subtext}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="h-64 rounded-xl overflow-hidden shadow-md border border-gray-200 relative">
                                <iframe
                                    title="Minervasutra Office Location Map"
                                    src="https://maps.google.com/maps?q=22.5415,88.369444&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full border-0 absolute inset-0"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}