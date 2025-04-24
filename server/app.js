require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const path = require("path");

app.use(cors({
    origin: 'https://clearpillar.us',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// For certbot autorenewal of certificate
app.use('/.well-known/acme-challenge', express.static(path.join(__dirname, '../../.well-known/acme-challenge')));

app.use('/api', routes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

module.exports = app;
