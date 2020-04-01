const express = require('express');
const mongoose = require('mongoose')
//const deleteTagAnswer = require('./answers')
const router = express.Router();
const propositionModel = require('../models/proposition')
const answerModel = require('../models/answer')
const userModel = require('../models/user')
const tagModel = require('../models/tag')
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();


/**
 * @api {get} /:id/answers/best get best answer of a proposition
 * @apiName GetBestAnswerById
 * @apiGroup Proposition
 * @apiPermission none
 * @apiDescription get the best answer of a proposition by is id. Exemple of url : localhost:3001/propositions/5e7b5c847cbb262ef84ab042/answers/best
 *
 * @apiParam {String} id id of the propostion
 *
 * @apiSuccess {String} dateAnswer date of the answer
 * @apiSuccess {String} contentAnswer content of the answer
 * @apiSuccess {Boolean} isAnonymous indicates if the answer is published anonymously or not
 * @apiSuccess {String} ownerAnswer id of the user who wrote the answer
 * @apiSuccess {String[]} idLikesAnswer Array of id of users who liked the answer
 * @apiSuccess {String[]} tagsAnswer Array of id of tags attached to the answer
 * @apiSuccess {String} idProp id of the proposition linked to the answer
 *
 * @apiError (204) PropositonNotFound Proposition not found
 */
router.get('/:id/answers/best',(req, res) => {
  propositionModel.findById(req.params.id, async function(err,prop){
    if (err){
      return res.status(500).send(err);
    }
    // no answer found
    if(!prop) {
      return res.status(204).send({errors : "No answers found"});
    }

    var answerArray = [];
    try{
       for(var i = 0; i < prop.idAnswers.length; i++){
         // var id = JSON.stringify(a);
         // console.log(id)
         answer = await answerModel.findById(prop.idAnswers[i]).exec();
         answerArray.push(answer);
       }
       await answerArray.sort(compare);
       result = {};
       result[answerArray[0]._id] = answerArray[0];
       return res.status(200).json(result);

    }catch(error){
      console.log(error);
    }
  })
})

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
    var prop;

    // if the tags are not empty
    if(!(Object.keys(tags).length === 0 && tags.constructor === Object)){
      for (t in tags){
        tagsArray.push(new mongoose.Types.ObjectId(tags[t]))
      }
      prop = await propositionModel.find({tagsProp : {"$in" : tagsArray}}).exec();
    }
    else{
      prop = await propositionModel.find({}).sort({"nbLikes" : "desc"}).exec();
    }

    await prop.sort(compareLike);
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

router.delete('/test', (req, res) => {
  const [first, second] = test();
  console.log(first)
})

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
 * @apiSuccess (204) 204 No content
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

      // to do : admin delete
      const user = decoded.user._id;
      if(user != prop.ownerProp){
        if(!decoded.user.isAdmin){
          return res.status(403).send({ errors: 'Forbidden' });
        }
      }

      // delete all answer of the proposition
      for (var i = 0; i < prop.idAnswers.length; i++) {
        try{
          //var answer_id = JSON.stringify(prop.idAnswers[i]);
          await deleteAnswer(prop.idAnswers[i]);
          console.log("delete answer done")
        }catch(error){
          console.log(error)
          return res.status(500).json(error);
        }
      }

      // delete all tag of the proposition
      for (var i = 0; i < prop.tagsProp.length; i++) {
        try{
          await deleteTagProp(prop.tagsProp[i],req.body.id);
          console.log("delete tag done")
        }catch(error){
          console.log(error)
        }
      }

    })

    // delete proposition
    await propositionModel.findByIdAndRemove(req.body.id,function(err,prop1){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // delete idProp in User Model
      userModel.findById(prop1.ownerProp,function(err,user){
        if(err){
          console.log(err);
          return res.status(500).json(err);
        }
        var idProp = user.idPropositions.filter(id => id != req.body.id);
        var update = {"idPropositions" : idProp }
        userModel.findOneAndUpdate({_id : prop1.ownerProp},update,{new: true},function(err1,user1){
          if(err1){
            console.log(err1);
            return res.status(500).json(err3);
          }
          console.log("field idPropositions in User model modified")
          console.log("delete proposition done")
          return res.status(204).send("delete proposition done");;
        });
      });
    });
  });
});


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
 * @api {put} /propositions/report report a proposition
 * @apiName PutPropositionReport
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription report a proposition by is id. insert id of user who report the proposition in array of idReport and return the id of the proposition.
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to report
 *
 * @apiSuccess {String} id id of the propostion reported
 *
 * @apiError (403) ForbiddenAccesReport Proposition already reported
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.put('/report', (req, res) => {

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

      // check if proposition is already reported
      var find = prop.idReport.includes(decoded.user._id)
      if(!find){

        //update report in proposition collection
        var update = {$push : { "idReport" : decoded.user._id}}
        propositionModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("proposition report updated")
          return res.status(200).json({id: prop1._id});

        });
      }else{
        console.log("already report")
        return res.status(403).send({ errors: 'Already report' })
      }
    })
  });
});

