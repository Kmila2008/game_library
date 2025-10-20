# Game Library (Fullstack scaffold)

Carpetas principales:
- backend/  -> Node.js + Express + Mongoose API
- frontend/ -> React app (simple UI)

Cómo usar (resumen):
1. Backend:
   - Copia `.env.example` a `.env` y ajusta MONGODB_URI y PORT.
   - `cd backend && npm install`
   - `npm run seed` (opcional: poblar 10 juegos)
   - `npm run dev` o `npm start`

2. Frontend:
   - `cd frontend && npm install`
   - `npm start` (asegúrate de que REACT_APP_API_BASE apunte a la API si está en otro puerto)

Endpoints:
- GET /api/games?q=&genre=&platform=&completed=
- GET /api/games/:id
- POST /api/games
- PUT /api/games/:id
- DELETE /api/games/:id

- GET /api/reviews?q=&gameId=
- POST /api/reviews
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

Este scaffold está diseñado para que lo adaptes a las carpetas que ya tengas. Si quieres que lo inserte dentro del ZIP que me adjuntaste, dime y lo integro directamente en esa estructura.
