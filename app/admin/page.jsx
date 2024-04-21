import CookiesList from './CookiesList';

export default function AdminPage() {
    return (
        <>
            <div className="max-w-lg mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Admin</h1>
                <a href="/admin/posts" className="text-blue-500 underline">Manage Posts</a>
            </div>
            <CookiesList />
        </>
    );
}
