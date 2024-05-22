var mongoose = require('mongoose');

var firstschema = new mongoose.Schema({
    categories:{
        type:Array
    },
   
});
module.exports= mongoose.model("categories",firstschema);