var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
router.use(express.json())

const { MongoClient } = require("mongodb");
var uri = 'mongodb+srv://Tupy:tupy3000@temazcal-cluster.if1qz.mongodb.net/loja?retryWrites=true&w=majority'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Register");
  next();
});

// define the home page route
router.post('/', async (req, res) =>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.senha, 10)
    const user = {nome: req.body.nome, email: req.body.email, senha: hashedPassword}
    MongoClient.connect(uri, function(err, client) {
      if (err) throw err;
      var db = client.db("loja");
      db.collection("users").insertOne(user, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
      });
    });
    res.status(201).send()
  }
  catch{
    res.status(500).send()
  }
  
})
  
// define the about route
// router.get('/about', function(req, res) {
//   res.send('About birds');
// });

module.exports = router;