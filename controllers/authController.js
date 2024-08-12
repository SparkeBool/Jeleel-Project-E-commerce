const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { sendActivationEmail } = require('../validations/activateAccount');
const { generateUniqueChars } = require('../validations/utils');
const { validateRegister } = require('../validations/registerValidation');
require('dotenv').config();

exports.register = async (req, res) => {
  
    const error = await validateRegister(req.body);

    if(error){
  
    return  res.status(400).json({message: error});
    }
    
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email Already Exist" });
    }

   const activationToken = generateUniqueChars(32);
   const activationTokenExpires = Date.now() + 20 * 60 *1000;


    //return console.log(hashedPassword);

    const user = new User({
        name,
        email,
        password,
      
      });

      user.activationToken = activationToken;
      user.activationTokenExpires = activationTokenExpires;

      await user.save();

       const activationUrl = `${req.protocol}://${req.get('host')}/api/activate/${activationToken}`;
      
       const message = `
        <body style="background-color: light;" class="">
        <h4> Hello ${name}! </h4>

        Please Click the link below to activate your account

        <a href="${activationUrl}" class="btn btn-dark btn-sm">Activate Account </a>
        
        
        <i> Do not reply email.</i>
        </body>
   `;

      try{
          await sendActivationEmail(email,message)
      }catch(error){
        console.error(error);
      }
      res.status(201).json({ message: 'User Registered', user });
    
   
}

 exports.activate = async(req, res) =>{
  const activationToken = req.params.activationToken;

  const user = await User.findOne({activationToken});

  if(!user){
    return res.status(404).json({msg:'Invalid Token'});
  }

  if(Date.now() > user.activationTokenExpires){
    return res.status(400).json({msg:"token has expired"})
  }
  
  user.isActivate =true;
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;

  await user.save();

  res.status(200).json({message:"Account Activated Succesfully"});

}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
   
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if(!(await user.matchPassword(password))){
      return res.status(400).json({ error: 'invalid email or password' });

    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV =='production'
  });
    res.json({message: "Login Sucessful"}); 
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message }); 
  }
};
