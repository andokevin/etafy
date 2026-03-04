// Import des dépendances
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialisation d'Express
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME || 'etafy_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Mettre à true pour voir les requêtes SQL
  }
);

// Test de la connexion à la base de données
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
  }
}

testConnection();

// Définition d'un modèle d'exemple (Utilisateur)
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt
});

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API E-Tafy' });
});

// Route pour créer un utilisateur (exemple)
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour obtenir tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Synchronisation des modèles avec la base de données
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // { force: true } pour recréer les tables
    console.log('✅ Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
}

syncDatabase();

// Démarrage du serveur
app.listen(port, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});

module.exports = { app, sequelize, User };