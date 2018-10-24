const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password:{type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});
schema.pre('save', function(next){
    now = new Date();    
    if(!this.createdDate) {
        this.createdDate = now
    }
    next();
});

module.exports = mongoose.model('User', schema);