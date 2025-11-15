const mongoose = require('mongoose');
const Game = require('./models/Game');
require('dotenv').config();

/* URI de conexión a MongoDB */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamelib';

/* Lista de juegos para inicializar la base de datos */
const games = [
  { title: 'Among Us', 
    genero: 'Party', 
    plataforma: 'Mobile', 
    descripcion: 'Social deduction', 
    coverUrl: '/images/among-us.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://play.google.com/store/apps/details?id=com.innersloth.spacemafia&hl=es_CO' 
  },

  { title: 'CSSBattle', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende CSS de manera divertida', 
    coverUrl: '/images/css.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://cssbattle.dev/' },

  { title: 'CheckiO', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Plataforma para aprender Python y JavaScript', 
    coverUrl: '/images/checkio.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://checkio.org/' },

  { title: 'Coddy', 
    genero: 'Educativo', 
    plataforma: 'Mobile', 
    descripcion: 'Aprende programación de forma interactiva', 
    coverUrl: '/images/coddy.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://coddy.tech/journeys/default' },

  { itle: 'CodeCombat', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende a programar jugando', 
    coverUrl: '/images/codecom.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://codecombat.com/' },

  { title: 'CodeMonkey', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende programación para niños y adolescentes', 
    coverUrl: '/images/mono.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://www.codemonkey.com/' },

  { title: 'CodinGame', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende programación con desafíos y juegos', 
    coverUrl: '/images/ding.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://www.codingame.com/start/' },

  { title: 'Codédex', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende conceptos de programación paso a paso', 
    coverUrl: '/images/mi-ex.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://www.codedex.io/' },

  { title: 'CryptoZombies', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende a programar smart contracts en Solidity', 
    coverUrl: '/images/zombies.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://cryptozombies.io/es/' },

  { title: 'Flexbox Froggy', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende CSS Flexbox jugando', 
    coverUrl: '/images/sapito.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://flexboxfroggy.com/#es' },

  { title: 'Mimo', 
    genero: 'Educativo', 
    plataforma: 'PC', 
    descripcion: 'Aprende programación y desarrollo web', 
    coverUrl: '/images/mimo.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://mimo.org/' },

  {  title: 'The Legend of Zelda: Breath of the Wild', 
    genero: 'Adventure', 
    plataforma: 'Nintendo Switch', 
    descripcion: 'Open-world adventure', 
    coverUrl: '/images/legend-zelda.jpeg', 
    completed: false, 
    hoursPlayed: 0, 
    playUrl: 'https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/The-Legend-of-Zelda-Breath-of-the-Wild-1173609.html' 
  }
];

/* Conectar a MongoDB y agregar los juegos si no existen */
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected, seeding...');

/* Generar slug a partir del título */
    for (let g of games) {
      g.slug = g.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,'-')
        .replace(/(^-|-$)/g,'');
      
      // ✅ Solo agrega si no existe
      const exists = await Game.findOne({ slug: g.slug });
      if (!exists) {
        await new Game(g).save();
        console.log(`Agregado: ${g.title}`);
      } else {
        console.log(`Ya existe: ${g.title}`);
      }
    }

    console.log('Seed complete');
    process.exit(0);
  })
  .catch(err => console.error(err));