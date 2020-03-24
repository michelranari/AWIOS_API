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


// return all answers
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

// return answer by id
router.get('/:id_answer', async (req,res) =>{
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

router.post('/delete', async (req, res) => {
  // get the token
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return res.status(401).send({ errors: 'Authentication error. Token required' });
  var token  = authorizationHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_KEY , function(err, decoded) {
    if (err){
      console.log(err)
      return res.status(500).send({ errors: 'Failed to authenticate token.' });
    }

    console.log(typeof req.body.id_answer)
    answerModel.findByIdAndRemove(req.body.id_answer, async function(err1,deleted){

      if (err1){
        console.log(err1)
        return res.status(500).send(err1);
      }

      if(deleted){
        // update array of idAnswers in answer model
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
          });
        });

        // delete all tag in answers
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');
        myHeaders.append('Authorization',token);

        for (var i = 0; i < deleted.tagsAnswer.length; i++) {
          var myInit = { method: 'POST',
                         headers: myHeaders,
                         body : { id_tag: deleted.tagsAnswer[i],id_toDelete : deleted._id}
                       };
          console.log("here")
          try{
          await fetch("localhost:3001/tags/delete").then(response => console.log(response));
          return res.status(200).json("answer deleted succesfuly");
        }catch(error){console.log(error)}

        }

      // if delete fail
      }else{
        return res.status(500)
      }
    })
  })
})


router.post('/newAnswer', (req, res) => {

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

module.exports = router
