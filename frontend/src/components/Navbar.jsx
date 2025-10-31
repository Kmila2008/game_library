import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
    // Aquí puedes integrar búsqueda real si quieres
  };

  return (
    <nav className="navbar">
      {/* IZQUIERDA */}
      <div className="nav-left">
        <Link to="/" className="logo">🎮 GameTracker</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      {/* DERECHA */}
      <div className="nav-right">
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

        <img
          src="https://via.placeholder.com/35" // reemplaza con tu avatar
          alt="Avatar"
          className="avatar"
        />
      </div>
    </nav>
  );
}