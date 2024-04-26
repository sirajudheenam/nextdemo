
'use client';
import { useState } from 'react';
import SideMenu from '@/app/admin/formhandling/SideMenu';
import ToDoListForm from '@/app/admin/formhandling/ToDoListForm';
export default async function page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((previousState) => (!previousState));
    };

    return (
        <div>
            <button onClick={toggleMenu} className="block lg:hidden fixed right-4 top-4 z-10 text-white">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    {isMenuOpen ? (
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.414 6L10 9.414 6.586 6 5.172 7.414 8.586 11l-3.414 3.414L6 16.828 10 12.414 13.414 16l1.414-1.414L11.414 11l3.414-3.414L13.414 6zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                    ) : (
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 9a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0V9zm5-4a1 1 0 0 1 0 2h9a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2zm-5 8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2H3zm0 4a1 1 0 0 1 0-2h9a1 1 0 0 1 0 2H3z" />
                    )}
                </svg>
            </button>
            <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
            <div className="ml-64"> {/* Adjust left margin to accommodate sidebar width */}</div>
            {/* Main content of the page */}
            <ToDoListForm />
        </div>
    );
};