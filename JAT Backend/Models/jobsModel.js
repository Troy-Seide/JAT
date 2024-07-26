const mongoose = require('mongoose')
const jobsSchema = new mongoose.Schema({
    // userId: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    // userId:String,
    // companyName:String,
    // position:String,
    // description:String,
    // location:String,
    // status:String,
    // dateApplied: String
    _id:{type:mongoose.Schema.Types.ObjectId, auto:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    companyName:{type:String},
    position:{type:String},
    description:{type:String},
    location:{type:String},
    status:{type:String},
    dateApplied: {type:String},
    // status: {
    //     type: String,
    //     enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
    //     default: 'Applied'
    // },
    // dateApplied:{
    //     type:Date,
    //     default:Date.now
    // }
},
{
    //He made the versionKey false so it wouldn't create the extra column
    //for maintaining the version
    versionKey:false
});
const jobs = mongoose.model('jobs', jobsSchema)
module.exports = jobs