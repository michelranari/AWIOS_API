const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();

/**
 * @api {put} /users/password/change change password
 * @apiName PutUserChangePassword
 * @apiGroup User
 * @apiPermission connected
 * @apiDescription change password of the connected user
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiParam {String} oldPassword  the old password
 * @apiParam {String} newPassword  the new password
 * @apiParam {String} confirmPassword the confirmed password. Need to be exactly the same than the new password
 *
 * @apiSuccess (204) 204 No content
 *
 * @apiError (422) FiedMissing field oldPassword, newPassword or confirmPassword is not filled
 * @apiError (400) InvalidPassword Invalid password
 * @apiError (400) PasswordNotMatch new and confirm password don't match
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 *
 */
router.put('/password/change', (req, res) => {

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

    //check if any field is missing
    if(!req.body.oldPassword || !req.body.newPassword || !req.body.confirmPassword){
      return res.status(422).json({errors: " fields are not filled !"});
    }

    //check if newPassword and confirmPassword match
    if(!(req.body.newPassword === req.body.confirmPassword)){
      return res.status(400).json({errors: " confirmed and new password don't match !"});
    }

    userModel.findById(decoded.user._id, function(err,user){
      if (err){
        console.log(err)
        return res.status(500).send({ errors: 'Internal error' });
      }

      if(user){
        bcrypt.compare(req.body.oldPassword, user.password, function(err, result) {
          if (err){
            console.log(err)
            return res.status(500).send({ errors: 'Internal error' });
          }

          if(result){
            pwd = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(10));
            update = {"password" : pwd};

            userModel.findOneAndUpdate({"_id": decoded.user._id},update,{new: true}, function(err){
              if(err){
                console.log(err);
                return res.status(500).json(err);
              }

              console.log("password changed succesfuly");
              res.status(204).json("password changed succesfuly");
            });
          }else{
              return res.status(400).json({errors: "password is invalid !"});
          }
        })
      }else{
        return res.status(500);
      }

    })

  });
})

/**
 * @api {post} /users/authenticate authenticate
 * @apiName PostUserAuthenticate
 * @apiGroup User
 * @apiPermission none
 * @apiDescription authenticates a user and change set isConnected to true
 *
 * @apiParam {String} pseudo pseudo of user
 * @apiParam {String} password password of user
 *
 * @apiSuccess {String} token token for authentication with user information in it
 *
 * @apiError (422) FiedMissing field pseudo or password is not filled
 * @apiError (400) InvalidPassword Invalid password
 * @apiError (400) InvalidPseudo Invalid pseudo
 * @apiError (403) ForbiddenBanned User is banned
 *
 */
router.post('/authenticate', (req, res) => {
  const pseudo = req.body.pseudo
  const password = req.body.password

  if(!pseudo || !password){
    return res.status(422).json({errors: "pseudo or password is required !"});
  }

  userModel.findOne({"pseudo" : pseudo}, function(err,user){
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Internal error' });
    }

    if(user){

      if(user.isBanned){
        return res.status(403).send({ errors: 'You are banned !' });
      }
      // check poassword
      bcrypt.compare(password, user.password, function(err, result) {
        if (err){
          console.log(err)
          return res.status(500).send({ errors: 'Internal error' });
        }
        // if password is correct
        if(result){
          // update state in user
          userModel.findOneAndUpdate({"_id": user.id},{"isConnected" : true},{new: true}, function(err){
            if(err){
              console.log(err);
              return res.status(500).json(err);
            }
            console.log("user update");
          });

          // format user and create token
          user.password = "";
          user.isConnected = true;
          var token = jwt.sign({user}, process.env.JWT_KEY, {expiresIn: 86400});
          res.status(200).json({token: token});
        }else{
          return res.status(400).json({errors: "password is invalid !"});
        }
      })
    }else{
      return res.status(400).json({errors: "pseudo is invalid !"});
    }
  });
});

