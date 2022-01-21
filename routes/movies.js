var express = require('express');
var router = express.Router();
const fs=require('fs');
let moviesFile =fs.readFileSync('movies.json');


router.get('/',function(req,res){
    let movies = JSON.parse(moviesFile);
    res.json(movies);
})

module.exports = router;