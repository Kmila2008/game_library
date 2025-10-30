import React from "react"; import "./DashboardLayout.css"; 
import { Link } from "react-router-dom";
export default function DashboardLayout({ sidebar, content, extra }) { 

  return ( 
    <div className="dashboard">
    <aside className="sidebar">
      <h2 className="logo">🎮 GameTracker</h2>
      {sidebar}
    </aside>

    <main className="main-content">
      <div className="topbar">
        <h2>👤 Jugador</h2>
        <div className="search-area">
          <input type="text" placeholder="Buscar juegos o reseñas..." />
          <button>Buscar</button>
        </div>
      </div>

      <section className="content-section">{content}</section>
    </main>

    {extra && <aside className="extra-panel">{extra}</aside>}
  </div>
);
}