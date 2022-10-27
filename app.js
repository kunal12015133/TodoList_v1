const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js")

const app = express();


const Items=["One","Two","Three"];
const workItems=[];
app.use(bodyParser.urlencoded({extended : true})); 
app.use(express.static("public"))
app.set("view engine","ejs");



app.get("/",function(req,res){
    
    const day = date.getDate();
    
    res.render('index' , {
        listTitle : day,
        newItem: Items,
        route : "/"
    });
});


app.get("/about",function(req,res){
    res.render('about');
});

app.get("/work",function(req,res){
    res.render("index",{
        listTitle : "Work List",
        newItem: workItems,
        route :"/work"
    })
});



app.post("/work",function(req,res){
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.post("/",function(req,res){
    console.log(req.body);
    const newAddedItem=req.body.newItem;
    Items.push(newAddedItem);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("server started at port 3000");
});