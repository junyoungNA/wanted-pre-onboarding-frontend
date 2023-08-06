import React from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import {useAuthDispatch, useAuthState } from '../context/auth';

const Main = () => {
const {authenticated} = useAuthState(); //context auth}
const dispatch = useAuthDispatch();

    return (
        <div className='nav'>
            <div className='nav-box'>
                {authenticated ?   (
                <>
                    <button onClick={() => dispatch('LOGOUT')}>로그아웃 하기</button>
                    <Link to='/todo'>ToList 보기</Link> 
                </>) 
                : 
                <>
                    <Link to='/signin'>로그인 하기</Link> 
                    <Link to='/signup'>회원가입 하기</Link>
                </>
                }
            </div>
        </div>
    )
}

export default Main;
