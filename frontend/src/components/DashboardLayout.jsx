import React from "react";
import "./DashboardLayout.css";
import Navbar from './Navbar';

export default function DashboardLayout({ sidebar, content, extra }) { 
  return (
    <>
      <Navbar /> {/* ← Ponerlo fuera del grid */}
      <div className="dashboard">
        <aside className="sidebar">
          <h2 className="logo">🎮 GameTracker</h2>
          {sidebar}
        </aside>

        <main className="main-content">
          <section className="content-section">{content}</section>
        </main>

        {extra && <aside className="extra-panel">{extra}</aside>}
      </div>
    </>
  );
}