import React, { useState, useEffect } from 'react';
import {instance} from '../util/axios.js';
const TodoList = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        setTodoList(getTodoList());
    }, [])

    const getTodoList = async() => {
        try {
            const res = await instance.get('/todos');
            console.log(res, 'res');
            return res.data;
        }catch(error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {todoList.length > 0 && todoList?.map((todo) => 
                <li>
                    <label>
                        <input type="checkbox" />
                        <span></span>
                    </label>
                </li>
            )}
            <input data-testid="new-todo-input"  placeholder='todo'/>  
            <button data-testid="new-todo-add-button">추가</button>
        </>
    )
}

export default TodoList;
