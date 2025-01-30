import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
const app = express();
const port = 3000;

const database = new pg.Client({
  port: 5432,
  database: 'permalist',
  user: 'postgres',
  host: 'localhost',
  password: 'espartan117'
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
database.connect();
let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

const getTasks = async () => {
  const result = await database.query('SELECT * FROM tasks ORDER BY id ASC');
  let tasks = [];
  if(result.rows.length < 0){
    console.log('There has been an error while obtaining the tasks');
  }else {
    result.rows.forEach(task => {
      tasks.push({id: task.id, name: task.name, status: task.status})
    });
  }
  
  return tasks;
}

app.get("/", async (req, res) => {
  const tasks = await getTasks();
  console.log(tasks);

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
