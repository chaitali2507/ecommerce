var mongoose = require('mongoose');

var firstschema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
});
module.exports= mongoose.model("login",firstschema);