import React, { useState, useContext } from 'react';
import {instance} from '../util/axios.js';
import { TodoContext } from '../context/todo.js';
const TodoList = () => {
    const [todo, setTodo] = useState('');
    const {todos:todoList, addTodo, deleteTodo} = useContext(TodoContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        const res = await addTodo({todo});
        if(res === 201 ) {
            setTodo('');
        }
    }

    const onChangHandler = (todo) => (event)=> {
        console.log(todo, event, 'change');
    }

    return (
        <>
            {todoList.length > 0 && todoList?.map((todo) => 
                <li key={todo.id}>
                    <label>
                        <input type="checkbox" checked={todo.isCompleted} onChange={onChangHandler(todo)}/>
                        <span>{todo.todo}</span>
                    </label>
                </li>
            )}
            <form onSubmit={submitHandler} >
                <input data-testid="new-todo-input"  value={todo} onChange={(event) =>setTodo(event.target.value) }placeholder='todo'/>  
                <button data-testid="new-todo-add-button" type='submit'>추가</button>
            </form>
        </>
    )
}

export default TodoList;
