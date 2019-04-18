const mongoose = require('mongoose');
// const Schema = mongoose.Schema; 
//another way 
const { Schema } = mongoose;

const uerSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', uerSchema);

