import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var weekday = 0;
const messageweek = "Hey! it's a weekday, it's time to work hard";
const messageweeknd = "Hey! it's weekend, it's time to have fun";
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log("El servicio esta corriendo en el puerto: " + port);
})

app.get("/", (req, res)=>{
    GetWeekDay();
    if(weekday > 0 && weekday <6)
        res.render("index.ejs",{ message: messageweek});
    else
        res.render("index.ejs",{ message: messageweeknd});
});

function GetWeekDay(){
    const mstoday = Date.now();
    const today = new Date(mstoday);
    weekday = today.getDay();   
    console.log(today.toDateString());
}