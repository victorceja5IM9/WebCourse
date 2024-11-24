import express from "express";
import bodyParser from "body-parser";
  import { dirname } from "path";
  import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var bandName ="";

app.use(bodyParser.urlencoded({extended: true}));
app.use(getBandName);
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) =>{
    res.send(`<h1>Your band would be:</h1><br><br><h2>${bandName}</h2>`);
});

function getBandName(req, res, next){
  bandName = req.body["street"] + req.body["pet"];
  next();
}
