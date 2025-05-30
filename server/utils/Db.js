const mongoose = require('mongoose');

// const URI = "mongodb://localhost:27017/Mern_Admin"
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI 

const connect_DB = async () =>{
    try{
        await mongoose.connect(URI);
        console.log("DB connected");
    }
    catch(error){
        console.log(error);
        process.exit(0);
       }
};



module.exports = connect_DB;

