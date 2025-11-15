import React, { useState } from 'react';
import api from '../utils/api';
import './GameForm.css';

export default function GameForm({ onCreate }) {
  // Estados para cada input
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [coverUrl, setCoverUrl] = useState(''); 

  // Enviar formulario
  const submit = async (e) => {
    e.preventDefault();
    const game = await api.post('/games', { title, genre, platform, coverUrl }); 
    onCreate && onCreate(game); 
    // Limpiar inputs
    setTitle('');
    setGenre('');
    setPlatform('');
    setCoverUrl(''); 
  };

  return (
    <div className="form-agregar-container">
      {/* Título del formulario */}
      <h2 className="titulo-agregar">Agregar juego</h2>

      <form className="game-form" onSubmit={submit}>
        {/* Título */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título (ej: Minecraft)"
          required
        />

        {/* Género */}
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Género (ej: Sandbox)"
        />

        {/* Plataforma */}
        <input
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Plataforma (ej: PC)"
        />
        
        {/* URL de imagen */}
        <input
          type="url"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="URL de la imagen (opcional)"
        />

        {/* Botón enviar */}
        <button type="submit" className="agregar-juego">Agregar</button>
      </form>
    </div>
  );
}