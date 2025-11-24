'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (password === 'Seethefuture') {
            // Set authentication cookie
            document.cookie = 'isAuthenticated=true; path=/; max-age=86400'; // 24 hours
            // Set flag to show disclaimer after login
            sessionStorage.setItem('justLoggedIn', 'true');
            router.push('/');
            router.refresh();
        } else {
            setError('Invalid password');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-gradient flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                {/* Animated dots */}
                <div className="absolute top-20 left-20 w-2 h-2 bg-cyan rounded-full animate-safari-pulse"></div>
                <div className="absolute top-40 right-40 w-2 h-2 bg-cyan rounded-full animate-safari-pulse delay-100"></div>
                <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-cyan rounded-full animate-safari-pulse delay-200"></div>
                <div className="absolute bottom-40 right-20 w-2 h-2 bg-cyan rounded-full animate-safari-pulse delay-300"></div>

                {/* Gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Login card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md px-8"
            >
                {/* Accenture Logo */}
                <div className="flex justify-center mb-12">
                    <div className="relative h-32 w-32">
                        <Image
                            src="/images/Accenture Logo.png"
                            alt="Accenture Logo"
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                </div>

                {/* Logo and title */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-white mb-2">Finance360</h1>
                    <p className="text-cyan text-lg">Embrace the power of unified data</p>
                </div>

                {/* Login form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-cyan/20">
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Password field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-cyan" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-white/10 border border-cyan/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent transition-all"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-cyan transition-colors" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-cyan transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-2 text-red-400 text-sm"
                            >
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-cyan-gradient text-navy-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Delivering data transparency and modernized reporting
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-xs">
                        © 2025 Finance360. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
} 