const mongoose = require('mongoose');

const phoneBookSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    phone:{
        type:Number,
        require:true
    }
})

const phoneBook = mongoose.model('phoneBook', phoneBookSchema);
module.exports = phoneBook;