import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../util/axios";
const DispatchContext = createContext(null);

const reducer = (state, {type ,payload }) => {
    console.log(state, type, payload);
    switch(type) {
        case "LOGIN" :
            localStorage.setItem('accessToken',payload.token);
            return {...state, authenticated : true}
        case "LOGOUT" :
            localStorage.removeItem('accessToken')
            return {...state, authenticated : false}
        case "STOP_LOADING" :
            return {
                ...state,
                loading : false,
            }
        default : throw new Error(`Unknown action type: ${type}`)
    }
}


const StateContext = createContext({
    authenticated:false,
    loading : true,
});

export const Provider = ({children}) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        authenticated: false,
        loading:true,
    });

    const dispatch = (type , payload) => {
        console.log('type', type, payload);
        defaultDispatch({type,payload});
    }

    useEffect(() => {
        async function loadUser() {
            try {

            }catch (error) {
                console.log(error);
            }finally {
                dispatch('STOP_LOADING');
            }
        }
        loadUser();
    },[]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);