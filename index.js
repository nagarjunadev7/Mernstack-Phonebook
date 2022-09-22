const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const phoneBook = require("./model/phonebook");
require("dotenv").config();
const app = express();
const cors = require('cors');

var corsOptions = {
    origin: "https://splendid-klepon-9cea5b.netlify.app"
  };
  
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}).then(()=>{
    console.log("Database Connected")
})

//get route
app.get("/getnumber", async(req, res)=>{
    const phoneNumbers = await phoneBook.find({});
    try {
        res.status(200).json({
            status:"sucessful",
            data:{
              phoneNumbers
            }
        })
        
    } catch (error) {
        res.status(501).json({
            status:"Failed to Fetch data",
            msg:error
        })
    }
})

//posting route
app.post("/addphone", function(req, res){

    const phoneNumber = new phoneBook(req.body);
    try {
        phoneNumber.save();
        res.status(201).json({
            status:"sucessful",
            data:{
                phoneNumber
            }
        })
        
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message : {
                error
            }
        })
    }
})

//Update route

app.patch("/updatenumber/:id",async(req, res)=>{
const myUpdateNumber = await phoneBook.findByIdAndUpdate(req.params.id, req.body,{
    new : true,
    runValidators : true
})
try {
    res.status(200).json({
        status:"Sucessfuly Changed",
        data:{
            myUpdateNumber
        }
    }
    )
} catch (error) {
    console.log(error);
}
})

//Delete Route

app.delete("/deletenumber/:id", async(req, res)=>{
    await phoneBook.findByIdAndDelete(req.params.id);
     try {
         res.status(200).json({
             status:"Data Deleted Sucessfully",
             data : {}
         })
         
     } catch (error) {
        log("We are unable to Delete your request."); 
     }
})
    

app.listen(process.env.PORT || 8080, function(req, res){
    console.log("Server Running Sucessfully");
})