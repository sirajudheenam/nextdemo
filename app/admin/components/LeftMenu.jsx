'use client';
import { useState } from 'react';
import Link from 'next/link';

const LeftMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((currentOpenState) => !currentOpenState);
    };

    return (
        <div className="fixed inset-y-0 right-0 bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ease-in-out transform">
            <div className="flex justify-end">
                <button
                    className="text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                >
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            <div className={`mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul>
                    <li className="mb-2">
                        <Link href="/admin/posts" className="text-white hover:underline">
                            Admin Posts
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/admin/shop" className="text-white hover:underline">
                            Admin Shop
                        </Link>
                    </li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
        </div>
    );
};

export default LeftMenu;
