import React, { useState } from 'react';

const AddList = ({ onAdd }) => {
    const [newTask, setNewTask] = useState("");

    const handleChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAdd = () => {
        onAdd(newTask);
        setNewTask("");
    };

    return (
        <div>
            <input 
                type="text" 
                value={newTask} 
                onChange={handleChange} 
                placeholder="Add a new task" 
            />
            <button onClick={handleAdd}>+</button>
        </div>
    );
};

export default AddList;