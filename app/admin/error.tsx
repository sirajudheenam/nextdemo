"use client";

type ErrorProps = {
    error: Error;
    reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                <h1 className="font-black text-gray-200 text-9xl">500</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    New Error!
                </p>
                <p className="mt-4 text-gray-500">
                    {error.message || "Error Message"}
                </p>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring cursor-pointer"
                >
                    Another Message
                </button>
            </div>
        </div>
    );
}
