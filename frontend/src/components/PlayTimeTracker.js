import { useState, useEffect } from "react";
import api from "../utils/api"; // axios configurado
import "./PlayTimeTracker.css";

export default function PlayTimeTracker({ gameId, gameTitle }) {
  const [hours, setHours] = useState(0);
  const [saving, setSaving] = useState(false);

  // 🔹 Cargar horas desde MongoDB
  useEffect(() => {
    const fetchHours = async () => {
      if (!gameId) return;
      try {
        const res = await api.get(`/games/${gameId}`);
        // ✅ Aquí la respuesta viene en res.data
        setHours(res.hoursPlayed || 0);
      } catch (err) {
        console.error("Error cargando horas:", err);
      }
    };
    fetchHours();
  }, [gameId]);

  // 🔹 Actualizar horas en MongoDB
  const updateHours = async (newHours) => {
    if (!gameId) return;
    setSaving(true);
    try {
      const res = await api.put(`/games/${gameId}`, { hoursPlayed: newHours });
      setHours(res.hoursPlayed || newHours);
    } catch (err) {
      console.error("Error guardando horas:", err);
      alert("No se pudo actualizar las horas en la base de datos");
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Nivel de jugador
  const getCharacter = () => {
    if (hours < 5) return { img: "/avatars/noob.png", label: "🧢 Novato" };
    if (hours < 10) return { img: "/avatars/intermediate.png", label: "⚡ Intermedio" };
    return { img: "/avatars/pro.png", label: "🔥 PRO" };
  };

  const { img, label } = getCharacter();

  return (
    <div className="playtime-card">
      <div className="playtime-left">
        <img src={img} alt="avatar" className="avatar" />
        <div className="playtime-info">
          <h3>{gameTitle}</h3>
          <p className="rank">{label}</p>
        </div>
      </div>

      <div className="playtime-right">
        <div className="counter">
          <button onClick={() => updateHours(Math.max(0, hours - 1))} disabled={saving}>−</button>
          <span>{hours} h</span>
          <button onClick={() => updateHours(hours + 1)} disabled={saving}>＋</button>
        </div>
        <p className="note">¡Juega más para subir de nivel!</p>
      </div>
    </div>
  );
}