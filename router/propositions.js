const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const propositionModel = require('../models/proposition')
const userModel = require('../models/user')
const tagModel = require('../models/tag')
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();

// all proposition sorted by like with tag
router.get('/sort/byLike', async (req,res) =>{
  try {

    var tags = req.query; // {} when empty
    var tagsArray = []
    var prop = await propositionModel.find({}).sort({nbLikes : "desc"}).exec();

    // if the tags are not empty
    if(!(Object.keys(tags).length === 0 && tags.constructor === Object)){
      for (t in tags){
        tagsArray.push(new mongoose.Types.ObjectId(tags[t]))
      }
      prop = await propositionModel.find({tagsProp : {"$in" : tagsArray}}).sort({nbLikes : "desc"}).exec();
    }
    else{
      prop = await propositionModel.find({}).sort({"dateProp" : req.params.sort}).exec();
    }

    return res.status(200).json(prop);

  }catch(error){
    console.log(error);
  }
});

// all proposition sorted by ascending or descending date with tag
router.get('/sort/:sort', async (req,res) =>{
  try {

    var tags = req.query; // {} when empty
    var tagsArray = []
    var prop = await propositionModel.find({}).sort({"dateProp" : "desc"}).exec();

    // if the tags are not empty
    if(!(Object.keys(tags).length === 0 && tags.constructor === Object)){
      for (t in tags){
        tagsArray.push(new mongoose.Types.ObjectId(tags[t]))
      }
      prop = await propositionModel.find({tagsProp : {"$in" : tagsArray}}).sort({"dateProp" : req.params.sort}).exec();
    }
    else{
      prop = await propositionModel.find({}).sort({"dateProp" : req.params.sort}).exec();
    }

    return res.status(200).json(prop);

  }catch(error){
    console.log(error);
  }
});

// return proposition by id
router.get('/:id_proposition', (req,res) =>{
  propositionModel.findOne({ _id : req.params.id_proposition}, function(err,query){
    if (err){
      return res.status(500).send(err);
    }
    // no proposition found
    if(query.length === 0) {
      return res.status(204).send({errors : "No proposition found"});
    }
     // format the query
     result = {};
     result[query._id] = query;
     return res.status(200).json(result);
  })
});

// delete proposition
router.post('/delete', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // check if delete is own propostion
    const user = decoded.result._id;
    if(user != req.body.ownerProp){
      return res.status(403).send({ errors: 'Forbidden' });
    }

  });
});

// update propositions
// to do : update tags
router.put('/update', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // check if update is own propostion
    const user = decoded.result._id;
    if(user != req.body.ownerProp){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    // format the changed field
    proposition = {
      "dateProp" : Date.now(),
      "contentProp" : req.body.contentProp,
      "isAnonymous" : req.body.isAnonymous,
    }

    // save change
    propositionModel.findOneAndUpdate({ _id : req.body._id},proposition,{new: true}, function(err,prop){
      if(err){
        console.log(err);
        return res.status(500).send({ errors: 'update fail' });
      }

      console.log("proposition updated")
      return res.status(200).json(prop);

    })
  });
});

// increment like of a proposition
// return the proposition liked
router.put('/like', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // verify token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    propositionModel.findById(req.body._id,function (err, prop) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // check if proposition is already liked
      var find = prop.idLikesProp.includes(decoded.user._id)
      if(!find){

        //update tag in proposition collection
        var update = {$push : { "idLikesProp" : decoded.user._id}}
        propositionModel.findOneAndUpdate({"_id" : req.body._id},update,{new: true}, function(err,prop1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("proposition like updated")
          result = {};
          result[prop1._id] = prop1;
          return res.status(200).json(result);

        });
      }else{
        console.log("already liked")
        return res.status(403).send({ errors: 'Already liked' })
      }
    })
  });
});


// decrement like
// return the proposition disliked
router.put('/dislike', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // verify token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    propositionModel.findById(req.body._id,function (err, prop) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // check if proposition is not liked or if it has 0 like
      var find = prop.idLikesProp.includes(decoded.user._id)
      if(find && (prop.idLikesProp.length != 0)){

        //update tag in proposition collection
        var content = prop.idLikesProp.filter(id => id != decoded.user._id);
        var update = {"idLikesProp" : content};
        propositionModel.findOneAndUpdate({"_id" : req.body._id},update,{new: true}, function(err,prop1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("proposition like updated")
          result = {};
          result[prop1._id] = prop1;
          return res.status(200).json(result);

        });
      }else{
        console.log("can't dislike if is not liked or nb like = 0")
        return res.status(403).send({ errors: "can't dislike if is not liked or nb like = 0" })
      }
    })

  });
});

// add new proposition
// return the proposition added ( warning = resultat not updated for the tags )
// to do : cas ou tags vide
router.post('/newProposition', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // check if field is filled
    if(!req.body.contentProp){
      console.log(" fields are not filled !")
      return res.status(422).json({errors: " fields are not filled !"});
    }

    // save field in model
    var proposition = new propositionModel();
    proposition.contentProp = req.body.contentProp;
    proposition.isAnonymous = req.body.isAnonymous;
    proposition.ownerProp = decoded.user._id;

    //save proposition in database collection
    proposition.save(function (err, prop) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("proposition saved");

      // insert proposition in user Array
      userModel.findOneAndUpdate({"_id": decoded.user._id},{$push : {"idPropositions" : prop._id}},{new: true}, function(err,user){
        if(err){
          console.log(err);
          return res.status(500).json(err);
        }
        console.log("user propostion Array updated");
      });

      // if tag exist
      if(req.body.tagsProp){
        // prepare tag for insert
        var tagsReq = req.body.tagsProp;
        var tagsArray = tagsReq.split(' ');

        // counter for tag
        var counter = 0;

        // insert each tags or update if exist
        for (var i = 0; i < tagsArray.length; i++) {
          var query = {"label" : tagsArray[i]},
          update = { "label": tagsArray[i],
                      $inc : { "nbOccurence" : 1},
                      $push : { "idProps" : prop._id}},
          options = { upsert: true, new: true, setDefaultsOnInsert: true };

          //insert tag in database
          tagModel.findOneAndUpdate(query,update,options, function(err,tagRes){
            if(err){
              console.log(err);
              return res.status(500).json(err);
            }

            console.log("tags insered !")

            // update tag array in proposition collection
            propositionModel.findOneAndUpdate({ _id : prop.id},{$push : { "tagsProp" : tagRes.id}},{new: true}, function(err,propU){
              if(err){
                console.log(err);
                return res.status(500).json(err);
              }

              console.log("Array of tag ID updated in propostion collection")
              counter++;

              // return the added proposition at the end of the loop
              if(counter == tagsArray.length){
                result = {};
                result[propU._id] = propU;
                return res.status(201).json(result);
              }
            })
          });
        }
      }else{
        return res.status(201).json(prop);
      }
    });
  });
});


// Return all propositions
router.get('/', (req,res) =>{
  propositionModel.find({}, function(err,query){
    if (err){
      return res.status(500).send(err);
    }

     // format the query
    result = {};
    for (var i = 0; i < query.length; i++) {
      result[query[i]._id] = query[i];
    }
    return res.status(200).json(result);
  })
});

// return proposition by id
router.get('/:id_proposition', (req,res) =>{
  propositionModel.findOne({ _id : req.params.id_proposition}, function(err,query){
    if (err){
      return res.status(500).send(err);
    }
    // no proposition found
    if(query.length === 0) {
      return res.status(204).send({errors : "No proposition found"});
    }
     // format the query
     result = {};
     result[query._id] = query;
     return res.status(200).json(result);
  })
});

module.exports = router
