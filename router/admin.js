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



module.exports = router;
