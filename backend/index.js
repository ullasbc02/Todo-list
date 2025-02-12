import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Todo",
    password: "ullas123",
    port: 5432,
  });
  
db.connect();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


let todos = [];
db.query("SELECT message FROM todolist", (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      todos = res.rows.map(row => row.message);
      console.log(todos);
    }
    db.end();
  });

app.get('/todos', (req, res) => {
    res.json(todos);
});
  
app.get('/', (req, res) => {
    res.send('Welcome to Todo-list Application');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
