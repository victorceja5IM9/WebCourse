import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(port, ()=> {
    console.log("Servidor iniciado en el puerto: " + port);
});

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
})

app.post("/post", (req, res) => {
    var post = {
        titulo: req.body["titulo"],
        contenido: req.body["contenido"]
    }
    posts.push(post);
    //console.log(posts);
    res.render("index.ejs", {posts: posts});
});

app.get("/postinf", (req, res)=>{
    console.log("Hola")
    console.log(req)
});


app.delete('/delpost/:indice', (req, res) => {
    const indice = req.params.indice;
    posts.splice(indice, 1); // Elimina la tarjeta del arreglo
    console.log('Tarjeta eliminada con éxito');
    res.render("index.ejs", {posts: posts});
});