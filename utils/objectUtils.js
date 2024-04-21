export function determineSearchParamsType(searchParams) {
    if (searchParams === undefined) {
        return 'undefined';
    } else if (typeof searchParams === 'object' && !Array.isArray(searchParams)) {
        // Check if searchParams is a single object
        return 'object';
    } else if (Array.isArray(searchParams) && searchParams.every(item => typeof item === 'object')) {
        // Check if searchParams is an array of objects
        return 'arrayOfObjects';
    } else {
        return 'unknown';
    }
}