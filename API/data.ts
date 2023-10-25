import { NextApiRequest, NextApiResponse } from 'next';
import { fetcher } from './fetchers';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const apiUrl = 'https://api.pokemontcg.io/v2/cards/base1-30';

        // Fetch data using the custom fetcher with the API key
        const data = await fetcher(apiUrl);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}