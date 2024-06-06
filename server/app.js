const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/auth');
const profileRouter = require('./routes/profile'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/profile', profileRouter);

app.listen(4000, () => console.log('Сервер запущен на порту 4000'));
