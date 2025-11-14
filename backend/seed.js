/**
 * Simple seeder to add 10 sample games.
 * Usage: node seed.js (make sure MONGODB_URI env var is set or local MongoDB running)
 */
const mongoose = require('mongoose');
const Game = require('./models/Game');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamelib';

const games = [
  { title: 'Minecraft', genero: 'Sandbox', plataforma: 'PC', descripcion: 'Build and explore', coverUrl: '' },
  { title: 'Clash Royale', genero: 'Strategy', plataforma 'Mobile', descripcion: 'Real-time PvP card battles' },
  { title: 'Valorant', genero: 'FPS', plataforma: 'PC', description: 'Tactical shooter' },
  { title: 'Hollow Knight', genero: 'Metroidvania', plataforma: 'PC', descripcion: 'Exploration and combat' },
  { title: 'Stardew Valley', genero: 'Simulation', plataforma: 'PC', descripcion: 'Farming and life sim' },
  { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Adventure', plataforma: 'Switch', descripcion: 'Open-world adventure' },
  { title: 'Among Us', genero: 'Party', plataforma: 'PC', descripcion: 'Social deduction' },
  { title: 'Rocket League', genero: 'Sports', plataforma: 'PC', descripcion: 'Car soccer' },
  { title: 'Celeste', genero: 'Platformer', plataforma: 'PC', descripcion: 'Precision platforming' },
  { title: 'The Witcher 3', genero: 'RPG', plataforma: 'PC', descripcion: 'Open-world RPG' }
];

mongoose.connect(MONGODB_URI).then(async ()=> {
  console.log('Connected, seeding...');
  await Game.deleteMany({});
  for (let g of games) {
    g.slug = g.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    await new Game(g).save();
  }
  console.log('Seed complete');
  process.exit(0);
}).catch(err => console.error(err));
