const mongoose =require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new mongoose.Schema({   
    email:String,
    cart:[
        {
            name:String,
            img:String,
            price:Number, 
            id:mongoose.Schema.Types.ObjectId,
            count: { type: Number, default: 0 }
            
        }
    ],
    totalItems:Number,
    totalCost:Number,
    phoneNumber:Number,
    identity:String,
    googleId:String
})

userSchema.plugin(passportLocalMongoose);

// console.log(userSchema);

const User=new mongoose.model("User",userSchema);

module.exports=User