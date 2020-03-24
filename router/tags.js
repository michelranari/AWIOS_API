const express = require('express');
const router = express.Router();
const propositionModel = require('../models/proposition')
const userModel = require('../models/user')
const tagModel = require('../models/tag')
const answerModel = require('../models/answer')
const database = require('../database')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config();


// // Return all tags
// router.get('/', (req,res) =>{
//   tagModel.find({}, function(err,query){
//     if (err){
//       return res.status(500).send(err);
//     }
//
//      // format the query
//     result = {};
//     for (var i = 0; i < query.length; i++) {
//       result[query[i]._id] = query[i];
//     }
//     return res.status(200).json(result);
//   })
// });
//

// get 9 best tags
router.get('/bestTags', (req,res) =>{
  tagModel.find({}).sort({"nbOccurence" : "desc"}).limit(9).exec(function(err, tags) {
    if (err){
      console.log(err)
      return res.status(500).send(err);
    }

    console.log("here")
    // if resource exist
    if(tags){
    //format the query
     result = {};
     for (var i = 0; i < tags.length; i++) {
       result[tags[i]._id] = tags[i];
     }
     res.status(200).json(result);
    }else{
      return res.status(204)
    }
  })
})


// delete a tag / called from a proposition or answer
router.post('/delete', (req,res) =>{
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


    tagModel.findById(req.body.id_tag, function(err1,tag){
      if (err1){
        return res.status(500).send(err1);
      }

      // check if a tag is in proposition or answer
      var toDelete = req.body.id_toDelete;
      var prop = tag.idProps.includes(toDelete);

      // if appear more than 1 time
      if(tag.nbOccurence > 1){
        //if is in a proposition
        if(prop){
          // delete the id in idProps field and decrement nbOccurence
          var content = tag.idProps.filter(id => id != toDelete);
          var update = {"idProps" : content,
                        $inc : { "nbOccurence" : -1}}
          tagModel.findOneAndUpdate({"_id" : tag._id},update,{new: true}, function(err2,tag1){
            if(err2){
              console.log(err);
              return res.status(500).json(err2);
            }
            console.log("field idProps in tag model modified");

            // update id tag in proposition model
            propositionModel.findById({_id : toDelete},function(err3,prop1){
              if(err3){
                console.log(err3);
                return res.status(500).json(err3);
              }

              var contentProp = prop1.tagsProp.filter(id => id != req.body.id_tag);
              var update = {"tagsProp" : contentProp }
              propositionModel.findOneAndUpdate({_id : toDelete},update,{new: true},function(err4,prop2){
                if(err4){
                  console.log(err4);
                  return res.status(500).json(err4);
                }
                console.log("here 2")
                console.log("field tagsProps in proposition model modified")
                return res.status(204).json("tag deleted succesfuly");
              });
            });

          });
        }
        // if is in a answer
        else{
          // delete the id in idAnswers field and decrement nbOccurence
          var content = tag.idAnswers.filter(id => id != toDelete);
          var update = {"idAnswers" : content,
                        $inc : { "nbOccurence" : -1}}
          tagModel.findOneAndUpdate({"_id" : tag._id},update,{new: true}, function(err5,tag1){
            if(err5){
              console.log(err5);
              return res.status(500).json(err5);
            }
            console.log("field idAnswers in tag modified");
          });

          // update id tag in answer model
          answerModel.findById({_id : toDelete},function(err6,prop3){
            if(err6){
              console.log(err6);
              return res.status(500).json(err6);
            }
            var contentProp = prop3.tagsAnswer.filter(id => id != req.body.id_tag);
            var update = {"tagsAnswer" : contentProp }
            answerModel.findOneAndUpdate({_id : toDelete},update,{new: true},function(err7,prop4){
              if(err7){
                console.log(err7);
                return res.status(500).json(err7);
              }
              console.log("field tagsAnswer in Answer model modified")
              return res.status(200).json("tag deleted succesfuly");
            });
          });
        }

      // if appear 1 time : delete the tag
      }else{
        tagModel.findByIdAndRemove(req.body.id_tag,function(err8,deleted){
          if(err8){
            console.log(err8);
            return res.status(500).json(err8);
          }
          console.log(prop);
          if(prop){
            propositionModel.findById({_id : toDelete},function(err9,prop5){
              if(err9){
                console.log(err9);
                return res.status(500).json(err9);
              }
              var contentProp = prop5.tagsProp.filter(id => id != req.body.id_tag);
              var update = {"tagsProp" : contentProp }
              propositionModel.findOneAndUpdate({_id : toDelete},update,{new: true},function(err10,prop6){
                if(err10){
                  console.log(err10);
                  return res.status(500).json(err10);
                }
                console.log("field tagsProps in proposition model modified")
                return res.status(204).json("tag deleted succesfuly");
              });
            });
          }else{
            // update id tag in answer model
            answerModel.findById({_id : toDelete},function(err11,prop7){
              if(err11){
                console.log(err11);
                return res.status(500).json(err11);
              }
              var contentProp = prop7.tagsAnswer.filter(id => id != req.body.id_tag);
              var update = {"tagsAnswer" : contentProp }
              answerModel.findOneAndUpdate({_id : toDelete},update,{new: true},function(err12,prop7){
                if(err12){
                  console.log(err12);
                  return res.status(500).json(err12);
                }
                console.log("field tagsAnswer in Answer model modified")
                return res.status(200).json("tag deleted succesfuly");
              });
            });
          }
        })
      }
    });
  })
})

// get tag by id
router.get('/:id_tag', (req,res) =>{
  tagModel.findById(req.params.id_tag, function(err,query){
    if (err){
      return res.status(500).send(err);
    }
    // no proposition found
    if(!query) {
      return res.status(204).send({errors : "No tag found"});
    }
     // format the query
     result = {};
     result[query._id] = query;
     return res.status(200).json(result);
  })
});

module.exports = router
