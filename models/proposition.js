const mongoose = require('mongoose')

const PropositionSchema = new mongoose.Schema({
  titleProp:{
    type:String,
    required: true
  },
  dateProp:{
    type: Date,
    default : Date.now
  },
  contentProp:{
    type:String,
    required: true
  },
  idLikesProp:{
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'User'
  },
  isAnonymous:{
    type: Boolean,
    default: false
  },
  ownerProp:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : 'User'
  },
  tagsProp:{
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'Tag'
  },
  idAnswers:{
    type: [mongoose.Schema.Types.ObjectId],
    ref : 'Answer'
  }
});

// Create a virtual property like to sort by like
PropositionSchema.virtual('nbLikes').get(function() {
  return idLikesProp.length;
});

// le 3eme parametre est le nom de la collection dans la base
const Proposition = mongoose.model('Proposition',PropositionSchema,'Proposition');
module.exports = Proposition;
