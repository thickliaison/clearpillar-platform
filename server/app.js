require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const routes = require('./routes');
const path = require('path')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  app.use(cors({
    origin: ['http://localhost:3000', 'https://clearpilar.us'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// necessary for npm run build on client-side
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// default
app.get('/', (req, res) => {
    console.log('Starting server successfully.')
    res.send('Welcome to the server!');
});

app.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
  });  

module.exports = app;