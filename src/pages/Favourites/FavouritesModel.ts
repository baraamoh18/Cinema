import { addFavourite, removeFavourite, getFavourites } from '../../services/firebaseService';
import type { Movie } from '../Home/HomeModel';

export const loadFavourites = (userId: string): Promise<Movie[]> => {
    return getFavourites(userId);
};

export const saveFavourite = (userId: string, movie: Movie): Promise<void> => {
    return addFavourite(userId, movie);
};

export const deleteFavourite = (userId: string, imdbID: string): Promise<void> => {
    return removeFavourite(userId, imdbID);
};
