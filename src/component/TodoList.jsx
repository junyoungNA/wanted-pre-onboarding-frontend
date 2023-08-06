import React, { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../context/todo.js';
import { useAuthState } from '../context/auth.js';
import './Todo.css';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const  navigate = useNavigate();
    const [modifyTodo, setModifyTodo] = useState(''); //수정 input
    const [isModify, setModify]  = useState(null) //수정중 확인
    const  {authenticated} = useAuthState();

    const {todos:todoList, addTodo, updateTodo, deleteTodo} = useContext(TodoContext);
    
    useEffect(() => {
        if(!authenticated) {
            navigate('/signin');
        }
    }, [authenticated , navigate]);

    const submitHandler = async (event) => {
        event.preventDefault();
        const res = await addTodo({todo});
        if(res === 201 ) {
            setTodo('');
        }
    }

    const onModifyHandler = (todo) => async (event) => {
        try {
            const res = await updateTodo(todo);
            if(res === 200 && isModify) {
                setModify(null);
                setModifyTodo('');
            } 
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
    
    const onModifyText = (id, todo) => () => {
        setModify(id);
        setModifyTodo(todo);
    }

    const onModifyCancle =  () => {
        setModify(null);
        setModifyTodo('');
    }

    return (
        <section className='todo-section'>
            <form onSubmit={submitHandler} className='todo-form'>
                <input data-testid="new-todo-input"  value={todo} onChange={(event) =>setTodo(event.target.value) }placeholder='todo'/>  
                <button data-testid="new-todo-add-button" type='submit'>추가</button>
            </form>
            <ul className='todo-ul'>
                {todoList.length > 0 && todoList?.map((todo) =>
                    <li className='todo-item'key={todo.id}>
                        {isModify === todo.id ? 
                        <>
                            <input data-testid='modify-input' type="text"  value={modifyTodo} onChange={(event) => setModifyTodo(event.target.value)}/>
                            <button data-testid="submit-button" onClick={onModifyHandler({...todo, todo:modifyTodo})} >제출</button>
                            <button data-testid="cancel-button" onClick={onModifyCancle}>취소</button>
                        </> 
                        :   
                        <>
                            <label>
                                <input type="checkbox" checked={todo.isCompleted} onChange={onModifyHandler({...todo, isCompleted : !todo.isCompleted})}/>
                                <span>{todo.todo}</span>
                            </label> 
                                <button data-testid="modify-button" onClick={onModifyText(todo.id, todo.todo)}>수정</button>
                                <button data-testid="delete-button" onClick={onDeleteHandler(todo.id)}>삭제</button>
                        </>
                        }
                    </li>
                )}
            </ul>
        </section>
    )
}

export default TodoList;
