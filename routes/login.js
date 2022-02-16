require("dotenv").config()

var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { MongoClient } = require("mongodb");
var uri = 'mongodb+srv://Tupy:tupy3000@temazcal-cluster.if1qz.mongodb.net/loja?retryWrites=true&w=majority'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Login");
  next();
});  

// define the home page route
router.post('/', async (req, res) =>{
  const resultArray = []
  MongoClient.connect(uri,function(err,client){
    var db = client.db("loja");
    var cursor = db.collection('users').find()
    cursor.forEach(function(doc,err){
      resultArray.push(doc)
    }, function () {
      client.close()
      console.log(resultArray)
    });
  })
  const user = resultArray.find(user => user.email = req.body.email)
  if (user == null) {
    return res.status(400).send("Cannot find user")
  }
  try{
    if (await bcrypt.compare(req.body.senha, usuario.senha)) {
      res.send("Success")
    } else {
      res.send("Not allowed")
    }
  } catch{
    res.status(500).send()
  }
})

//     const reqemail = req.body.email
//     const email = {name: reqemail}

//     const acessToken = jwt.sign(email, process.env.ACESS_TOKEN_SECRET)
//     res.json({acessToken: acessToken})
// })
  
// function authenticateToken(req,res,next) {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(" ")[1]
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token,process.env.ACESS_TOKEN_SECRET, (err, email) =>{
//     if (err) return res.sendStatus(403)
//     req.email = email
//     next()
//   })

module.exports = router;