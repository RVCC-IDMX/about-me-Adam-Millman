exports.handler = async function () {
    try {
        console.log(" APOD Function Triggered!");
        console.log(" NASA_API_KEY from Netlify:", process.env.NASA_API_KEY); // Debug API key

        if (!process.env.NASA_API_KEY) throw new Error(" API key is missing!");

        const API_KEY = process.env.NASA_API_KEY;
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);

        console.log(" APOD API Response Status:", response.status);

        if (!response.ok) throw new Error(` API request failed with status: ${response.status}`);

        const data = await response.json();
        console.log(" APOD API Data:", data); // Debug API response

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(" Error Fetching APOD:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching APOD" }),
        };
    }
};