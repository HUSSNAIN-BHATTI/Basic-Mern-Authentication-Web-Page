const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const { response } = require("express");

const getAllUsers= async (req,res)=>{
     try {
        const users = await User.find({},{password:false});
        console.log(users);        
        if(!users || users.length === 0){
            return res.status(404).json({message: 'No users found'});
        } 
        return res.status(200).json(users);        
     } catch (error) {
        next(error);        
     }
}

const getAllcontacts = async (req,res)=>{
   try {
      const contacts = await Contact.find();
      if(!contacts || !contacts.length === 0){
         response.status(404).json({message:"no contacts found"});
      }
      return res.status(200).json(contacts);
      
   } catch (error) {
      next(error);
   }
}

const deleteUserById = async(req,res,next)=>{
   try {
      const id = req.params.id;
      if (id === User._id) {
         await User.deleteOne({_id: id}); 
         toast.error("You can't delete yourself");
         return res.status(200).json({message: "User deleted successfully"});
      }

   } catch (error) {
      next(error);
   }
   
};

const GetUserById = async (req, res, next) => {
   try {
      const id = req.params.id;
      const data = await User.findOne({ _id: id },{password: false});
      return res.status(200).json({ data });

   } catch (error) {
      next(error);
   }

};

const updateUserById = async (req, res, next) => {
   try {
      const id = req.params.id;
      const Userdata = req.body;
      const updatedUserdata = await User.updateOne({_id: id}, { 
         $set: Userdata ,
       });

      return res.status(200).json({ updatedUserdata });

   } catch (error) {
      next(error);
   }

};

const DeletecontactById = async (req, res, next) => {
   try {
      const id = req.params.id;
      await Contact.deleteOne({_id: id});
      return res.status(200).json({ message : "Message Deleted" });

   } catch (error) {
      next(error);
   }

};












module.exports = { getAllUsers, getAllcontacts, deleteUserById, GetUserById, updateUserById, DeletecontactById };