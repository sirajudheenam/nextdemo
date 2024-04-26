'use client';

import Link from 'next/link';

const SideMenu = ({ isOpen, onClose }) => {
    return (
        <nav className={`fixed left-0 top-0 h-full bg-gray-800 text-white w-64 px-4 py-8 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={onClose} className="text-white focus:outline-none absolute top-4 right-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul>
                <li className="mb-4">
                    <Link href="/" className="text-white hover:text-gray-300">Home
                    </Link>
                </li>
                <li className="mb-4">
                    <Link href="/about" className="text-white hover:text-gray-300">About
                    </Link>
                </li>
                <li className="mb-4">
                    <Link href="/services" className="text-white hover:text-gray-300">Services
                    </Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};



export default SideMenu;