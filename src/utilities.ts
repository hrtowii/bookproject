import Cookies from "js-cookie";
export async function post(url: string, data: object): Promise<any> {
    try {
        const token = Cookies.get("token");
        const authenticated = token ? `Bearer ${token}` : ''
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': authenticated,
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify(data),
        });

        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function get(url: string): Promise<any> {
    try {
        const token = Cookies.get("token");
        const authenticated = token ? `Bearer ${token}` : ''
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authenticated,
                // Add any headers if needed
            },
        });

        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const site = "http://localhost:3000/api/v1";