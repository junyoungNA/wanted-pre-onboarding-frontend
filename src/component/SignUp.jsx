import React, { useState, useEffect } from 'react'
import './Auth.css';
import {instance} from '../util/axios';
import { useNavigate } from 'react-router-dom';
import {useAuthState } from '../context/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const {authenticated} = useAuthState(); //context auth
    const [inputs, setInputs] = useState({
        email:'',     // 이메일 
        password:'',    // 비밀번호
    });
    const [errors, setErrors] = useState({});
    const {email, password} = inputs;
     // 유효성 검사 실패시 버튼에 disabled 부여
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        if(authenticated) {
            navigate('/todo');
        } 
    },[authenticated, navigate])
    
    const submitHandler = async (evnet) => {
        evnet.preventDefault();
        //true면 return
        if(checkValue('email', email) ||checkValue('password',password)) return;
        const res = await instance.post('/auth/signup',inputs);
        if(res.status === 200 || res.status === 201) {
            navigate('/signin');
        }
    }

    const onChangeHandler = (event) => {
        const {name, value } = event.target;
        const updateInput = {
            ...inputs,
            [name] : value,
        }
        setInputs({...updateInput});
        //setInputs변경전 시점이라 checkValue에 value 를 전달
        checkValue(name, value);
    }

    const checkValue = (type, value) => {
        let error = null;
        let isDisabled = false;
        switch (type) {
        case 'email':
            if (!value.includes('@')) {
                error = '이메일 형식, @을 포함해주세요.';
                isDisabled = true;
            }
            break;
        case 'password':
            const replacePassword = value.replace(/\s/g, "");
            if (replacePassword.length < 8) {
                error = '비밀번호는 공백없이 8자 이상 입력해주세요.';
                isDisabled = true;
            }
            break;
        default:
            break;
        }
        setErrors((prev) => ({
            ...prev,
            [type]: error,
        }));
        setDisabled(isDisabled);
        //에러가 있으면 trueq보내서 회원가입 못하게
        return error ? true : false;
    };

    return (
        <>
            <form className='auth-form' onSubmit={submitHandler}>
                <input data-testid="email-input" name='email' value={email} onChange={onChangeHandler} placeholder='이메일'/>
                {errors.email && <span style={{color: 'rgb(239 68 68)', marginBottom: '4px' }}>{errors.email}</span>}
                <input data-testid="password-input" name='password' value={password} placeholder='비밀번호' onChange={onChangeHandler} />
                {errors.password && <span style={{color: 'rgb(239 68 68)', marginBottom: '4px' }}>{errors.password}</span>}
                <button data-testid="signup-button" type='submit' disabled={isDisabled}> 회원가입</button>
            </form>
        </>
    )
}

export default SignUp
