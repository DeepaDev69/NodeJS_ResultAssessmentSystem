const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    regno: {
        type: Number
    },
    email: {
        type: String
    },
    section: {
        type: String
    },
    ca1: {
        type:Number
    },
    ca2: {
        type:Number
    },
    ca2: {
        type:Number
    },
    ca3: {
        type:Number
    },
    mte: {
        type:Number
    },
    ete: {
       type:Number 
    },
    coursename: {
        type: String
    },
    pg: {
        type:Number
    },
    atmarks: {
        type:Number
    }
});

// Custom validation for email
studentSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Student', studentSchema);

