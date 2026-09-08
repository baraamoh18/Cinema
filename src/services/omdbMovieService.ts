import axios from 'axios';

const API_KEY = '99a08f65';
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export const searchMovies = async (query: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}&s=${query}`);
        if (response.data.Response === 'True') {
            return response.data.Search;
        }
        return [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
