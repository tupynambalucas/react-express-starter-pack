const express = require('express');
const cors = require('cors');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
var bodyParser = require('body-parser');



app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Rota loja
var produtos = require('./routes/produtos')
app.use('/produtos', cors(),  produtos)

var login = require('./routes/login')
app.use('/login', cors(),  login)

var register = require('./routes/register')
app.use('/register', cors(),  register)


app.listen(port, () => console.log(`Server running on port ${port}`));