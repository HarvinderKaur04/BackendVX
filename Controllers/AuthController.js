const User = require("../Models/UserModel.js");
const { createSecretToken } = require("../util/SecretToken.js");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({
      message: "User signed in successfully",
      success: true,
    });

    next();
  } catch (e) {
    console.error("Signup error:", e);
    res.status(500).json({ message: "User failed", error: e.message });
  }
};


module.exports.Login=async(req,res,next)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.json({message:"All Fields are required"});
    }
    const user=await User.findOne({email})
    if(!user){
      return res.json({message:"Incorrect Password and email Id"});
    }
    const auth=await bcrypt.compare(password,user.password)
    if(!auth){
      return res.json({message:"Incorrect Password and email Id"});
    }
    const token=createSecretToken(user._id);
    res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
    });
    res.status(201).json({message:"User Logged in Sucessfully",success:true})
    next()
  }catch(e){
    console.error("Login error:", e);
    res.status(500).json({ message: "User failed", error: e.message });
  }
}