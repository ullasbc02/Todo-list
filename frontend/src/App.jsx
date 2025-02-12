import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList";
import './index.css'; // Ensure this import is correct

const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/todos")
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching todos:", error));
    }, []);

    const handleAdd = (newTask) => {
        setTodos([...todos, newTask]);

        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: newTask })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task added:", data);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    };

    const handleDelete = (taskToDelete) => {
        setTodos(todos.filter(task => task !== taskToDelete));

        fetch(`http://localhost:3000/todos/${taskToDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Task deleted:", data);
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };

    return (
        <div className="container">
            <div className="overlay"></div>
            <div className="content">
                <h1>Todo List</h1>
                <AddList onAdd={handleAdd} />
                <TodoList todos={todos} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default App;