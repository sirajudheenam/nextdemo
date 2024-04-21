import Link from "next/link";
import { determineSearchParamsType } from '@/utils/objectUtils';

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const { slug } = params;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Page</h1>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 mb-4">
                <h1 className="text-xl font-semibold mb-2">Params Slug:</h1>
                <p className="text-gray-800">{slug}</p>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 mb-4">
                <h1 className="text-xl font-semibold mb-2">Search Parameters:</h1>
                {determineSearchParamsType(searchParams) === 'undefined' && (
                    <p className="text-gray-800">Undefined</p>
                )}
                {determineSearchParamsType(searchParams) === 'object' && (
                    <p className="text-gray-800">Object</p>
                )}
                {determineSearchParamsType(searchParams) === 'arrayOfObjects' && (
                    <p className="text-gray-800">Array</p>
                )}
            </div>

            <Link href="/admin/shop" className="text-blue-600 hover:underline">
                Back to Shop
            </Link>
        </div>
    );
}
