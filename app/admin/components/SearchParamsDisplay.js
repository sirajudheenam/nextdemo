const SearchParamsDisplay = ({ sParams }) => {
    // Convert query object to array of [key, value] pairs
    const searchParamsArray = Object.entries(sParams);

    return (
        <div className="max-w-lg mx-auto mt-8 mb-10">
            <h1 className="text-2xl font-bold mb-4">Search Parameters</h1>
            <div className="bg-white p-4 rounded-md shadow-md">
                {searchParamsArray.length > 0 ? (
                    <ul>
                        {searchParamsArray.map(([key, value]) => (
                            <li key={key} className="mb-2">
                                <span className="font-semibold">{key}:</span> {value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No search parameters found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchParamsDisplay;