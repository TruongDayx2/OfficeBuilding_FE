import React, {useState, useEffect,useContext} from 'react'
import {Redirect, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import '../css/login.css'
import imgPath from '../assets/img/img-login.svg'
import { login, signUp } from '../redux/actions/login';
import  {NotifiContext}  from './notify/notify';
import {MESSAGE_ERROR, SWITCH_ERROR} from '../redux/constants/base';
import { ERRORBE } from '../redux/constants/login';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const token = localStorage.getItem('token');
    const checkError = false;
    const [loginOrSignUp, setLoginOrSignUp] = useState(false);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const dataLogin = useSelector(state => state.login.data);
    console.log("datalogin",dataLogin);
    const error = useSelector(state => state.login.error);
    console.log("errrr",error)
    const {errorCode,setErrorCode} = useContext(NotifiContext);
    const messageLogin = useSelector(state => state.login.dataError);
    useEffect(() => {
        console.log("messs login",messageLogin);
        // if(messageLogin){
            if(messageLogin === "Tài khoản không tồn tại")
            {
                setErrorCode("ERROR_USERNAME_003");
            }
            if(messageLogin === "Mật khẩu không đúng")
            {
                setErrorCode("ERROR_PASSWORD_004");
            }
            // dispatch({
            //     type: ERRORBE,
            //     data: {}
            // })
        // }
    }, [messageLogin])
    useEffect(() => {
        if(error === true){
            if(loginOrSignUp) {
                setErrorCode("ERROR_USERNAME_003");
            }
                
            else  {
                setErrorCode("ERROR_USERNAME_004");
            }
            // gán lại error = false để tránh việc lặp lại việc hiện thông báo
            dispatch({
                type: SWITCH_ERROR,
                data: false
            })
        }


    }, [error])
    const toggleLogin = (mode) => {
        const loginIn = document.getElementById('login-in')
        const loginUp = document.getElementById('login-up')
        if(mode === "signUpMode") {
            loginIn.classList.remove('block')
            loginUp.classList.remove('none')
            // Add classes
            loginIn.classList.toggle('none')
            loginUp.classList.toggle('block')
        }
        else {
            loginIn.classList.remove('none')
            loginUp.classList.remove('block')
            // Add classes
            loginIn.classList.toggle('block')
            loginUp.classList.toggle('none')
        }
    }

    function validateEmail(email) {
        return email.trim().split('@')[1] !== 'gmail.com' ? false : true;
    }

    const register = async (e) => {
        e.preventDefault();
        const usernameTag = document.querySelector('#username-up');
        // const emailTag = document.querySelector('#email-up');
        const passwordTag = document.querySelector('#password-up');
        if(username.trim().length < 6){
            usernameTag.parentElement.classList.add('empty');
            return;
        }
        // if(!validateEmail(email)){
        //     emailTag.parentElement.classList.add('emailError');
        //     return;
        // }
        if(password.trim().length < 6 ){
            passwordTag.parentElement.classList.add('numError');
            return;
        }
        const data = {
            username: username,
            password: password,
            email: email,
        }
        setLoginOrSignUp(false);
        dispatch(signUp(data))
        if(location.pathname === '/login')
            console.log(data);
    }

    const signIn = async (e) => {
        e.preventDefault();
        console.log("footer height ", footerr.height);
        console.log("header height ", headerr.height);
        // api

        if(username.trim().length < 1)
        {
            setErrorCode("ERROR_USERNAME_001");
            document.getElementById('username-up').focus();
            return
        }
        if(username.trim().match(/[^a-zA-Z0-9]/g))
        {
            setErrorCode("ERROR_USERNAME_002");
            document.getElementById('username-up').focus();
            return;
        }

        if (password.trim().length < 1) {
            setErrorCode("ERROR_PASSWORD_001");
            return;
        }

       // username không được chứa kí tự đặc biệt
  
      
        // password phải có ít nhất 8 ký tự
        if(password.trim().length < 8)
        {
            setErrorCode("ERROR_PASSWORD_002");
            document.getElementById('password').focus();
            return;
        }
        // password phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 số và 1 ký tự đặc biệt
        // if(!password.trim().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/g))
        // {
        //     setErrorCode("ERROR_PASSWORD_003");
        //     document.getElementById('password').focus();
        //     return;
        // }

     
    
        const data = {
            username: username,
            password: password
        }
        setLoginOrSignUp(true);
        await dispatch({
                type: ERRORBE,
                data: {}
            })
        await dispatch(login(data));
        console.log( "okko",username, password);
    }


    const onFocusInput = (e) => {
        const tempClassName = e.target.parentElement.classList[1];
        if(tempClassName) {
            e.target.parentElement.classList.remove(tempClassName);
        }
    }

    const footerr = document.getElementById("footerr").getBoundingClientRect();
    const headerr = document.getElementById("headerr").getBoundingClientRect();




    return (token) ?
    <Redirect to="/"/> : (
        <div  className="login" style={{ marginTop: `100px`, minHeight: '50vh' }}>
            <div className="msg-log">MSG LOG nè</div>
            <div className="login__content">
                <div className="login__img">
                    <img src={imgPath} alt="" />
                </div>
                <div className="login__forms">
                    <form className="login__registre" id="login-in">
                        <h1 className="login__title">Đăng nhập</h1>
                        <div className="login__box">
                            <i className="bx bx-user login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="text" 
                                placeholder="Username" 
                                name='username'
                                className="login__input" 
                                onChange = {(e) => setUsername(e.target.value)}
                                id="username-up"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-lock-alt login__icon" />
                            <input
                                onFocus={onFocusInput}
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login__input"
                                autoComplete="on"
                                onChange = {(e) => setPassword(e.target.value)}
                                id="password"
                            />
                        </div>
                        <button onClick={(e) => signIn(e)} className="login__button">
                            Đăng nhập
                        </button>
                        {/* <div>
                            <span className="login__account">Bạn chưa có tài khoản? </span>
                            <span className="login__signin" id="sign-up" onClick={() =>toggleLogin('signUpMode')}>
                                Đăng kí
                            </span>
                        </div> */}
                    </form>
                    <form className="login__create none" id="login-up">
                        <h1 className="login__title">Tạo tài khoản</h1>
                        <div className="login__box">
                            <i className="bx bx-user login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="text" 
                                placeholder="Username" 
                                className="login__input" 
                                onChange = {(e) => setUsername(e.target.value)}
                                id="username-up"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-at login__icon" />
                            <input 
                                onFocus={onFocusInput} 
                                type="email" 
                                placeholder="Email" 
                                className="login__input" 
                                onChange = {(e) => setEmail(e.target.value)}
                                id="email-up"
                            />
                        </div>
                        <div className="login__box">
                            <i className="bx bx-lock-alt login__icon" />
                            <input
                                onFocus={onFocusInput}
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login__input"
                                autoComplete="on"
                                onChange = {(e) => setPassword(e.target.value)}
                                id="password-up"
                            />
                        </div>
                        <button onClick={(e) => register(e)} className="login__button">
                            Đăng kí
                        </button>
                        <div>
                            <span className="login__account">Bạn đã có tài khoản? </span>
                            <span className="login__signup" id="sign-in" onClick={() =>toggleLogin('signInMode')}>
                                Đăng nhập
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
