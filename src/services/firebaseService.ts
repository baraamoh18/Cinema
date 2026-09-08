import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Movie } from '../pages/Home/HomeModel';

// Initialize Firebase using environment variables in Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize and export the database instances
export const database = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add a movie to favourites
export const addFavourite = async (userId: string, movie: Movie): Promise<void> => {
  try {
    if (!userId) {
      throw new Error("User ID is required to add a favourite");
    }
    if (!movie.imdbID) {
      throw new Error("Movie is missing an imdbID");
    }
    const movieRef = ref(database, `users/${userId}/favourites/${movie.imdbID}`);
    await set(movieRef, movie);
  } catch (error: any) {
    throw new Error(`Failed to add movie to favourites: ${error.message}`);
  }
};

// Remove a movie from favourites by imdbID
export const removeFavourite = async (userId: string, imdbID: string): Promise<void> => {
  try {
    if (!userId) {
      throw new Error("User ID is required to remove a favourite");
    }
    if (!imdbID) {
      throw new Error("imdbID is required to remove a favourite");
    }
    const movieRef = ref(database, `users/${userId}/favourites/${imdbID}`);
    await remove(movieRef);
  } catch (error: any) {
    throw new Error(`Failed to remove movie from favourites: ${error.message}`);
  }
};

// Get all favourite movies
export const getFavourites = async (userId: string): Promise<Movie[]> => {
  try {
    if (!userId) {
      throw new Error("User ID is required to get favourites");
    }
    const favouritesRef = ref(database, `users/${userId}/favourites`);
    const snapshot = await get(favouritesRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      // data is an object with imdbIDs as keys and Movie objects as values
      return Object.values(data) as Movie[];
    }
    return [];
  } catch (error: any) {
    throw new Error(`Failed to get favourite movies: ${error.message}`);
  }
};
