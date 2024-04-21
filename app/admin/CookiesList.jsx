import { cookies } from 'next/headers';

function CookiesList() {
    const cookieStore = cookies();
    console.log("cookieStore:", cookieStore);
    const hasCookie = cookieStore.has('theme');
    console.log("hasCookie:", hasCookie);

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Cookies List</h1>
            {cookieStore.getAll().map((cookie) => (
                <div key={cookie.name} className="border p-4 my-4 rounded-md shadow-md">
                    <p className="text-lg font-medium">Name: {cookie.name}</p>
                    <p className="text-gray-700">Value: {cookie.value}</p>
                </div>
            ))}
            <div className="mt-4">
                <p className="text-lg">Does it have a cookie named 'theme'?</p>
                <p className="text-xl font-bold text-indigo-600">{hasCookie ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
}

export default CookiesList;