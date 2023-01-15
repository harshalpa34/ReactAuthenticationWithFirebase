import { useContext, useRef, useState } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const updateURl = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDVUxjbJzZGx_Wa6lnso7y0IEzYJrcNOp8'

const ProfileForm = () => {
  const newpasswordref = useRef();
  const authctx = useContext(AuthContext);
  const [passwordupdateMessage, setpasswordupdateMessage] = useState()
  const SubmitHandler = async (e)=>{
    e.preventDefault();
    const response = await fetch(updateURl, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authctx.idtoken,
        password: newpasswordref.current.value,
        returnSecureToken: false
      })
    })
    const responsedata = await response.json()
    // console.log(responsedata)
    if(!response.ok){
      setpasswordupdateMessage(responsedata.error.message)
    }else{
      setpasswordupdateMessage('Your Password Has been Updated Successfully')
    }

  }

  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newpasswordref} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      <h5>{passwordupdateMessage}</h5>
    </form>
  );
}

export default ProfileForm;
