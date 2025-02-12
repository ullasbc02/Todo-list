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
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newTask = req.body.message;
    todos.push(newTask);
    db.query("INSERT INTO todolist (message) VALUES ($1)", [newTask], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
        } else {
            console.log(result.rows);
        }
    });
    res.json({ message: 'Task added successfully' });
});

app.delete('/todos/:task', (req, res) => {
    const taskToDelete = req.params.task;
    todos = todos.filter(task => task !== taskToDelete);
    db.query("DELETE FROM todolist WHERE message = $1", [taskToDelete], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
        } else {
            console.log(result.rows);
            // Reset the sequence if the table is empty
          
        }
    });
    res.json({ message: 'Task deleted successfully' });
});

app.get('/', (req, res) => {
    res.send('Welcome to Todo-list Application');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Close the database connection when the application is shutting down
process.on('SIGTERM', () => {
    db.end(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    db.end(() => {
        console.log('Database connection closed');
        process.exit(0);
    });
});
