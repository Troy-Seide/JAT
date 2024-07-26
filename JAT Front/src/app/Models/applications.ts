export class Applications {
    //userId: any;
    _id:any;
    userId: any;
    companyName:String;
    position:String;
    description:String;
    location:String;
    status: String;
    dateApplied: String;

}

// _id:{type:mongoose.Schema.Types.ObjectId, auto:true},
// userId:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
// companyName:{type:String},
// position:{type:String},
// description:{type:String},
// location:{type:String},
// status:{type:String},
// dateApplied: {type:String},