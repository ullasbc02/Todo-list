import React from 'react';

const TodoList = ({ todos, onDelete }) => {
    const handleCheckboxChange = (event, task) => {
        event.preventDefault(); // Prevent the default checkbox behavior
        onDelete(task);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input 
                            type="checkbox" 
                            onChange={(event) => handleCheckboxChange(event, todo)} 
                        /> 
                        {todo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
