import { useRef, useState, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { useNavigate } from "react-router-dom";

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const emailuseRef = useRef();
  const passworduseRef = useRef();
  
  const authctx = useContext(AuthContext);

  const navigate = useNavigate();
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler = (event) =>{
    event.preventDefault();
    const Email = emailuseRef.current.value;
    const Password = passworduseRef.current.value;
    console.log(Email, Password);
    setisLoading(true);


let url ;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVUxjbJzZGx_Wa6lnso7y0IEzYJrcNOp8' ;
      
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVUxjbJzZGx_Wa6lnso7y0IEzYJrcNOp8';     
    }
    fetch(url , {
      method: 'POST' , 
      body : JSON.stringify({
        email :Email,
        password: Password, 
        returnSecureToken: true
      }),
      headers: {'Content-Type': 'application/json'}
      }).then((response) =>{
        if(response.ok){
          
          return response.json();
        }
        else{
          return response.json().then(data => {
            console.log(data)
            let errormessage = "Authentication Failed. " ;
            if(data && data.error && data.error.message){
              errormessage = data.error.message ;
            }
            setisLoading(false);
            alert(errormessage);
          });
        }
      }).then(data =>{
        console.log(data)
        authctx.login(data.idToken)
        console.log(authctx)
        navigate('/')
        setisLoading(false);

      })
      
    }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailuseRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passworduseRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : <p>Loading...</p> }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
   
      </form>
      {/* { erroeMessgae } */}
    </section>
  );
};

export default AuthForm;
