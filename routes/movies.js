const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
let take=10;
let skip=0;
router.get('/', async function(req, res, next) {
    if(req.query.take)take=parseInt(req.query.take,10);
    if(req.query.skip)skip=parseInt(req.query.skip,10);
    const movies = await prisma.movies.findMany({
        skip: skip,
        take: take,
      })
    
   
    res.send({
        data: movies,
        pagination : {
            count : 10, // Total des enregistrements
            take: take,   // Nombre d'éléments sélectionnés
            skip: skip   // Décalage à partir duquel on prend les  données
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