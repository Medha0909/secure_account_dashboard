const { throwError } = require("@syncfusion/ej2-base");
const OTP = require("../models/otp");
const SignInUser = require("../models/signIn");
const bcrypt =require("bcrypt");
const sendEmail = require("./sendEmail");
const generateOTP = require("./generateOTP");
const User = require("../models/schema");
const jwt =require("jsonwebtoken");

const JWT_SECRET = "Medhaisagoodg$irl";

const {AUTH_EMAIL}=process.env;

const hashData = async(data,saltRounds=10)=>{
    try{
        const hashedData = await bcrypt.hash(data,saltRounds);
        return hashedData;
    }catch (error){
        throw error;
    }
};

const verifyHashedData = async (unhashed,hashed)=>{
    try{
        const match=await bcrypt.compare(unhashed,hashed);
        return match;
    } catch (error){
        throw error;
    }
};

const verifyOTP = async({email,otp})=>{
    try{
        if(!(email && otp)){
            throw Error("Provide values for email,otp");
        }
        
        //ensure otp record exists
        const matchedOTPRecord = await OTP.findOne({
            email
        });

        

        if(!matchedOTPRecord){
            throw Error("No otp records found.");
        }

        const {expiredAt} = matchedOTPRecord;
        //checking for expired code
        if(expiredAt < Date.now())
            {
                await OTP.deleteOne({email});
                throw Error("Code has expired. Request for a new one")
            }


        //not expired yet,verify the value    
        const hashedOTP =matchedOTPRecord.otp;
        const validOTP= await verifyHashedData(otp,hashedOTP);

        console.log({validOTP})
        //finding loggedIn user details
        let userdata = await User.findOne({
            email
        });
        userdata=JSON.parse(JSON.stringify(userdata));
        console.log(userdata);

        const details = await new SignInUser({
            userId:userdata._id,
            loginTime:new Date().getTime(),
            device:"abcd",
            status:"loggedIn",
        });
        const deleteOne = await details.save();

            //signIn.save({userId,loginTime:new Date().getTime(),device:"abcd",status:"loggedIn"});
            const authtoken=jwt.sign(userdata._id,JWT_SECRET);
            success=validOTP;
            return {success,authtoken};

        }catch(error){
            throw error;
        }
    };


const sendOTP = async ({email})=>{
    try{
       const subject= "Email verification";
       const message= "Verify your email with the code below";
        const duration= 5;
        if(!(email)){
            throw Error("Provide value for email");
        }
        //clear and old record
        await OTP.deleteOne({email});

        //generate pin
        const generateotp = await generateOTP();

        //send email
        const mailOptions={
            from: AUTH_EMAIL,
            to: email,
            subject,
            html:`<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generateotp}</b></p><p>This code <b>expires in ${duration} minutes</b>.</p>`,
        };

        const hashedOTP = await hashData(generateotp);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now()+60000* +duration,
        });

        const createdOTPRecord = await newOTP.save();

        sendEmail(mailOptions);
        return createdOTPRecord;

        }catch(error){
            throw error;
        }
    };
    const deleteOTP =async(email)=>{
        try{
            await OTP.deleteOne({email});
        }catch(error){
            throw Error;
        }
    };


    module.exports={sendOTP,verifyOTP,deleteOTP};