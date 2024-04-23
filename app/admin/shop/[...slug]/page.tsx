import Link from "next/link";
import { determineSearchParamsType } from '@/utils/objectUtils';
// import { useRouter } from 'next/navigation';
import SearchParamsDisplay from '@/app/admin/components/SearchParamsDisplay';

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // const router = useRouter();
    const { slug } = params;
    // const { query } = router;

    return (
        <div className="p-8 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4">My Page</h1>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 mb-4">
                <h1 className="text-xl font-semibold mb-2">Params Slug:</h1>
                <p className="text-gray-800">{slug}</p>
            </div>

            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 mb-4">
                <h1 className="text-xl font-semibold mb-2">Search Parameters: is </h1>
                {determineSearchParamsType(searchParams) === 'undefined' && (
                    <p className="text-gray-800">Undefined</p>
                )}
                {determineSearchParamsType(searchParams) === 'object' && (
                    <p className="text-gray-800">an Object</p>
                )}
                {determineSearchParamsType(searchParams) === 'arrayOfObjects' && (
                    <p className="text-gray-800">an Array</p>
                )}
            </div>
            <SearchParamsDisplay sParams={searchParams} />
            <Link href="/admin/shop" className="text-blue-600 hover:underline mt-20 p-14">
                Back to Shop
            </Link>
        </div>
    );
}


