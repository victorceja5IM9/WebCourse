// HINTS:
import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
// 1. Import express and axios
const port = 3000;
const app = express();
const API_URL = "https://secrets-api.appbrewery.com";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", async (req, res) =>{
    try{
        const result = await axios.get(API_URL+"/random");
        const secret = result.data.secret;
        const username = result.data.username;
        res.render("index.ejs", {secret: secret, user:username});
    }catch(error){
        console.error("Failed to make request. ", error.message);
    }
    res.render("index.ejs", {secret: "", user:""});
});
// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
