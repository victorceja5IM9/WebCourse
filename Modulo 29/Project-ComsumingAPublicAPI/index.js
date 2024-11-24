import express from 'express'
import bodyParser from 'body-parser';
import axios from 'axios';


const PORT = 4000;
const API_URL = "https://pokeapi.co/api/v2/";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Listening into port: ${PORT}`);
})

app.get("/", async (req, res) => {

    res.render("index.ejs");
});

app.post("/getPokemon", async (req, res) => {
    const {nombre} = req.body;

    const response = await axios(API_URL+`pokemon/${nombre}`);
    console.log(response);
    console.log(response.data.name);
    console.log(response.data.sprites.front_shiny);
    res.render("pokemon.ejs", {nombre: response.data.name, img: response.data.sprites.front_shiny});
});


//continuar con el consumo de la API

