const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Naya",{
    useNewurlParser:true,
    useUnifiedToPology:true
},()=>{
    console.log("Naya DataBase connected Successfully")
});

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String,
    Profile:String,
})
const User=new mongoose.model("User",userSchema)


app.post("/login",(req,resp)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                // alert("Login Successfull")
                resp.send({message:"Login Successfull",user:user})
            }else{
                resp.send({message:"Password didn't match"})
                // alert("Password didn't match")
            }
        }else{
          resp.send({message:"user not registered"})
        }
    })

})

app.post("/register",(req,resp)=>{
    const {name,email,phone,password,Profile}=req.body
     User.findOne({email:email},(err,user)=>{
        if(user){
            resp.send({message:"User already Registered"})
        }else{
            const user=new User({
                name,
                email,
                phone,
                password,
                Profile
            })
        
            user.save(err=>{
                if(err){
                    resp.send(err)
                }else{
                    resp.send({message:"Successfully Registered ,please login now!"})
                }
            })
        }
     })  
})
app.listen(9002,()=>{
    console.log("BE Started at portal 9002")
})
