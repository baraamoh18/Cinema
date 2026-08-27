import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to="/" className="header__link" end>
          Home
        </NavLink>
        <NavLink to="/favourites" className="header__link">
          Favourites
        </NavLink>
      </nav>
      <div className="header__search">
        <input
          type="search"
          className="header__search-input"
          placeholder="Search movies..."
          aria-label="Search"
        />
        <button type="button" className="header__search-button">
          Search
        </button>
      </div>
    </header>
  )
}

export default Header
