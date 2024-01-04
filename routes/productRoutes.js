const express = require("express");
const router =  express.Router();
const Product = require("../models/Product");
const {isLoggedIn}=require("../middleware");
const mongoose = require("mongoose");
const dotenv = require('dotenv');  
const axios = require('axios');
const Review = require("../models/Review");
const app = express();
app.use(express.urlencoded({ extended: true }));

// const categories = [
//   'Burgers',
//   'Pizza',
//   'Chicken',
//   'Sandwiches',
//   'Mexican',
//   'Asian-inspired',
//   'Salads',
//   'Sides',
//   'Desserts',
//   'Breakfast',
// ];
const categories=[
  
    {
      name:"Burgers",
      img:"https://img.freepik.com/free-psd/isolated-hamburger-with-splash-ink-background_1409-3855.jpg?w=740&t=st=1704354639~exp=1704355239~hmac=d1d9b958aa5ceff86195725e350dbc3f5c8874d0e54864df943ec5da5bba358b"
    },
    
    {
      name:"Pizza",
      img:"https://img.freepik.com/free-psd/freshly-baked-pizza-with-cut-slice-isolated-transparent-background_191095-9041.jpg?size=626&ext=jpg&ga=GA1.1.1677199685.1694510181&semt=sph"
    },
    {
      name:"Chicken",
      img:"https://image.similarpng.com/very-thumbnail/2022/01/Fried-chicken-logo-template-on-transparent-background-PNG.png"
    },
    {
      name:"Sandwiches",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNNNpq-v4WUMqTCxDSSeCIJRGZWjoA1zrT6Q&usqp=CAU"
    },
    {
      name:"Mexican",
      img:"https://image.similarpng.com/very-thumbnail/2021/06/Chef-logo-template-isoated-on-transparent-background-PNG.png"
    },
    {
      name:"Asian-inspired",
      img:"https://image.similarpng.com/very-thumbnail/2022/01/Fruits-flying-in-a-blender-with-fruit-juice-on-transparent-background-PNG.png"
    },
    {
      name:"Salads",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKM9P5COUyH8Va0H32hSlFjHJ9YrBYDKhHdg&usqp=CAU"
    },
    {
      name:"Sides",
      img:"https://i.pinimg.com/564x/59/5f/a5/595fa5ffb3d67f62ceabaa0d9a40d1e2.jpg"
    },
    {
      name:"Desserts",
      img:"https://i.pinimg.com/564x/ea/0a/01/ea0a01db819a9e1e66c9ccd8138e7428.jpg"
    },
    {
      name:"Breakfast",
      img:"https://i.pinimg.com/564x/93/e2/7d/93e27d33644bc6ea36356103654cdf63.jpg"
    }

  
]
function checkForNullCharacters(obj) {
    for (let key in obj) {
        if (obj[key]==="") {
          return false; 
        }
    }
    return true; 
  }
  let i=1;

router.get("/", async (req,res)=>{   
    
    const products=await Product.find({});    
    res.render("products/homeTemp",{products});
})
router.get("/product2", async (req,res)=>{   
    
    res.render("products/homeTemp2",{categories});
})
router.get("/all", async (req,res)=>{   
    const category=req.query.cat;    
    const products=await Product.find({category});  
    res.render("products/homeTemp3",{products,categories});
})
router.post("/specific", async (req,res)=>{   
    
    const {input}=req.body;
    const products=await Product.find({ name: { $regex: input, $options: 'i' } });

    let productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });

      let productsss = await Product.find({
        frequencyOfPurchase: { $gte: i+1 }
      });

   if(productsss.length>=5){
    i++;
    productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });
   }
    res.render("products/homeTemp",{products,productss});
})
router.post("/searchPrice", async (req,res)=>{   
     
    const {input}=req.body;
    const products = await Product.find({ price: { $lte: input } });
    let productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });

      let productsss = await Product.find({
        frequencyOfPurchase: { $gte: i+1 }
      });

   if(productsss.length>=5){
    i++;
    productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });
   }

    res.render("products/homeTemp",{products,productss});
})
router.get("/specificCategory/men", async (req,res)=>{   
    
    // const {input}=req.body;
    const products = await Product.find({ gender: { $in: ['Men', 'Anyone'] }});
    let productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });

      let productsss = await Product.find({
        frequencyOfPurchase: { $gte: i+1 }
      });

   if(productsss.length>=5){
    i++;
    productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });
   }

    res.render("products/homeTemp",{products,productss});
})
router.get("/specificCategory/women", async (req,res)=>{   
    
    // const {input}=req.body;
    const products = await Product.find({ gender: { $in: ['Women', 'Anyone'] }});
    let productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });

      let productsss = await Product.find({
        frequencyOfPurchase: { $gte: i+1 }
      });

   if(productsss.length>=5){
    i++;
    productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });
   }
    res.render("products/homeTemp",{products,productss});
})
router.get("/sort/:basis", async (req,res)=>{   
    const {basis}=req.params;
    console.log(basis);
    const products = await Product.find().sort(basis);
    let productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });

      let productsss = await Product.find({
        frequencyOfPurchase: { $gte: i+1 }
      });

   if(productsss.length>=5){
    i++;
    productss = await Product.find({
        frequencyOfPurchase: { $gte: i }
      });
   }
    // const products=await Product.find({name:input});
    res.render("products/homeTemp",{products,productss});
})
router.get("/new", async (req,res)=>{  
  const response = await axios.get(`${process.env.BASE_URL}/product/api`); 
    const product = response.data; 
    console.log(response);
    res.redirect("/products");
}) 
router.get("/addProd", (req,res)=>{           
    res.render("products/addTemp"); 
})
router.delete("/:productId",isLoggedIn ,async (req,res)=>{
    const {productId}=req.params; 
    await Product.findByIdAndDelete( productId ); 
    const products=await Product.find({});
    req.flash('success','Item deleted from the cart successfully!');
    res.redirect("/products");
})
// router.get("/:productId", async(req,res)=>{ 
//     const {productId} = req.params; 
//     console.log("IIIDDDIDIDI::::",productId);
//     const product = await Product.findById(productId).populate("review");
    
//     res.render("products/show", {product})
// })

router.get("/go", async (req, res) => {
  const productId=req.query.id;
  try {
    if (productId.endsWith(".jpg")) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = await Product.findById(productId).populate("review");
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.render("products/show", { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/goo", async (req, res) => {
  const productId=req.query.id;
  try {
    if (productId.endsWith(".jpg")) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = await Product.findById(productId).populate("review");
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.render("products/show", { product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// router.get("/goo", async (req, res) => {
//   const =req.query.id;
//   const product=await Product.find({name}).populate("review");
//   res.render("products/show", { product });
// });
router.get("/:productId/edit",isLoggedIn, async (req,res)=>{ 
    const {productId}=req.params;
    const product = await Product.findById( productId );
    res.render("products/update",{product});
})
router.patch("/:productId", async (req,res)=>{
    const {productId}=req.params;
    const product=req.body;
    await Product.findByIdAndUpdate(productId,product);
    req.flash("success",`Details of ${product.name} have been updated suucessfully!!`);
    res.redirect(`/products/${productId}`);
})

module.exports = router