import { addFavourite, removeFavourite, getFavourites } from '../../services/firebaseService';
import type { Movie } from '../Home/HomeModel';

export const loadFavourites = (): Promise<Movie[]> => {
    return getFavourites();
};

export const saveFavourite = (movie: Movie): Promise<void> => {
    return addFavourite(movie);
};

export const deleteFavourite = (imdbID: string): Promise<void> => {
    return removeFavourite(imdbID);
};
