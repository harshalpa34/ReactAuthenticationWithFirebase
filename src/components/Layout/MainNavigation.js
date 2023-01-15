import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authctx = useContext(AuthContext);

  console.log(authctx)
  const navigate  = useNavigate()

  const logout = ()=>{
    
    authctx.logout()
    navigate('/auth')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authctx.isLoggedIN && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authctx.isLoggedIN &&     <li>
            <Link to='/profile'>Profile</Link>
          </li>}
        
        
          {authctx.isLoggedIN &&   <li>
            <button onClick={logout}>Logout</button>
          </li>}
        
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
