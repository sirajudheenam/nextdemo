'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const pathSegments = router?.asPath?.split('/').filter(segment => segment !== '');

    console.log("router", router);
    console.log("pathSegments", pathSegments);
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4 flex items-center">
                {/* Breadcrumbs */}
                <nav className="text-sm">
                    <Link href="/admin" className="hover:underline">
                        Admin
                    </Link>
                    {pathSegments?.map((segment, index) => (
                        <span key={index}>
                            {' '}
                            /{' '}
                            <Link href={`/${pathSegments?.slice(0, index + 1).join('/')}`} className="hover:underline">
                                {segment}
                            </Link>
                        </span>
                    ))}
                </nav>

                {/* Menu Items for Blog Posts */}
                <div className="ml-auto flex space-x-4">
                    {/* Sample Menu Items (Replace with actual blog post links) */}
                    <Link href="/admin/posts" className="hover:underline">
                        Posts
                    </Link>
                    <Link href="/admin/shop" className="hover:underline">
                        Shop
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
