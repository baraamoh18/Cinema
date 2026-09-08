import React from 'react';
import type { Movie } from '../../pages/Home/HomeModel';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  onAction?: (movie: Movie) => void;
  actionLabel?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onAction, actionLabel = 'Favourite' }) => {
  return (
    <div className="movie-card">
      <div className="movie-card__poster-wrapper">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : ''}
          alt={movie.Title}
          className="movie-card__poster"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            (e.currentTarget.nextSibling as HTMLElement | null)?.style.setProperty('display', 'flex');
          }}
        />
        <div className="movie-card__poster-fallback" style={{ display: 'none' }}>
          🎬
        </div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">Year: {movie.Year}</p>
        <p className="movie-card__type">Type: {movie.Type}</p>
        <button 
          type="button" 
          className="movie-card__favourite-btn"
          onClick={() => onAction && onAction(movie)}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
