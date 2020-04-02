const express = require('express');
const router = express.Router();
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const answerModel = require('../models/answer')
const propositionModel = require('../models/proposition')
const userModel = require('../models/user')
const tagModel = require('../models/tag')
var fs = require('fs');
dotenv.config();

/**
 * @api {put} /admin/ban banned an user
 * @apiName PostUserAdminBan
 * @apiGroup Admin
 * @apiPermission admin
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiDescription Ban an user by is id
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess (204) 204 No content
 *
 * @apiError (422) FiedMissing The Users-ID is required
 * @apiError (403) ForbiddenAcces Admin right required
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 *
 */
router.put('/ban', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: "Error. No connected" });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // if form is filled
    if(!req.body.id){
      return res.status(422).json({errors: "Id user required !"});
    }

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    // update state user
    userModel.findOneAndUpdate({"_id": req.body.id},{"isBanned" : true},{new: true}, function(err){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }
      console.log("user banned");
      res.status(204).send("user banned");
    });

  });
})

/**
 * @api {put} /admin/cancel-ban cancel ban of user
 * @apiName PostUserAdminCancelBan
 * @apiGroup Admin
 * @apiPermission admin
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiDescription cancel the ban of a user by is id
 *
 * @apiParam {String} id The Users-ID.
 *
 * @apiSuccess (204) 204 No content
 *
 * @apiError (422) FiedMissing The Users-ID is required
 * @apiError (403) ForbiddenAcces Admin right required
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 *
 */
router.put('/cancel-ban', (req, res) => {

  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: "Error. No connected" });
  var token  = authorizationHeader.split(' ')[1];

  // check token
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    // if form is filled
    if(!req.body.id){
      return res.status(422).json({errors: "Id user required !"});
    }

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    // update state user
    userModel.findOneAndUpdate({"_id": req.body.id},{"isBanned" : false},{new: true}, function(err){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }
      console.log("user banned");
      res.status(204).send("user banned");
    });

  });
})

/**
 * @api {put} /admin/propositions/clean-report clean report of a proposition
 * @apiName PutAdminPropositionCleanReport
 * @apiGroup Admin
 * @apiPermission admin
 * @apiDescription clean/empty reports of a proposition by is id
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the propostion to clean array of reports
 *
 * @apiSuccess {String} id id of the propostion who the reports are cleaned
 *
 * @apiError (403) ForbiddenAccesClean Admin right needed
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.put('/propositions/clean-report', (req, res) => {
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

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    //empty report in proposition collection
    var update = {"idReport" : []}
    propositionModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("proposition report clean")
      return res.status(200).json({id: prop1._id});

    });
  });
});

/**
 * @api {put} /admin/answers/clean-report clean report of a answer
 * @apiName PutAdminAnswerCleanReport
 * @apiGroup Admin
 * @apiPermission admin
 * @apiDescription clean/empty reports of an answer by is id
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} id id of the answer to clean array of reports
 *
 * @apiSuccess {String} id id of the answer who the reports are cleaned
 *
 * @apiError (403) ForbiddenAccesClean Admin right needed
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 */
router.put('/answers/clean-report', (req, res) => {
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

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    //empty report in answer collection
    var update = {"idReport" : []}
    answerModel.findOneAndUpdate({"_id" : req.body.id},update,{new: true}, function(err,prop1){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("answer report clean")
      return res.status(200).json({id: prop1._id});

    });
  });
});

/**
 * @api {put} /admin/propositions/reported get propositions reported
 * @apiName GetAdminPropositionsReported
 * @apiGroup Admin
 * @apiPermission admin
 * @apiDescription get all propositions reported
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiSuccess {String} _id id of the proposition
 * @apiSuccess {String} titleProp title of the proposition
 * @apiSuccess {String} dateProp date of the proposition
 * @apiSuccess {String} contentProp content of the proposition
 * @apiSuccess {Boolean} isAnonymous indicates if the proposition is published anonymously or not
 * @apiSuccess {String} ownerProp id of the user who wrote the proposition
 * @apiSuccess {String[]} idLikesProp Array of id of users who liked the propositions
 * @apiSuccess {String[]} tagsProp Array of id of tags attached to the proposition
 * @apiSuccess {String[]} idAnswers Array of id of answers of to the proposition
 * @apiSuccess {String[]} idReport Array of id of user who report the proposition
 *
 * @apiSuccess (204) NoContent No proposition reported found
 *
 * @apiError (403) ForbiddenAccesClean Admin right needed
 *
 */
router.get('/propositions/reported', (req, res) => {
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

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    propositionModel.find({"idReport.0" : { "$exists": true }}, function(err,prop){
      if (err){
        console.log(err)
        return res.status(500).send(err);
      }

      if(!prop){
        return res.status(204).send("no proposition found")
      }

      result = {}
      for (var i = 0; i < prop.length; i++) {
        result[prop[i]._id] = prop[i];
      }

      return res.status(200).send(result);
    })
  })
})

/**
 * @api {put} /admin/answers/reported get answers reported
 * @apiName GetAdminAnswersReported
 * @apiGroup Admin
 * @apiPermission admin
 * @apiDescription get all answers reported
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiSuccess {String} _id id of the answer
 * @apiSuccess {String} dateAnswer date of the answer
 * @apiSuccess {String} contentAnswer content of the answer
 * @apiSuccess {Boolean} isAnonymous indicates if the answer is published anonymously or not
 * @apiSuccess {String} ownerAnswer id of the user who wrote the answer
 * @apiSuccess {String[]} idLikesAnswer Array of id of users who liked the answer
 * @apiSuccess {String[]} tagsAnswer Array of id of tags attached to the answer
 * @apiSuccess {String} idProp id of the proposition linked to the answer
 * @apiSuccess {String[]} idReport Array of id of user who report the proposition
 *
 * @apiSuccess (204) NoContent No proposition reported found
 *
 * @apiError (403) ForbiddenAccesClean Admin right needed
 *
 */
router.get('/answers/reported', (req, res) => {
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

    // if not admin
    if(!decoded.user.isAdmin){
      return res.status(403).send({ errors: 'Forbidden' });
    }

    answerModel.find({"idReport.0" : { "$exists": true }}, function(err,answer){
      if (err){
        console.log(err)
        return res.status(500).send(err);
      }

      if(!answer){
        return res.status(204).send("no answer found")
      }

      result = {}
      for (var i = 0; i < answer.length; i++) {
        result[answer[i]._id] = answer[i];
      }

      return res.status(200).send(result);
    })
  })
})

router.get('/apidoc', (req, res) => {

  console.log(process.cwd())

  fs.readdir('./', (err, files) => {
    if(err){
        console.log(err)
      }
    files.forEach(file => {
      console.log(file);
    });
  });

  // fs.readFile('../apidoc/index.html', function(err, data) {
  //   if(err){
  //     console.log(err)
  //     return res.status(500).send(err);
  //   }
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(data);
  //   res.end();
  // });
})


module.exports = router;