/**
 * @api {post} /users/ register
 * @apiName PostUser
 * @apiGroup User
 * @apiPermission none
 * @apiDescription register a user and save it in database
 *
 * @apiParam {String} pseudo pseudo of user
 * @apiParam {String} password password of user
 * @apiParam {String} mail mail of user
 *
 * @apiSuccess (201) NoContent NoContent
 *
 * @apiError (422) FiedMissing field pseudo,password or mail is not filled
 * @apiError (400) InvalidPorM Pseudo or mail already exist
 *
 */
router.post('/', (req, res) => {

  const pseudo = req.body.pseudo;
  const password = req.body.password;
  const mail = req.body.mail;

  if(!pseudo || !password || !mail){
    return res.status(422).json({errors: " fields are not filled !"});
  }

  // find if a user with the same pseudo and email exist
  userModel.findOne({$or: [{"pseudo": pseudo},{"mail": mail}]},function(err,user1){
    if(err){
      console.log(err);
      return res.status(500).json(err);
    }

    // case of is exist
    if(user1){
      console.log("pseudo or mail already exist");
      return res.status(400).json({ errors: "pseudo or mail already exist" });
    }

    // create user with model
    var user = new userModel();
    user.pseudo = pseudo;
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    user.mail = mail;

    //save user in database
    user.save(function(err){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("user created");
      return res.status(201).json("user created");
    });
  });
});

/**
 * @api {put} /users/logout logout
 * @apiName PutUserLogout
 * @apiGroup User
 * @apiPermission connected
 * @apiDescription logout a user
 * @apiUse TokenMissingError
 * @apiUse AuthenticateTokenFailed
 *
 * @apiSuccess (204) 204 No content
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I"
 *     }
 *
 */
router.put('/logout', (req, res) => {

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

    // update state user
    userModel.findOneAndUpdate({"_id": decoded._id},{"isConnected" : false},{new: true}, function(err){
      if(err){
        console.log(err);
        return res.status(500).json(err);
      }
      console.log("user update and logout");
      res.status(204).send({ token: null });
    });

  });
})

/**
 * @api {get} /users/:id get by id
 * @apiName GetUserbyId
 * @apiGroup User
 * @apiPermission none
 * @apiDescription get data of user by is id.
 *
 * @apiParam {String} id id of user
 *
 * @apiSuccess {String} pseudo pseudo of the user
 * @apiSuccess {String} mail mail of the user
 * @apiSuccess {String} password empty password of the user
 * @apiSuccess {String} city city of the user
 * @apiSuccess {Boolean} isAdmin indicates if user is admin or not
 * @apiSuccess {Boolean} isConnected pseudo indicates if user is connected or not
 * @apiSuccess {Boolean} isBanned  indicates if user is banned or not
 * @apiSuccess {String[]} idPropositions Array of id of the user s propositions
 * @apiSuccess {String[]} Array of id of the user s answer
 *
 * @apiError (204) UserNotFound User not found
 *
 */
router.get('/:id', async (req,res) =>{
  userModel.findById(req.params.id, function(err,query){
    if (err){
      return res.status(500).send(err);
    }
    // no proposition found
    if(query) {
      // format the query
      query.password = "";
      result = {};
      result[query._id] = query;
      res.status(200).json(result);
    }else{
      res.status(204).send({errors : "No user found"});
    }
  })
});

/**
 * @api {get} /users/ get all
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission none
 * @apiDescription get all user
 *
 * @apiSuccess {String} pseudo pseudo of the user
 * @apiSuccess {String} mail mail of the user
 * @apiSuccess {String} password empty password of the user
 * @apiSuccess {String} city city of the user
 * @apiSuccess {Boolean} isAdmin indicates if user is admin or not
 * @apiSuccess {Boolean} isConnected indicates if user is connected or not
 * @apiSuccess {Boolean} isBanned indicates if user is banned or not
 * @apiSuccess {String[]} idPropositions Array of id of the user s propositions
 * @apiSuccess {String[]} idAnswers Array of id of the user s answer
 *
 */
router.get('/', (req,res) =>{
  userModel.find({}, function(err,query){
    if (err){
      return res.status(500).send(err);
    }
     // format the query
    result = {};
    for (var i = 0; i < query.length; i++) {
      query[i].password = "";
      result[query[i]._id] = query[i];
    }
    res.status(200).json(result);
  })
});

module.exports = router
