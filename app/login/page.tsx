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
        <div className="min-h-screen bg-[#1a1d2e] flex items-center justify-center p-4">
            {/* Login container */}
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="relative h-24 w-auto">
                        <Image
                            src="/logo.png"
                            alt="Accenture Logo"
                            width={96}
                            height={96}
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                </div>

                {/* Header Text */}
                <div className="text-center space-y-6">
                    <h1 className="text-5xl font-bold text-white mb-2">Order To Cash</h1>
                    <p className="text-xl font-medium text-[#A100FF]">Embrace the power of unified data</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#2a2d3e] rounded-2xl border border-gray-700 p-8 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Password field */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-[#A100FF]" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-[#363a4f] border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A100FF]/20 focus:border-[#A100FF] transition-all"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#A100FF] hover:bg-[#8800DD] text-white font-semibold rounded-xl shadow-lg shadow-[#A100FF]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 Accenture. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
} 