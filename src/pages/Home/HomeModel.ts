import { searchMovies } from '../../services/omdbMovieService';

export interface Movie {
    [key: string]: any;
}

export const getMovies = (query: string): Promise<Movie[]> => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
        return Promise.resolve([]);
    }
    return searchMovies(trimmedQuery);
};

const SEED_KEYWORDS = [
    'Batman', 'Avengers', 'Harry Potter', 'Star Wars', 'Spider-Man',
    'Marvel', 'Disney', 'Matrix', 'Lord of the Rings', 'Fast',
    'Mission Impossible', 'Pixar', 'Horror', 'Comedy', 'Action'
];

export const initialMovies = async (): Promise<Movie[]> => {
    // Select 4 random keywords to ensure we have enough movies to get at least 20 unique ones
    const shuffledSeeds = [...SEED_KEYWORDS].sort(() => 0.5 - Math.random());
    const selectedKeywords = shuffledSeeds.slice(0, 4);

    // Fetch movies in parallel
    const promises = selectedKeywords.map(keyword => getMovies(keyword));
    const results = await Promise.all(promises);

    // Merge into a single array
    const allMovies = results.flat();

    // Remove duplicates using imdbID
    const uniqueMoviesMap = new Map<string, Movie>();
    allMovies.forEach(movie => {
        if (movie && movie.imdbID && !uniqueMoviesMap.has(movie.imdbID)) {
            uniqueMoviesMap.set(movie.imdbID, movie);
        }
    });

    const uniqueMovies = Array.from(uniqueMoviesMap.values());

    // Shuffle final array
    const shuffledMovies = uniqueMovies.sort(() => 0.5 - Math.random());

    // Return exactly 20 unique movies
    return shuffledMovies.slice(0, 20);
};
