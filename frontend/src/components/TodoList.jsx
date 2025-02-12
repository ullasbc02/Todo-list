import React from 'react';

const TodoList = ({ todos }) => {
    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input type="checkbox" /> {todo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;