import React from "react";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      {/* === SIDEBAR IZQUIERDA === */}
      <aside className="sidebar">
        <h2>🎮 GameTracker</h2>

        <div className="add-game">
          <h3>Agregar juego</h3>
          <input type="text" placeholder="Título (ej: Minecraft)" />
          <input type="text" placeholder="Género (ej: Sandbox)" />
          <input type="text" placeholder="Plataforma (ej: PC)" />
          <button>Agregar</button>
        </div>

        <div className="stats">
          <h4>Estadísticas</h4>
          <p>Total juegos: 11</p>
          <p>Completados: 0</p>
          <p>Horas jugadas: 0</p>
        </div>
      </aside>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          <h2>👤 Jugador_1</h2>
          <div className="search-area">
            <input type="text" placeholder="Buscar juegos o reseñas..." />
            <button>Buscar</button>
          </div>
        </div>

        {/* CONTENIDO DE PÁGINAS (TUS JUEGOS) */}
        <section className="content-section">{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;