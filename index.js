var express = require("express")
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static("public"))


//the task array with initial placeholders for added task
var task = ["buy socks", "practice with nodejs"]
//placeholder for removed task
var complete = ["finish nodejs"]


//post route for adding new task
app.post('/addtask', function (req, res){
    var newTask = req.body.newTask
//add the new task from the post route into the array
    task.push(newTask)
//after adding to the array go back to the roote route
    res.redirect("/")
})

app.post("/removetask", function(req,res){
    var completeTask = req.body.check;
    if (typeof completeTask === "string"){
        complete.push(completeTask)
        task.splice(task.indexOf(completeTask), 1)
    } else if (typeof completeTask === "object"){
        for (var i = 0; i<completeTask.length; i++){
            complete.push(completeTask[i])
            task.splice(task.indexOf(compelteTask[i]), 1)
        }
    }
    res.redirect("/")
})




//render the ejs and display added task, completed task
app.get('/', function (req,res){
    res.render('index', {task: task , complete: complete})
});


app.listen(3000, function(){
    console.log("Example app listening on port 3000!")
})




//CORS ISSUE 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

