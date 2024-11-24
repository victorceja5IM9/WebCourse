import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;
const database = new pg.Client({
  user: 'postgres',
  password: 'espartan117',
  host: 'localhost',
  database: 'world',
  port: 5432
});
database.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



async function checkVisitedCountries() {
  const result = await database.query('Select country_code from visited_countries');

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  //Write your code here.

  const countries = await checkVisitedCountries();
  res.render('index.ejs', { countries: countries, total: countries.length })
});

app.post("/add", async (req, res) => {
  const { country } = req.body;
  console.log(country);

  try {
    //First we need to get the code from the country we are adding
    const result = await database.query('Select country_code from countries where coutry_name Like $1', [country]);
    //console.log(result.rows[0].country_code);
    const country_code = result.rows[0].country_code;
    try{
      //Now we got the code of the country that we submitted so now we have to register the code into de visited_countries table in the db
    const query = "Insert into visited_countries (country_code) values ($1)";

    await database.query(query, [country_code]);
    res.redirect("/");  
    }catch(err){
      console.log(err);
      const countries = await checkVisitedCountries();
      res.render("index.ejs", {countries: countries, total: countries.length, error: "Country has already been added, please try again!"});
    }
    
  } catch (err) {
    console.log(err);

    const countries = await checkVisitedCountries();
    res.render('index.ejs', { countries: countries, total: countries.length, error: "Something went wrong, please try again!" })
  }





});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
