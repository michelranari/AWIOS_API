const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const answerModel = require('../models/answer')
const propositionModel = require('../models/proposition')
const userModel = require('../models/user')
const tagModel = require('../models/tag')
dotenv.config();
global.Headers = fetch.Headers;

/**
 * @api {put} /answers/like like an answers
 * @apiName PutAnswerLike
 * @apiGroup Answer
 * @apiPermission connected
 * @apiDescription like an answer by is id. insert id of user who like the answer in array of idLikesProp and return thr answer liked
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the answer to like
 *
 * @apiError (403) ForbiddenAccesLike Answer already like
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

    answerModel.findById(req.body.id,function (err, answer) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // check if answer is already liked
      var find = answer.idLikesAnswer.includes(decoded.user._id)
      if(!find){

        //update tag in answer collection
        var update = {$push : { "idLikesAnswer" : decoded.user._id}}
        answerModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,answ1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("answer like updated")
          result = {};
          result[answ1._id] = answ1;
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
 * @api {put} /answers/dislike dislike an answer
 * @apiName PutAnswerdislike
 * @apiGroup Answer
 * @apiPermission connected
 * @apiDescription dislike an answer by is id. insert id of user who dislike the answer in array of idLikesProp and return the answer disliked
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the answer to dislike
 *
 * @apiError (403) ForbiddenAccesLike Answer already dislike
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

    answerModel.findById(req.body.id,function (err, answer) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      // check if answer is not liked or if it has 0 like
      var find = answer.idLikesAnswer.includes(decoded.user._id)
      if(find && (answer.idLikesAnswer.length != 0)){

        //update tag in answer collection
        var content = answer.idLikesAnswer.filter(id => id != decoded.user._id);
        var update = {"idLikesAnswer" : content};
        answerModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,answ1){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("answer like updated")
          result = {};
          result[answ1._id] = answ1;
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
 * @api {get} /answers/:id get answer by id
 * @apiName GetAnswerById
 * @apiGroup Answer
 * @apiPermission none
 * @apiDescription get data of answer by is id
 *
 * @apiParam {String} id id of the answer
 *
 * @apiSuccess {String} dateAnswer date of the answer
 * @apiSuccess {String} contentAnswer content of the answer
 * @apiSuccess {Boolean} isAnonymous indicates if the answer is published anonymously or not
 * @apiSuccess {String} ownerAnswer id of the user who wrote the answer
 * @apiSuccess {String[]} idLikesAnswer Array of id of users who liked the answer
 * @apiSuccess {String[]} tagsAnswer Array of id of tags attached to the answer
 * @apiSuccess {String} idProp id of the proposition linked to the answer
 *
 */
router.get('/:id', async (req,res) =>{
  answerModel.findOne({ _id : req.params.id_answer}, function(err,query){
    if (err){
      return res.status(500).send(err);
    }

    console.log(query.length)
    // no proposition found
    if(!query) {
      return res.status(204).send({errors : "No answers found"});
    }
     // format the query
     result = {};
     result[query._id] = query;
     return res.status(200).json(result);
  })
});

/**
 * @api {put} /answers/ update a answer
 * @apiName PutAnswerUpdate
 * @apiGroup Answer
 * @apiPermission connected
 * @apiDescription update a answer by is id
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the answer to update
 * @apiParam {String} contentAnswer content of the answer
 * @apiParam {String} isAnonymous indicates if the answer is published anonymously or not
 * @apiParam {String} ownerAnswer id of the user who wrote the answer
 *
 * @apiError (403) ForbiddenAcces unauthorized to update this answer
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

    // check if update is own answer
    const user = decoded.user._id;
    if(user != req.body.ownerAnswer){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    // format the changed field
    answer = {
      "dateAnswer" : Date.now(),
      "contentAnswer" : req.body.contentAnswer,
      "isAnonymous" : req.body.isAnonymous,
    }

    // save change
    answerModel.findOneAndUpdate({ _id : req.body.id},answer,{new: true}, function(err,answer){
      if(err){
        console.log(err);
        return res.status(500).send({ errors: 'update fail' });
      }

      console.log("answer updated")
      return res.status(200).json(answer);
    })
  });
});


/**
 * @api {delete} /answers/ delete an answer
 * @apiName DeleteAnswer
 * @apiGroup Answer
 * @apiPermission connected
 * @apiDescription delete an answer by is id.
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the answer to delete
 *
 *
 */
