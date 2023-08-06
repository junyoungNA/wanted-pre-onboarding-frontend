import React from 'react'
import './Main.css';
import { Link } from 'react-router-dom';


const Main = () => {
    return (
        <div className='nav'>
            <div className='nav-box'>
                <Link to='/login'>로그인 하기</Link>
                <Link to='/signup'>회원가입 하기</Link>
            </div>
        </div>
    )
}

export default Main;
