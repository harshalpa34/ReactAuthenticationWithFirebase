import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/AuthContext';

function App() {
  const authctx = useContext(AuthContext);


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />     
        {authctx.isLoggedIN && <Route path='/profile' element={<UserProfile />} />}
        {/* <Navigate to = "/*" element ={<AuthPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