router.delete('/', async (req, res) => {
  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_KEY , async function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    //delete tag
    // var query1 = answerModel.findById(req.body.id_answer)
    // var result1 = await query1.exec( async function(err1,answer){
    //
    //   if (err1){
    //     console.log(err1)
    //     return res.status(500).send(err1);
    //   }
    //   // delete all tag in answers
    //   var myHeaders = new Headers();
    //   myHeaders.append('Content-Type','application/json');
    //   myHeaders.append('Authorization',authorizationHeader);
    //   myHeaders.append('Accept','application/json');
    //   for (var i = 0; i < answer.tagsAnswer.length; i++) {
    //     console.log(typeof answer._id)
    //     var myInit = { method: 'POST',
    //                    headers: myHeaders,
    //                    body : JSON.stringify({ id_tag: answer.tagsAnswer[i],id_toDelete : answer._id})
    //                  };
    //     console.log(answer._id)
    //     try{
    //     await fetch("http://localhost:3001/tags/delete",myInit).then(response => console.log(response)).catch(function(error) {console.log(error)});
    //     console.log("delete answer done")
    //     //return res.status(200).json("answer deleted succesfuly");
    //   }catch(error){console.log(error)}
    //
    //   }
    // })

    var query2 = answerModel.findByIdAndRemove(req.body.id_answer)
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
            return res.status(500).json(err2);
          }
          var contentProp = user.idAnswers.filter(id => id != req.body.id_answer);
          var update = {"idAnswers" : contentProp }
          userModel.findOneAndUpdate({_id : deleted.ownerAnswer},update,{new: true},function(err3,user1){
            if(err3){
              console.log(err3);
              return res.status(500).json(err3);
            }
            console.log("field idAnswers in Answer model modified")
          });
        });

        //update array of idAnswers in proposition model
        propositionModel.findById(deleted.idProp,function(err4,prop){
          if(err4){
            console.log(err2);
            return res.status(500).json(err4);
          }
          var contentProp = prop.idAnswers.filter(id => id != req.body.id_answer);
          var update = {"idAnswers" : contentProp }
          propositionModel.findOneAndUpdate({_id : deleted.idProp},update,{new: true},function(err5,prop1){
            if(err5){
              console.log(err5);
              return res.status(500).json(err5);
            }
            console.log("field idAnswers in proposition model modified")
            console.log("delete answer done")
            return res.status(200).json("answer deleted succesfuly");
          });
        });

      // if delete fail
      }else{
        return res.status(500)
      }
    })
  })
})

/**
 * @api {post} /answers/ create an answer
 * @apiName PostAnswer
 * @apiGroup Answer
 * @apiPermission connected
 * @apiDescription create an answer with tag if it has and return the answer created.
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} contentAnswer content of the answer
 * @apiParam {String} isAnonymous indicates if the answer is published anonymously or not
 * @apiParam {String} idProp id of the proposition where
 * @apiParam {String} tagsAnswer tags of the answer. Each tag is separed by a space
 *
 * @apiError (422) FieldMissing content field missing
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

  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // check if field is filled
    if(!req.body.contentAnswer){
      console.log(" fields are not filled !")
      return res.status(422).json({errors: " fields are not filled !"});
    }

    // save field in model
    var answer = new answerModel();
    answer.contentAnswer = req.body.contentAnswer;
    answer.isAnonymous = req.body.isAnonymous;
    answer.ownerAnswer = decoded.user._id;
    answer.idProp = req.body.idProp;

    // prepare tag for insert
    var tagsReq = req.body.tagsAnswer;
    var tagsArray = tagsReq.split(' ');

    //save proposition in database collection
    answer.save(function (err, answer1) {
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("answer saved");

      // insert answer in user Array
      userModel.findOneAndUpdate({"_id": decoded.user._id},{$push : {"idAnswers" : answer1._id}},{new: true}, function(err,user){
        if(err){
          console.log(err);
          return res.status(500).json(err);
        }
        console.log("user answer Array updated");
      });

      // insert answer in user
      propositionModel.findOneAndUpdate({"_id": answer.idProp},{$push : { "idAnswers" : answer1._id}},{new: true}, function(err,user){
        if(err){
          console.log(err);
          return res.status(500).json(err);
        }
        console.log("user answer id update in proposition");
      })

      // counter for tag
      var counter = 0;

      // insert each tags or update if exist
      for (var i = 0; i < tagsArray.length; i++) {
        var query = {"label" : tagsArray[i]},
        update = { "label": tagsArray[i],
                    $inc : { "nbOccurence" : 1},
                    $push : { "idAnswers" : answer._id}},
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

        //insert tag in database
        tagModel.findOneAndUpdate(query,update,options, function(err,tagRes){
          if(err){
            console.log(err);
            return res.status(500).json(err);
          }

          console.log("tags insered !");

          // update tag array in answer collection
          answerModel.findOneAndUpdate({ _id : answer1.id},{$push : { "tagsAnswer" : tagRes._id}},{new: true}, function(err,propU){
            if(err){
              console.log(err);
              return res.status(500).json(err);
            }

            console.log("Array of tag ID updated in answer collection")
            counter++;

            // return the added proposition at the end of the loop
            if(counter == tagsArray.length){
              result = {};
              result[propU._id] = propU;
              return res.status(201).json(result);
            }
          });
        })
      }
    });
  })
});

/**
 * @api {get} /answers/ get all answer
 * @apiName GetAnswerAll
 * @apiGroup Answer
 * @apiPermission none
 * @apiDescription get data of all answer
 *
 * @apiSuccess {String} dateAnswer date of the answer
 * @apiSuccess {String} contentAnswer content of the answer
 * @apiSuccess {Boolean} isAnonymous indicates if the answer is published anonymously or not
 * @apiSuccess {String} ownerAnswer id of the user who wrote the answer
 * @apiSuccess {String[]} idLikesAnswer Array of id of users who liked the answer
 * @apiSuccess {String[]} tagsAnswer Array of id of tags attached to the answer
 * @apiSuccess {String} idProp id of the proposition linked to the answer
 *
 */
router.get('/', (req,res) =>{
  answerModel.find({}, function(err,query){
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
