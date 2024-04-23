import { cookies } from 'next/headers';

export default function AdminPage() {
    const cookieStore = cookies();
    const hasCookie = cookieStore.has('theme');

    return (
        <div className="max-w-3xl mx-auto px-4 mt-8">
            {/* Admin Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Admin</h1>
                <a href="/admin/posts" className="text-blue-500 underline">Manage Posts</a>
                <br />
                <a href="/admin/todos" className="text-blue-500 underline">Manage Todos</a>
            </div>

            {/* Cookies List */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cookies List</h2>
                <div className="space-y-4">
                    {cookieStore.getAll().map((cookie) => (
                        <div key={cookie.name} className="border p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">Name: {cookie.name}</p>
                            <p className="text-gray-700">Value: {cookie.value}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <p className="text-lg">Does it have a cookie named `theme`?</p>
                    <p className="text-xl font-bold text-indigo-600">{hasCookie ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    );
}
