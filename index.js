const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
var PythonShell = require('python-shell');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/miniproject").then(()=>{
    console.log("Successfully connected to MongoDB");
})
.catch((e)=>{
    console.log("Error connecting to MongoDB");
})
const data=mongoose.Schema({
    total_sqft:{
        type:Number,
    },
    bath:{
        type:Number,
    },
    balcony:{
        type:Number,
    },
    bhk:{
        type:Number,
    },price:{
        type:Number,
    }
})
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};
const entry=mongoose.model("entry",data);
app.get("/",function(req,res)
{
    res.render("submit");
})
app.post("/",function(req,res)
{
    const sq_foot=req.body.Squareft;
    const bath=req.body.uiBathrooms;
    const balcony=req.body.uiBalcony;
    const bhk=req.body.uiBHK;
    console.log("hello");
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./hello.py",
                            sq_foot,bath,balcony,bhk] );

                            console.log("hello1");
    // console.log(process);
    console.log("helloiii");
    process.stdout.on('data', function(data) {
        //console.log(uint8arrayToString(data));
        console.log("hello25");
        var result=uint8arrayToString(data);
        console.log("hello23");
        res.render("output",{output: result});
        console.log("hello2");
    })
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
    });













