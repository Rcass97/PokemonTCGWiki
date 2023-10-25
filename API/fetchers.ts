import axios from 'axios';

const API_KEY = 'bdcafce3-4507-4ed0-9110-7ad780a12154';

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { fetcher };