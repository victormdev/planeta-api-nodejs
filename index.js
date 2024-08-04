const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const cors = require('cors');

const app = express();
const ports = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

// Configurar body-parser
app.use(bodyParser.json());

// Rotas
app.use('/auth', authRoutes);

// Tratamento de erros
app.use(errorController.get404);
app.use(errorController.get500);

// Iniciar o servidor
app.listen(ports, () => console.log(`Rodando na porta ${ports}`));
