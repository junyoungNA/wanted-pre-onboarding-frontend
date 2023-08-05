import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/todo.js';
const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [putTodo, setPutTodo] = useState(''); //수정 input
    const [isUpdate, setUpdate]  = useState(false) //수정중 확인

    const {todos:todoList, addTodo, updateTodo, deleteTodo} = useContext(TodoContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        const res = await addTodo({todo});
        if(res === 201 ) {
            setTodo('');
        }
    }

    const onChangHandler = (todo) => async (event) => {
        try {
            const newTodo = {...todo, isCompleted: !todo.isCompleted};
            const res = await updateTodo(newTodo);
            
        }catch(error) {
            console.log(error);
        }
    }
    const onDeleteHandler = (id) => async(evnet) => {
        try {
            const res = await deleteTodo(id);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            {todoList.length > 0 && todoList?.map((todo) => 
                <li key={todo.id}>
                    <label>
                        <input type="checkbox" checked={todo.isCompleted} onChange={onChangHandler(todo)}/>
                        <span>{todo.todo}</span>
                        <button data-testid="modify-button">수정</button>
                        <button data-testid="delete-button" onClick={onDeleteHandler(todo.id)}>삭제</button>
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
