const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema({
    //He used auto to generate the ObjectId automatically I think
    // _id:{type:Schema.Types.ObjectId, auto:true},
    // name:{type:String, required: true},
    // contact:{type:String, required: true},
    // address: {type:String },

    _id:{type:Schema.Types.ObjectId, auto:true},
    firstName:{type:String, required: true},
    lastName:{type:String, required: true},
    phone:{type:String, required: true},
    email:{type:String, required: true},
    password: {type:String, required:true},
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job' // Reference to the Job model
        }]
}, {
    //He made the versionKey false so it wouldn't create the extra column
    //for maintaining the version
    versionKey:false
});

//Here we're identifying the model name to create the collection as users
// and then passing the schema
const user = mongoose.model('users', userSchema);
module.exports = user;