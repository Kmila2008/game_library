import React from "react";
import "./DashboardLayout.css";

export default function DashboardLayout({ sidebar, content, extra }) {
  return (
    <div className="dashboard">
      {/* Sidebar fijo: aquí va el formulario de agregar juego */}
      <aside className="sidebar">
        {sidebar}
      </aside>

      {/* Contenedor principal para el contenido de juegos y panel extra */}
      <main className="content-area">
        <section className="content">{content}</section>

        {extra && <aside className="extra">{extra}</aside>}
      </main>
    </div>
  );
}