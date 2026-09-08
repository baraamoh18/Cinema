import { useState, useEffect, useCallback } from 'react';
import { loadFavourites, deleteFavourite } from './FavouritesModel';
import type { Movie } from '../Home/HomeModel';

export const useFavouritesViewModel = () => {
    const [favourites, setFavourites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const movies = await loadFavourites();
            setFavourites(movies);
        } catch (err: any) {
            setError(err.message || 'Failed to load favourite movies.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load favourites when the screen opens
    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    const removeMovie = async (imdbID: string) => {
        try {
            await deleteFavourite(imdbID);
            // Update local state automatically without reloading from server
            setFavourites(prev => prev.filter(movie => movie.imdbID !== imdbID));
        } catch (err: any) {
            setError(err.message || 'Failed to remove movie from favourites.');
        }
    };

    return {
        favourites,
        loading,
        error,
        loadMovies,
        removeMovie
    };
};
