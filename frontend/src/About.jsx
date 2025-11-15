import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-content">
        <div className="about-image-wrapper">
          <img
            src="/images/2-removebg-preview.png"
            alt="Camila"
            className="about-image"
          />
        </div>
        <div className="about-details">
          <p className="text">
          Hola, soy Camila 👋 y este es mi proyecto final: GameTracker. Es una página pensada para que puedas descubrir juegos que te ayuden a aprender programación, lógica y conceptos tecnológicos mientras te diviertes.

Quería crear algo útil y educativo, porque muchas veces es difícil encontrar juegos que enseñen programación de manera divertida.

Para construir la página, utilicé React.js para la interfaz, Node.js con Express para el backend y MongoDB para guardar los juegos, reseñas y estadísticas. Los estilos y animaciones están hechos con CSS, incluyendo modo oscuro para que la experiencia sea más agradable.

Este proyecto fue muy divertido y desafiante. Aprendí a combinar React con Express y MongoDB, manejar estados y props, actualizar datos en tiempo real y trabajar con rutas dinámicas. También entendí la importancia de planificar cada paso y mantener el proyecto bien organizado.

GameTracker es mi proyecto final de Jovenes CreaTivos, creado para ayudar a otros a aprender jugando. Estoy muy orgullosa de haberlo hecho yo misma, con mucha dedicación y pasión.
          </p>
        </div>
      </div>
    </section>
  );
}