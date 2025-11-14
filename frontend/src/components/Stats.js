import React, { useEffect, useState } from "react";
import api from "../utils/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, LabelList
} from "recharts";
import "./Stats.css";

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get("/stats");
        setStats(data);
        console.log("📊 Datos de estadísticas recibidos:", data);
      } catch (err) {
        console.error("❌ Error cargando estadísticas:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  const barData = [
    { name: "PC", juegos: stats.pcTotal },
    { name: "Mobile", juegos: stats.mobileTotal },
    { name: "Switch", juegos: stats.switchTotal }
  ];

  const lineData = (stats.weeklyHours || []).map(item => ({
    game: item.game,
    hours: Number(item.hours) || 0
  })).sort((a, b) => b.hours - a.hours);

  const pieData = [
    { name: "Completados", value: stats.completed },
    { name: "Pendientes", value: stats.pending }
  ];

  const COLORS = ["#5ef1f2", "#c77dff"];

  return (
    <div className="stats-container">
      <h3 style={{ textAlign: "center", textTransform: "uppercase", marginBottom: "20px" }}>
      📊 ESTADISTICAS GENERALES
      </h3>


      <div className="charts">

        {/* Gráfico de barras */}
        <div className="chart-card">
          <h4 style={{ color: "#c77dff", marginBottom: "12px" }}>Juegos por plataforma</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontWeight: 600, fill: "#333" }} />
              <YAxis style={{ fontWeight: 600, fill: "#333" }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#2c2c3e", border: "1px solid #555", borderRadius: 8 }}
                itemStyle={{ color: "#fff", fontWeight: 500 }}
                labelStyle={{ color: "#5ef1f2", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ color: "#333", fontWeight: 600 }} />
              <Bar dataKey="juegos" fill="#5ef1f2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

       {/* Gráfico de líneas */}
<div className="chart-card">
  <h4 style={{ color: "#c77dff", marginBottom: "12px" }}>Juegos más jugados</h4>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      
      {/* ❌ Quitamos los nombres del eje X */}
      <XAxis dataKey="game" tick={false} axisLine={false} />

      <YAxis style={{ fontWeight: 600, fill: "#333" }} />
      <Tooltip 
        contentStyle={{ backgroundColor: "#2c2c3e", border: "1px solid #555", borderRadius: 8 }}
        itemStyle={{ color: "#fff", fontWeight: 500 }}
        labelStyle={{ color: "#5ef1f2", fontWeight: 600 }}
      />
      <Legend wrapperStyle={{ color: "#333", fontWeight: 600 }} />
      <Line
        type="monotone"
        dataKey="hours"
        stroke="#c77dff"
        strokeWidth={3}
        activeDot={{ r: 6 }}
      >
        <LabelList
          dataKey="hours"
          position="top"
          formatter={(value) => `${value}h`}
        />
      </Line>
    </LineChart>
  </ResponsiveContainer>
</div>

        {/* Gráfico circular */}
        <div className="chart-card">
          <h4 style={{ color: "#c77dff", marginBottom: "12px" }}>Progreso general</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100} // más grande para que no se corte
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#2c2c3e", border: "1px solid #555", borderRadius: 8 }}
                itemStyle={{ color: "#fff", fontWeight: 500 }}
                labelStyle={{ color: "#5ef1f2", fontWeight: 600 }}
              />
              <Legend wrapperStyle={{ color: "#333", fontWeight: 600 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}