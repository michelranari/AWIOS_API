const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();

// rename
router.post('/authenticate', async (req, res) => {
  const pseudo = req.body.pseudo
  const password = req.body.password
  console.log(pseudo)

  if(!pseudo || !password){
    return res.status(422).json({errors: "pseudo or password is required !"});
  }

  try {
    var query = await userModel.find({"pseudo" : pseudo});

    if(query.length === 0) {
          return res.status(400).json({errors: "pseudo or password is invalid !"});
    } else {
      // todo : password a supprimer
      var result = query[0];
      //password check
      var passwordIsValid = bcrypt.compareSync(password, result.password);
      //console.log(passwordIsValid);
      if(!passwordIsValid) {
            return res.status(400).json({errors: "pseudo or password is invalid !"});
      }
      // create synchrone token
      result.password = null;
      result.isConnected = true;
      // create synchrone token
      var token = jwt.sign({result}, process.env.JWT_KEY, {expiresIn: 86400});
      res.status(200).json({token: token});
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

// to do : gerer le cas ou pseudo et le mail déja enregistrer
router.post('/register', async (req, res) => {

  const pseudo = req.body.pseudo;
  const password = req.body.password;
  const mail = req.body.mail;

  if(!pseudo || !password || !mail){
    return res.status(422).json({errors: " fields are not filled !"});
  }

  // create user with model
  var user = new userModel();
  user.pseudo = pseudo;
  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  user.mail = mail;

  // save user in database
  try{
    await user.save();
    res.status(201);
  }catch (err){
    console.log(err)
    res.status(500).send(err);
  }
});


// fonction inachevé
router.get('/userinfo', async (req,res) =>{
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });

  var token  = authorizationHeader.split(' ')[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    console.log(decoded);

    res.status(200).send(decoded);
  });


});

const db = {
    users : [
        { id : 1, pseudo : 'michel', mdp : 'michelmdp', mail : 'michel@gmail.com' },
        { id : 2, pseudo : 'lucas', mdp : 'lucasmdp', mail : 'lucas@gmail.com' }
    ]
}

module.exports = router
