const express =require("express");
const router =express.Router();
const User=require("../models/schema");
const {body,validationResult}=require("express-validator");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET='Medhaisagoodg$irl'
//Route 1: create a post using: POST "/reg". No login required
router.post('/createuser',[
     //body('email','Enter a valid email').isEmail(),
    // body('password','Password must be atleast 5 character').isLength({min:5}),
],async (req,res)=>{
    let success=false;
    //If there are errors return bad rquest and the errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    }
    //check whether the user with this email already exists
    try{
    
        let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"})
    }
    const salt =await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //create a new user
    user=await User.create({
        email:req.body.email,
        password:secPass,
    });
    const data={
        user:{
            id:user.id
        }
    }
   

    const authtoken=jwt.sign(data,JWT_SECRET);
        success=true
        res.json({success,authtoken});
}catch(error){
    console.error(error.message);
    res.status(500).send("internal server error");
}
})

//Route 2: Authenticate a post using: POST "/reg". No login required
router.post('/login',[
    //body('email','Enter a valid email').isEmail(),
   // body('password','Password can not be blank').exists(),
],async (req,res)=>{
    let success=false;
    //If there are errors return bad rquest and the errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} =req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

//Rout 3: Get loggedin User Details using:POST "/reg/getuser"
router.post('/getuser',fetchUser,async (req,res)=>{
    try{
        userId=req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})



module.exports=router;