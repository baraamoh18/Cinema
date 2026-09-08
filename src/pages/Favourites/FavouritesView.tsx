import { useFavouritesViewModel } from './useFavouritesViewModel';
import MovieCard from '../../components/MovieCard/MovieCard';
import '../../pages/Home/HomeView.css';

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel();

  return (
    <div className="home-view">
      {loading && <p className="loading-message">Loading your favourites...</p>}
      
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && favourites.length > 0 && (
        <div className="movies-list">
          {favourites.map((movie) => (
            <MovieCard 
               key={movie.imdbID || movie.Title} 
               movie={movie} 
               actionLabel="Remove"
               onAction={() => removeMovie(movie.imdbID)}
            />
          ))}
        </div>
      )}

      {!loading && !error && favourites.length === 0 && (
        <p className="loading-message">You have no favourite movies yet. Go find some!</p>
      )}
    </div>
  );
}

export default FavouritesView;
