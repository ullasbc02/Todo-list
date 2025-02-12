import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddList from "./components/AddList";

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
        // Optionally, you can also send the new task to the backend here
    };

    return (
        <div>
           <h1>Todo List</h1>
           <TodoList todos={todos} />
           <AddList onAdd={handleAdd} />
        </div>
    );
};

export default App;
