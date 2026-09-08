import { useHomeViewModel } from './useHomeViewModel';
import MovieCard from '../../components/MovieCard/MovieCard';
import './HomeView.css';

function HomeView() {
  const { movies, loading, error, handleAddToFavourites, toastMessage } = useHomeViewModel();

  return (
    <div className="home-view">
      {loading && <p className="loading-message">Loading...</p>}
      
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID || movie.Title} 
              movie={movie} 
              onAction={handleAddToFavourites}
            />
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <p>No movies to display. Try searching!</p>
      )}

      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default HomeView;
