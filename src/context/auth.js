import { createContext, useContext, useEffect, useReducer } from "react";

const DispatchContext = createContext(null);

const reducer = (state, {type ,payload }) => {
    switch(type) {
        case "LOGIN" :
            localStorage.setItem('accessToken',payload);
            return {...state, authenticated : true}
        case "LOGOUT" :
            localStorage.removeItem('accessToken')
            return {...state, authenticated : false}
        default : throw new Error(`Unknown action type: ${type}`)
    }
    
}

const StateContext = createContext({
    authenticated:false,
});

export const AuthProvider = ({children}) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        authenticated: false,
    });

    const dispatch = (type , payload) => {
        // console.log('type', type, payload);
        defaultDispatch({type,payload});
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        // console.log((typeof token));
        if(token === 'null' || token === undefined || token === null) {
            dispatch('LOGOUT');
            return;
        };
        dispatch('LOGIN', token);
    },[]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);