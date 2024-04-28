"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useColorSchemeStore } from '@/providers/color-scheme-store-provider';


const Nav = ({ dark, toggleDarkMode }) => {

    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const currentPath = usePathname();

    const { darkMode, activateDarkMode } = useColorSchemeStore(
        (state) => state,
    );

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    useEffect(() => {
        activateDarkMode(dark);
    }, [dark, activateDarkMode]);

    // console.log('darkMode', darkMode);

    return (
        <>
            <header className="bg-gray-800 text-white py-4 sticky top-0 z-10" >
                {/* <div className="container mx-auto flex justify-between items-center"> */}
                {/* <h1 className="bg-gray-800 text-lg font-bold text-white">My Next.js App</h1> */}
                <nav className='flex-between w-full mb-16 pt-3'>
                    <Link href='/' className='flex gap-2 flex-center'>
                        {/* Image with src "/assets/images/logo.svg" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold. */}
                        {/* Read more: https://nextjs.org/docs/api-reference/next/image#priority */}
                        <Image
                            src='/assets/images/logo.svg'
                            alt='logo'
                            width={30}
                            height={30}
                            className='object-contain'
                            // Image with src "/assets/images/logo.svg" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
                            // Read more: https://nextjs.org/docs/api-reference/next/image#priority
                            priority={true}
                        />
                        <p className='logo_text'>NextDemo</p>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='sm:flex hidden'>
                        {session?.user ? (
                            <div className='flex gap-3 md:gap-5'>

                                {currentPath === '/posts' && (
                                    <Link href='/posts/create-post' className='black_btn'>
                                        Create Post
                                    </Link>
                                )}
                                {currentPath === '/todos' && (
                                    <Link href='/todos/create-todo' className='black_btn'>
                                        Create Todo
                                    </Link>
                                )}
                                {currentPath !== '/posts' && (
                                    <Link href='/posts' className='black_btn'>
                                        Posts
                                    </Link>
                                )}
                                {currentPath !== '/todos' && (
                                    <Link href='/todos' className='black_btn'>
                                        Todos
                                    </Link>
                                )}

                                <button type='button' onClick={signOut} className='outline_btn'>
                                    Sign Out
                                </button>

                                <Link href='/profile'>
                                    <Image
                                        src={session?.user.image}
                                        width={37}
                                        height={37}
                                        className='rounded-full'
                                        alt='profile'
                                    />
                                </Link>
                                {/* Include dark mode toggle button in the header */}
                                {/* <button onClick={toggleDarkMode} className="text-orange-500">
                                    {dark ? 'Light Mode' : 'Dark Mode'}
                                </button> */}
                                {/* Dark mode toggle button */}
                                <button onClick={toggleDarkMode} className="flex items-center mr-10">
                                    {/* <span className="mr-2 text-orange-500">{darkMode ? 'Light Mode' : 'Dark Mode'}</span> */}
                                    <div
                                        className={`w-12 h-6 bg-gray-400 rounded-full p-1 duration-300 ease-in-out ${darkMode ? 'bg-blue-600 translate-x-6' : 'bg-gray-200'
                                            }`}
                                    >
                                        <div
                                            className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <button
                                            type='button'
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                            className='black_btn'
                                        >
                                            Sign in
                                        </button>
                                    ))}
                            </>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className='sm:hidden flex relative'>
                        {session?.user ? (
                            <div className='flex'>
                                <Image
                                    src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className='rounded-full'
                                    alt='profile'
                                    onClick={() => setToggleDropdown(!toggleDropdown)}
                                />

                                {toggleDropdown && (
                                    <div className='dropdown'>
                                        <Link
                                            href='/profile'
                                            className='dropdown_link'
                                            onClick={() => setToggleDropdown(false)}
                                        >
                                            My Profile
                                        </Link>

                                        {currentPath !== '/posts' && (
                                            <Link href='/posts'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}>
                                                Posts
                                            </Link>
                                        )}
                                        {currentPath !== '/todos' && (
                                            <Link href='/todos'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}
                                            >
                                                Todos
                                            </Link>
                                        )}

                                        {currentPath === '/posts' && (
                                            <Link
                                                href='/posts/create-post'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}
                                            >
                                                Create Post
                                            </Link>
                                        )}

                                        {currentPath === '/todos' && (
                                            <Link
                                                href='/todos/create-todo'
                                                className='dropdown_link'
                                                onClick={() => setToggleDropdown(false)}
                                            >
                                                Create Todo
                                            </Link>
                                        )}

                                        <button
                                            type='button'
                                            onClick={() => {
                                                setToggleDropdown(false);
                                                signOut();
                                            }}
                                            className='mt-5 w-full black_btn'
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <button
                                            type='button'
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                            className='black_btn'
                                        >
                                            Sign in
                                        </button>
                                    ))}
                            </>
                        )}
                    </div>
                </nav>
                {/* Dark mode toggle button */}
                {/* <button onClick={activateDarkMode} className="flex items-center">
                    <span className="mr-2">Dark Mode</span>
                    <div
                        className={`w-12 h-6 bg-gray-400 rounded-full p-1 duration-300 ease-in-out ${darkMode ? 'bg-blue-600 translate-x-6' : 'bg-gray-200'
                            }`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${darkMode ? 'translate-x-6' : 'translate-x-0'
                                }`}
                        />
                    </div>
                </button> */}
                {/* </div> */}
            </header >
        </>
    );
};

export default Nav;