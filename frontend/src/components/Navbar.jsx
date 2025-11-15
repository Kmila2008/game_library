import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onSearch, darkMode, setDarkMode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Toggle del buscador
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // Enviar búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <nav className="navbar">
      {/* Izquierda: logo + links */}
      <div className="nav-left">
        <Link to="/" className="logo">🎮 GameTracker</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

     
      <div className="nav-right">

       
        {location.pathname === "/" && (
          <>
            <button className="search-toggle" onClick={handleSearchToggle}>
              🔍
            </button>

            {searchOpen && (
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Buscar juegos o reseñas..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Buscar</button>
              </form>
            )}
          </>
        )}

        {/* Toggle modo oscuro */}
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Avatar */}
        <img
          src="https://via.placeholder.com/35"
          alt="Avatar"
          className="avatar"
        />
      </div>
    </nav>
  );
}