/**
 * @api {put} /propositions/cancel-report cancel report proposition
 * @apiName PutPropositionCancelReport
 * @apiGroup Proposition
 * @apiPermission connected
 * @apiDescription cancel report of a proposition by is id. delete id of user who report the proposition in array of idReport
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to cancel the report
 *
 * @apiError (403) ForbiddenAccesDislike Proposition is not reported or number number of report equal to 0
 *
 * @apiSuccess {String} id id of the propostion who the report is canceled
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.put('/cancel-report', (req, res) => {

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

      // check if proposition is not reported or if it has 0 report
      var find = prop.idReport.includes(decoded.user._id)
      if(find && (prop.idReport.length != 0)){

        //update report in proposition collection
        var content = prop.idReport.filter(id => id != decoded.user._id);
        var update = {"idReport" : content};
        propositionModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("proposition report updated")
          return res.status(200).json({id: prop1._id});

        });
      }else{
        console.log("can't cancel report if is not reported or nb report = 0")
        return res.status(403).send({ errors: "can't cancel report if is not reported or nb report = 0" })
      }
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
 * @apiSuccess {String} id id of the propostion liked
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
          return res.status(200).json({id : prop1._id});

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
 * @apiSuccess {String} id id of the propostion disliked
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
          return res.status(200).json({id : prop1._id});

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
 * @apiSuccess (201) {String} id  id of proposition added.
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
                return res.status(201).json({id : prop._id});
              }
            })
          });
        }
      }else{
        return res.status(201).json({id : prop._id});
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

router.get('/docApi', (req,res) =>{
  res.sendFile('../apidoc/index.html');
});

async function deleteAnswer(id){

  var string_id = JSON.stringify(id);
  var result_s = string_id.substring(1, string_id.length-1);
  console.log(result_s)
  console.log(result_s)

  //delete tag
  var query1 = answerModel.findById(id)
  var result1 = await query1.exec( async function(err1,answer){

    if (err1){
      console.log(err1)
      return[false,err1]
    }
    // delete all tag in answers
    for (var i = 0; i < answer.tagsAnswer.length; i++) {
      try{
        await deleteTagAnswer(answer.tagsAnswer[i],result_s);
        console.log("delete tag in answer done");
      }catch(error){
        console.log(error)
      }
    }
  })


  var query2 = answerModel.findByIdAndRemove(id)
  var result2 = await query2.exec(function(err1,deleted){
    if (err1){
      console.log(err1)
      return res.status(500).send(err1);
    }

    if(deleted){

      // update array of idAnswers in user model
      userModel.findById(deleted.ownerAnswer,function(err2,user){
        if(err2){
          console.log(err2);
          return[false,err2]
        }
        var contentProp = user.idAnswers.filter(id => id != result_s);
        var update = {"idAnswers" : contentProp }
        userModel.findOneAndUpdate({_id : deleted.ownerAnswer},update,{new: true},function(err3,user1){
          if(err3){
            console.log(err3);
            return[false,err3]
          }
          console.log("field idAnswers in user model modified")
        });
      });

    // if delete fail
    }else{
      return[false,"delete answer fail"]
    }
  })
}

async function deleteTagProp(identifiant,del){
  tagModel.findById(identifiant, function(err1,tag){
    if (err1){
      console.log(err1)
      return [false,err1];
    }
    // if appear more than 1 time
    if(tag.nbOccurence > 1){
      // delete the id in idProps array and decrement nbOccurence
      var content = tag.idProps.filter(id => id != del);
      var update = {"idProps" : content,
                    $inc : { "nbOccurence" : -1}}
      tagModel.findOneAndUpdate({"_id" : tag._id},update,{new: true}, function(err5,tag1){
        if(err5){
          console.log(err5);
          return [false,err5]
        }
        console.log("field idProps in tag modified");
        return [true,"succes"];
      });

    // if appear 1 time : delete the tag
    }else{
      tagModel.findByIdAndRemove(identifiant,function(err8,deleted){
        if(err8){
          console.log(err8);
          return [false,err8];
        }
        return [true,"succes"];
      })
    }
  })
}

// delete tag in answer
// return [true, succes]
function deleteTagAnswer(identifiant,del){
  tagModel.findById(identifiant, function(err1,tag){
    if (err1){
      console.log(err1)
      return [false,err1];
    }
    // if appear more than 1 time
    if(tag.nbOccurence > 1){
      // delete the id in idAnswers field and decrement nbOccurence
      var content = tag.idAnswers.filter(id => id != del);
      var update = {"idAnswers" : content,
                    $inc : { "nbOccurence" : -1}}
      tagModel.findOneAndUpdate({"_id" : tag._id},update,{new: true}, function(err5,tag1){
        if(err5){
          console.log(err5);
          return [false,err5]
        }
        console.log("field idAnswers in tag modified");
        return [true,"succes"];
      });

    // if appear 1 time : delete the tag
    }else{
      tagModel.findByIdAndRemove(identifiant,function(err8,deleted){
        if(err8){
          console.log(err8);
          return [false,err8];
        }
        return [true,"succes"];
      })
    }
  })
};

// compare for sort function
function compare(a,b){
  var al = a.idLikesAnswer.length;
  var bl = b.idLikesAnswer.length;
  if(al > bl) return -1;
  if(bl > al) return 1;
  return 0;
}

// compare for sort function
function compareLike(a,b){
  var al = a.idLikesProp.length;
  var bl = b.idLikesProp.length;
  if(al > bl) return -1;
  if(bl > al) return 1;
  return 0;
}

module.exports = router
