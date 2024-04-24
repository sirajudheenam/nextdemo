// Define the fetcher function
const fetcher = async (url) => {
    const response = await fetch(url); // Perform an HTTP GET request
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json(); // Parse response body as JSON
    return data;
};
export default fetcher;