const mongoose = require("mongoose");

 
const productSchema = new mongoose.Schema({
    category: String,
    name : String,
    price : Number,   
    img : String,
    desc : String, 
    review : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    status:String,
    quantity:Number,
    frequencyOfPurchase: { type: Number, default: 0 },
    top: { type: Number, default: 0 },
    gender:String,
    category:String


})

const Product = mongoose.model("Product", productSchema);
 
module.exports = Product