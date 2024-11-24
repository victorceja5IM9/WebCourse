import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
const app = express();
const port = 3000;

const database  = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "espartan117",
  port: 5432
});

database.connect();

let quiz = [];

database.query("Select * from flags", (err, results) => {
  if(err){
    console.log("Error obtaining the info: ", err.stack);
  }else{
    quiz = results.rows;
  }
  database.end()
})

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
