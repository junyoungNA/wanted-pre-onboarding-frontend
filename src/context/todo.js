import React, { createContext, useEffect, useState } from 'react';
import {instance} from '../util/axios';
// 빈 배열로 초기화된 TodoContext를 생성합니다.
export const TodoContext = createContext([]);

// TodoProvider 컴포넌트를 만듭니다.
export const TodoProvider = ({ children }) => {
    // TODO 리스트를 담을 상태와 상태를 업데이트하는 함수를 생성합니다.
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos = async () => {
        try {
            const res =  await instance.get('/todos');
            setTodos(res.data);
            return res;
        }catch (error) {   
            console.log(error);
        }
    }

    const addTodo = async (todo) => {
        try {
            const res = await instance.post('/todos', todo);
            if(res.status === 200 || res.status === 201) {
                setTodos([...todos, res.data]);
                return res.status;
            }
        }catch(error) {
            console.log(error);
        }
        
    };

    const deleteTodo = async (id) => {
        try {
            const res = await instance.delete(`/todos/${id}`);
            if(res.status === 204) {
                const findIndx = todos.findIndex((todo) => todo.id === id);
                const newTodos = todos.slice();
                newTodos.splice(findIndx, 1);
                console.log(newTodos);
                setTodos(newTodos);
            }
        }catch(error) {
            console.log(error);
        }
    };
    
    const updateTodo = async (newTodo) =>{ 
        try {
            const res = await instance.put(`/todos/${newTodo.id}`, newTodo);
            if(res.status === 200) {
                const findIndx = todos.findIndex((todo) => todo.id === newTodo.id);
                const newTodos = todos.slice();
                newTodos[findIndx] = res.data;
                setTodos(newTodos);
            }
        }catch(error) {
            console.log(error);
        }
        
    }

    const contextValue = {
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
    };

    return (
        <TodoContext.Provider value={contextValue}>
        {children}
        </TodoContext.Provider>
    );
};
