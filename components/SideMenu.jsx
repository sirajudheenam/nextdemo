'use client';

import Link from 'next/link';
import { useGlobalStore } from '@/providers/global-store-provider';


const SideMenu = ({ isOpen, onClose }) => {
    const { darkMode } = useGlobalStore(
        (state) => state,
    );
    return (
        <nav className={`fixed left-0 top-0 h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-64 px-4 py-8 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={onClose} className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} focus:outline-none absolute top-4 right-4`}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul>
                <li className="mb-4">
                    <Link href="/" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-orange-300'}`}>Home
                    </Link>
                </li>
                <li className="mb-4">
                    <Link href="/admin/posts" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-orange-300'}`}>Posts
                    </Link>
                </li>
                <li className="mb-4">
                    <Link href="/admin/todos" className={`${darkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-orange-300'}`}>Todos
                    </Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav >
    );
};



export default SideMenu;