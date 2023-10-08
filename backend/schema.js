const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const itemSchema = mongoose.Schema({
    image: {
        type: String,
        required:true
    },
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
});

const cardSchema = mongoose.Schema({
    image: {
        type: String,
        required:true
    },
    title: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    }
});


module.exports = { 
    userSchema: mongoose.model('users', userSchema), 
    itemSchema: mongoose.model('items', itemSchema),
    cardSchema: mongoose.model('card', cardSchema) 
};