const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
  dateAnswer:{
    type: Date,
    default : Date.now()
  },
  contentAnswer:{
    type:String
  },
  idLikesAnswer:{
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'User'
  },
  isAnonymous:{
    type: Boolean,
    default: false
  },
  ownerAnswer:{
    type: mongoose.ObjectId,
    ref : 'User'
  },
  tagsAnswer:{
    type: [ mongoose.ObjectId],
    ref : 'Tag'
  },
  idProp:{
    type: mongoose.ObjectId,
    ref : 'Proposition'
  }
});



// le 3eme parametre est le nom de la collection dans la base
const Answer =  mongoose.model('Answer',AnswerSchema,'Answer');
module.exports = Answer;
