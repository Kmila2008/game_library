import React, { useState } from 'react';
import api from '../utils/api';

export default function GameForm({onCreate}){
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const game = await api.post('/games', { title, genre, platform });
    onCreate && onCreate(game);
    setTitle(''); setGenre(''); setPlatform('');
  };

  return (
    <form className='game-form' onSubmit={submit}>
      <h2>Agregar juego</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Título (ej: Minecraft)' required />
      <input value={genre} onChange={e=>setGenre(e.target.value)} placeholder='Género (ej: Sandbox)' />
      <input value={platform} onChange={e=>setPlatform(e.target.value)} placeholder='Plataforma (ej: PC)' />
      <button type='submit'>Agregar</button>
    </form>
  );
}
