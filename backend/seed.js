/**
 * Simple seeder to add 10 sample games.
 * Usage: node seed.js (make sure MONGODB_URI env var is set or local MongoDB running)
 */
const mongoose = require('mongoose');
const Game = require('./models/Game');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamelib';

const games = [
  { title: 'Minecraft', genre: 'Sandbox', platform: 'PC', description: 'Build and explore', coverUrl: '' },
  { title: 'Clash Royale', genre: 'Strategy', platform: 'Mobile', description: 'Real-time PvP card battles' },
  { title: 'Valorant', genre: 'FPS', platform: 'PC', description: 'Tactical shooter' },
  { title: 'Hollow Knight', genre: 'Metroidvania', platform: 'PC', description: 'Exploration and combat' },
  { title: 'Stardew Valley', genre: 'Simulation', platform: 'PC', description: 'Farming and life sim' },
  { title: 'The Legend of Zelda: Breath of the Wild', genre: 'Adventure', platform: 'Switch', description: 'Open-world adventure' },
  { title: 'Among Us', genre: 'Party', platform: 'PC', description: 'Social deduction' },
  { title: 'Rocket League', genre: 'Sports', platform: 'PC', description: 'Car soccer' },
  { title: 'Celeste', genre: 'Platformer', platform: 'PC', description: 'Precision platforming' },
  { title: 'The Witcher 3', genre: 'RPG', platform: 'PC', description: 'Open-world RPG' }
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
