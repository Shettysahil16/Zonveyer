import './App.css';
import Left from './left/Left';
import Right from './right/Right';
import FirstLeft from './first-Left/firstLeft';
import Signup from './components/Signup';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        position="top-center"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <div className=''>


        <Outlet />
        
          {/* <FirstLeft/>
    <Left/>
    <Right/> */}
        
        {/* <Signup />
      <Login/> */}
      </div>

    </>
  )
}

export default App
