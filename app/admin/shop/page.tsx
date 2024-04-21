import Link from "next/link";

function ShopHomePage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Shop Home Page</h1>

            <div className="mb-4">
                <Link href="/admin/shop/0?firstname=femida&lastname=hasina" className="text-blue-600 hover:underline">[searchParams]
                </Link>
            </div>

            <div className="mb-4">
                <Link href="/admin/shop/1" className="text-blue-600 hover:underline">[slug]
                </Link>
            </div>

            <div className="mb-4">
                <Link href="/admin/shop/2/4" className="text-blue-600 hover:underline">[...slug]
                </Link>
            </div>
        </div>
    );
}

export default ShopHomePage;
