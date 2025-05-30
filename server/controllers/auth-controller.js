const User = require("../models/user-model");
const bycrypt = require("bcrypt");

const home = async (req, res)=> {
    try{
        res.status(200).send("auth - from home");
    } 
    catch(error){
        console.log(error);
    }

};

//////////////////////////////////// 
const register = async (req, res) => {
    try {

        const {username , email , phone , password} = req.body;
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(400).json({message:"User already exists"});
        }

        const createdUser = await User.create({
             username, 
             email,
             phone,
             password
    });

        res.status(201).json({ message: "registeration Success", token: await createdUser.generateToken(), userId:
            createdUser._id.toString(),
        });
    }
    catch (error) {
    //    res.status(500).send({msg:"Internal server error"})
    next(error);
    }

};
//////////////////////////////////////////
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email});
        ///checking userexists values
        console.log(userExists);

        if(!userExists){
            return res.status(400).json({message:'Invalid Credential'});
        }

        //const user = await bycrypt.compare(password,userExists.password);
        const user = await userExists.comparePassword(password);

        if(user){
            res.status(200).json({
                message: "login success", 
                token: await userExists.generateToken(),
                userId:userExists._id.toString(),
            });
        }else
            {
                res.status(401).json({message:'Invalid Credential'});
            }
        }
        
    catch (error) {
        res.status(500).send({msg:"Internal server error"})
    }
};

// current loged in user data

const user = async(req,res) =>
{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});       
    } 
    catch (error)
     {
        console.log(`error from user route ${error}`);        
    }

}




module.exports = {  home , register ,login,user};