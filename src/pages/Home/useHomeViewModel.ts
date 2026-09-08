import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMovies, initialMovies, type Movie } from './HomeModel';
import { saveFavourite } from '../Favourites/FavouritesModel';
import { useAuth } from '../../context/AuthContext';

export const useHomeViewModel = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const navigate = useNavigate();
    const { user } = useAuth();

    const [query, setQuery] = useState<string>(searchQuery);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchMovies = async () => {
            setLoading(true);
            try {
                if (searchQuery.trim().length >= 2) {
                    const searchResults = await getMovies(searchQuery);
                    if (isMounted) setMovies(searchResults);
                } else {
                    const initial = await initialMovies();
                    if (isMounted) setMovies(initial);
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || 'Failed to load movies.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchMovies();
        
        return () => { isMounted = false; };
    }, [searchQuery]);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const fetchedMovies = await getMovies(query);
            setMovies(fetchedMovies);
        } catch (err: any) {
            setError(err.message || 'An error occurred while searching for movies.');
        } finally {
            setLoading(false);
        }
    };

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleAddToFavourites = async (movie: Movie) => {
        if (!user) {
            navigate('/favourites');
            return;
        }

        try {
            await saveFavourite(user.uid, movie);
            setToastMessage(`"${movie.Title}" was added to favourites!`);
            setTimeout(() => setToastMessage(null), 3000);
        } catch (err: any) {
            console.error('Failed to add to favourites:', err);
            setToastMessage(`Failed to save: ${err.message}`);
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    return {
        query,
        setQuery,
        movies,
        loading,
        error,
        handleSearch,
        handleAddToFavourites,
        toastMessage,
    };
};
