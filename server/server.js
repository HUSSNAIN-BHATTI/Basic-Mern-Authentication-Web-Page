require('dotenv').config();
const cors = require ("cors");
const express = require('express');
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connect_DB = require("./utils/Db");
const errorMiddleware = require("./middleware/error_middleware");




const corsOptions = {
    origin: 'http://localhost:5173',
    method: "POST ,GET,PUT,DELETE,PATCH",
    credentials: true
};
app.use(cors(corsOptions));


//Middleware Used for Json data conversion
app.use(express.json());

//Middleware Used to set path for routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRoute);

app.use(errorMiddleware);
// port number
const PORT = 3000;


connect_DB().then(()=>{
    app.listen(PORT, ()=>{
    console.log(`server listening on port: ${PORT}`)
});
});