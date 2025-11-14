import React, { useState } from 'react';
import api from '../utils/api';
import './GameForm.css';

export default function GameForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const game = await api.post('/games', { title, genre, platform });
    onCreate && onCreate(game);
    setTitle('');
    setGenre('');
    setPlatform('');
  };

  return (
    <div className="form-agregar-container">
      <h2 className="titulo-agregar">Agregar juego</h2>
      <form className="game-form" onSubmit={submit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título (ej: Minecraft)"
          required
        />
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Género (ej: Sandbox)"
        />
        <input
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Plataforma (ej: PC)"
        />
        <button type="submit" className="agregar-juego">Agregar</button>
      </form>
    </div>
  );
}
