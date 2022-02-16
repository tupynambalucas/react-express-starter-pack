var express = require('express');
var router = express.Router();
const path = require('path');

const { MongoClient } = require("mongodb");
var uri = 'mongodb+srv://Tupy:tupy3000@temazcal-cluster.if1qz.mongodb.net/loja?retryWrites=true&w=majority'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Rota produtos");
  next();
});



// define the home page route
router.get('/', async (req, res, next) =>{
  var resultArray = []
  MongoClient.connect(uri,function(err,client){
    var db = client.db("loja");
    var cursor = db.collection('produtos').find()
    cursor.forEach(function(doc,err){
      resultArray.push(doc)
    }, function () {
      client.close()
      res.json(resultArray)
    });
  })
})
  
// define the about route
// router.get('/about', function(req, res) {
//   res.send('About birds');
// });

module.exports = router;