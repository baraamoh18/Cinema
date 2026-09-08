import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else if (searchTerm.trim().length === 0) {
      navigate(`/`);
    }
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/" className="header__link" end>
          Home
        </NavLink>
        {user && (
          <NavLink to="/favourites" className="header__link">
            Favourites
          </NavLink>
        )}
      </nav>
      
      <div className="header__right">
        <form className="header__search" onSubmit={handleSearch}>
          <input
            type="search"
            className="header__search-input"
            placeholder="Search movies..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="header__search-button">
            Search
          </button>
        </form>

        <div className="header__auth">
          {user ? (
            <>
              <span className="header__user-email">{user.email}</span>
              <button onClick={logout} className="header__link header__logout-btn">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/auth" className="header__link header__login-btn">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header
