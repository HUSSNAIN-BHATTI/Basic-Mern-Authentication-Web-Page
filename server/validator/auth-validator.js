const {z} = require("zod");
//creating object schema
const signUpschema = z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be 3 char"})
    .max(255,{message:"Name must not exceed 255 characters"}),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email format"})
        .min(3, { message: "Name must be 3 char" })
        .max(255, { message: "Name must not exceed 255 characters" }),
    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "phone must have 10 numbers" })
        .max(15, { message: "phone must not exceed 15 numbers" }),
    password: z
        .string({ required_error: "password is required" })
        .min(10, { message: "password must be least 10 characters" })
        .max(25, { message: "phone must not exceed 25 numbers" }),
});

module.exports = signUpschema;