const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
let take=10;
let skip=0;
router.get('/', async function(req, res, next) {
    take=parseInt(req.query.take,10);
    skip=parseInt(req.query.skip,10);
    const movies = await prisma.movies.findMany({
        skip: skip,
        take: take,
      })
    
   
    res.send({
        data: movies,
        pagination : {
            count : 1, // Total des enregistrements
            take: 1,   // Nombre d'éléments sélectionnés
            skip: 0   // Décalage à partir duquel on prend les  données
        }
    });
})
 
module.exports = router;



/*var express = require('express');
var router = express.Router();
const fs=require('fs');
let moviesFile =fs.readFileSync('movies.json');


router.get('/',function(req,res){
    let movies = JSON.parse(moviesFile);
    res.json(movies);
})

module.exports = router;*/