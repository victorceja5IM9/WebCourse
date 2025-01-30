import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3300;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "espartan117",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 5;
let currentColor = "teal";
/*let users = [
  { id: 5, name: "Angela", color: "teal" },
  { id: 6, name: "Jack", color: "powderblue" },
];*/

async function getRegisteredUsers(){
  const result = await db.query("SELECT * FROM users");
 let users = [];
 result.rows.forEach((user) => {
  users.push({id: user.id, name: user.name, color: user.color});
 });
 return users;
}

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries where useID = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUserColor(){
  const result = await db.query("SELECT color FROM users where id=$1", [currentUserId]);
  return result.rows[0].color;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const users = await getRegisteredUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentColor,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(coutry_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, useID) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  const {user, add} = req.body;
  if(add === "new"){
    res.render("new.ejs");
  }else{
  currentUserId = user;
  currentColor = await getUserColor();
  res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const {name, color}  = req.body;
  try{
  const result = await db.query("INSERT INTO users (name, color) VALUES ($1,$2) RETURNING id", [name, color]);
  const registeredUserId = result.rows[0].id;
  currentUserId = registeredUserId;
  currentColor = color;
  res.redirect("/")
  }catch(err){
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
