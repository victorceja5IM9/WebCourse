//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { url } from "inspector";
import { checkPrime } from "crypto";

const _dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var validation = false;
app.use(bodyParser.urlencoded({extended:true}));
app.use(CheckPassword);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res)=>{
    res.sendFile(_dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(validation === true){
        res.sendFile(_dirname + "/public/secret.html");
    }else{
        res.send("<h1>Contraseña Incorrecta</h1>");
    }
    
});

function CheckPassword(req, res, next){
    if(req.body["password"] === "hola123"){
        validation = true;
    }else{
        validation = false;
    }
    next();
}