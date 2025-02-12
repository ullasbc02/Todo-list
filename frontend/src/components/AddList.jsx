import React, { useState } from 'react';

const AddList = ({ onAdd }) => {
    const [newTask, setNewTask] = useState("");

    const handleChange = (e) => {
        setNewTask(e.target.value); //when the user types in the input field, the state is updated
    };

    const handleAdd = () => {
        onAdd(newTask); //onAdd is a prop passed from the parent component
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