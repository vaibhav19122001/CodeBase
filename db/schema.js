const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDb = new Schema({
  handle_codeforces:{
    type: String,
    required:[true,"Its seems something is missing!!"],
    unique:[true,"user name has been taken!!"]
  },
  profile_picture:{
    type: String,
    required:[true,"Its seems something is missing!!"]
  },
  email:{
    type: String,
    required:[true,"Its seems something is missing!!"],
    unique:[true,"user name has been taken!!"]
  },
  password:{
      type:String,
      required:[true,"Its seems something is missing!!"]
  },
  badge:{
    type: [Boolean],
    required:[true,"Its seems something is missing!!"]
  },
  max_badge:{
    type:Number,
    required:[true,"Its seems something is missing!!"]
  },
  graph:{
    type:[Number]
  },
  question_solved:{
    type:Number
  },
  total_question:{
    type:Number,
    required:[true,"Its seems something is missing!!"]
  },
  recent_question:{
    type:[{
      name:String,
      link:String
    }]
  }
});

const userModel = mongoose.model('users', userDb);

module.exports = userModel;
