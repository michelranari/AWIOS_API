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

/**
 * @api {get} /propositions/sort/like sort proposition by like
 * @apiName GetPropositionSortLike
 * @apiGroup Proposition
 * @apiPermission none
 * @apiDescription get and sort all propositions by like and tags if it contains.
 *
 * @apiParam {String} tag all tag in insered the parameters of the url. Example : tag=internet. Exemple of url : localhost:3001/propositions/sort/like?tag=internet&tag1=soiree
 *
 * @apiSuccess {String} titleProp title of the proposition
 * @apiSuccess {String} dateProp date of the proposition
 * @apiSuccess {String} contentProp content of the proposition
 * @apiSuccess {Boolean} isAnonymous indicates if the proposition is published anonymously or not
 * @apiSuccess {String} ownerProp id of the user who wrote the proposition
 * @apiSuccess {String[]} idLikesProp Array of id of users who liked the propositions
 * @apiSuccess {String[]} tagsProp Array of id of tags attached to the proposition
 * @apiSuccess {String[]} idAnswers Array of id of answers of to the proposition
 */
router.get('/sort/like', async (req,res) =>{
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

/**
 * @api {get} /propositions/sort/:sort sort propostion by date
 * @apiName GetPropositionSortDate
 * @apiGroup Proposition
 * @apiPermission none
 * @apiDescription sort all propositions by ascending or descending date and tags if it contains.
 * Exemple of url : localhost:3001/propositions/sort/desc?tag=internet&tag1=soiree
 *
 * @apiParam {String="asc","desc"} sort sort propostion by ascending "asc" or descending "desc"
 * @apiParam {String} tag all tag in insered the parameters of the url. Example : tag=internet. Exemple of url : localhost:3001/propositions/sort/like?tag=internet&tag1=soiree
 *
 * @apiSuccess {String} title title of the proposition
 * @apiSuccess {String} dateProp date of the proposition
 * @apiSuccess {String} contentProp content of the proposition
 * @apiSuccess {Boolean} isAnonymous indicates if the proposition is published anonymously or not
 * @apiSuccess {String} ownerProp id of the user who wrote the proposition
 * @apiSuccess {String[]} idLikesProp Array of id of users who liked the propositions
 * @apiSuccess {String[]} tagsProp Array of id of tags attached to the proposition
 * @apiSuccess {String[]} idAnswers Array of id of answers of to the proposition
 */
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

/**
 * @api {get} /propositions/:id get proposition by id
 * @apiName GetPropositionById
 * @apiGroup Proposition
 * @apiPermission none
 * @apiDescription get data of proposition by is id
 *
 * @apiParam {String} id id of the propostion
 *
 * @apiSuccess {String} title title of the proposition
 * @apiSuccess {String} dateProp date of the proposition
 * @apiSuccess {String} contentProp content of the proposition
 * @apiSuccess {Boolean} isAnonymous indicates if the proposition is published anonymously or not
 * @apiSuccess {String} ownerProp id of the user who wrote the proposition
 * @apiSuccess {String[]} idLikesProp Array of id of users who liked the proposition
 * @apiSuccess {String[]} tagsProp Array of id of tags attached to the proposition
 * @apiSuccess {String[]} idAnswers Array of id of answers of to the proposition
 *
 * @apiError (204) PropositonNotFound Proposition not found
 */
router.get('/:id', (req,res) =>{
  propositionModel.findOne({ _id : req.params.id}, function(err,query){
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

/**
 * @api {delete} /propositions/ delete a proposition
 * @apiName DeleteProposition
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription delete a proposition by is id.
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to delete
 *
 * @apiError (403) ForbiddenAcces unauthorized to delete this proposition
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.delete('/', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , async function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // check if delete is own propostion
    await propositionModel.findById(req.body.id, async function (err, prop) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log(prop)
      const user = decoded.user._id;
      if(user != prop.ownerProp){
        return res.status(403).send({ errors: 'Forbidden' });
      }

      // delete all answer in proposition
      var myHeaders = new Headers();
      myHeaders.append('Content-Type','application/json');
      myHeaders.append('Authorization',authorizationHeader);
      myHeaders.append('Accept','application/json');
      for (var i = 0; i < prop.idAnswers.length; i++) {
        var myInit = { method: 'POST',
                       headers: myHeaders,
                       body : JSON.stringify({ id_answer: prop.idAnswers[i]})
                     };
        try{
          await fetch("http://localhost:3001/answers/delete",myInit).then(response => console.log(response)).catch(function(error) {console.log(error)});
          console.log("delete answer done")
        //return res.status(200).json("answer deleted succesfuly");
        }catch(error){
          console.log(error)
        }
      }
    })

    await propositionModel.findByIdAndRemove(req.body.id,function(err,prop1){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // delete idProp in User Model
      console.log(typeof decoded.user._id)
      userModel.findById(decoded.user._id,function(err,user){
        if(err){
          console.log(err);
          return res.status(500).json(err);
        }
        var idUser = user.idPropositions.filter(id => id != decoded.user._id);
        var update = {"idPropositions" : idUser }
        userModel.findOneAndUpdate({_id : decoded.user._id},update,{new: true},function(err1,user1){
          if(err1){
            console.log(err1);
            return res.status(500).json(err3);
          }
          console.log("field idPropositions in User model modified")
          console.log("delete proposition done")
          return res.status(200).json("proposition deleted succesfuly");
        });
      });
    });

  });
});

/**
 * @api {put} /propositions/ update a proposition
 * @apiName PutPropositionUpdate
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription update a proposition by is id
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion
 * @apiParam {String} contentProp content of the propostion
 * @apiParam {String} isAnonymous indicates if the proposition is published anonymously or not
 * @apiParam {String} ownerProp id of the user who wrote the proposition
 *
 * @apiError (403) ForbiddenAcces unauthorized to update this proposition
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.put('/', (req, res) => {

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
    const user = decoded.user._id;
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
    propositionModel.findOneAndUpdate({ _id : req.body.id},proposition,{new: true}, function(err,prop){
      if(err){
        console.log(err);
        return res.status(500).send({ errors: 'update fail' });
      }
      console.log("proposition updated")
      return res.status(200).json(prop);
    })
  });
});

/**
 * @api {put} /propositions/like like a proposition
 * @apiName PutPropositionLike
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription like a proposition by is id. insert id of user who like the proposition in array of idLikesProp and return the proposition liked
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to like
 *
 * @apiError (403) ForbiddenAccesLike Proposition already like
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
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

    propositionModel.findById(req.body.id,function (err, prop) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // check if proposition is already liked
      var find = prop.idLikesProp.includes(decoded.user._id)
      if(!find){

        //update tag in proposition collection
        var update = {$push : { "idLikesProp" : decoded.user._id}}
        propositionModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
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


/**
 * @api {put} /propositions/dislike dislike a proposition
 * @apiName PutPropositionDislike
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription dislike a proposition by is id. delete id of user who like the proposition in array of idLikesProp
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to dislike
 *
 * @apiError (403) ForbiddenAccesDislike Proposition is not liked or number like equal to 0
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
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

    propositionModel.findById(req.body.id,function (err, prop) {
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
        propositionModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
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

/**
 * @api {post} /propositions/ create a proposition
 * @apiName PostProposition
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription create a proposition with tag if it has.
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} titleProp title of the proposition
 * @apiParam {String} contentProp content of the propostion
 * @apiParam {String} isAnonymous indicates if the proposition is published anonymously or not
 * @apiParam {String} tagsProp tags of the proposition. Each tag is separed by a space
 *
 * @apiError (422) FieldMissing title or content is missing
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.post('/', (req, res) => {

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
    if(!req.body.contentProp || !req.body.titleProp){
      console.log(" fields are not filled !")
      return res.status(422).json({errors: " fields are not filled !"});
    }

    // save field in model
    var proposition = new propositionModel();
    proposition.titleProp = req.body.titleProp;
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
        result = {};
        result[user._id] = user;
        return res.status(201).json(result);
      }
    });
  });
});


/**
 * @api {get} /propositions/ get all proposition
 * @apiGroup Proposition
 * @apiPermission none
 * @apiDescription get data of all proposition
 *
 * @apiSuccess {String} title title of the proposition
 * @apiSuccess {String} dateProp date of the proposition
 * @apiSuccess {String} contentProp content of the proposition
 * @apiSuccess {Boolean} isAnonymous indicates if the proposition is published anonymously or not
 * @apiSuccess {String} ownerProp id of the user who wrote the proposition
 * @apiSuccess {String[]} idLikesProp Array of id of users who liked the propositions
 * @apiSuccess {String[]} tagsProp Array of id of tags attached to the proposition
 * @apiSuccess {String[]} idAnswers Array of id of answers of to the proposition
 *
 */
router.get('/', (req,res) =>{
  propositionModel.find({"ownerProp.isBanned" : "false"}, function(err,query){
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


module.exports = router
