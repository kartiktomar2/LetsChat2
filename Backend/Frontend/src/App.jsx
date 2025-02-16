
import './App.css'
import Loading from './components/Loading.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { useAuth } from './context/AuthProvider.jsx'
import Left from './home/Leftpart/Left.jsx'
import Right from './home/Rightpart/Right.jsx'
import { Navigate, Route, Routes } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [authUser,setAuthUser]= useAuth()
  console.log(authUser);
  

  return (
    
       <>
        <Routes>
           <Route  path='/' element={ authUser?
            (

          //   <div className='flex h-screen '>
          //   <Left/>
          //   <Right/>
          //  </div>
          <div className="drawer lg:drawer-open ">
          <input
            id="my-drawer-2"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content flex flex-col items-center justify-center">
            <Right />
          </div>
          <div className="drawer-side   ">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu w-90 h-full  bg-slate-950  text-base-content " >
              <Left />
            </ul>
          </div>
        </div>
          
          ) : 
            
             <Navigate to='/login'/>
            }  />
             <Route path='/login' element={authUser? <Navigate to='/'/>:<Login/>}/>
             <Route path='/signup' element={authUser? <Navigate to='/'/>:<Signup/>}/>
       </Routes>
       <Toaster />
       </>
        
        

      // <Loading/> 
  )
}

export default App
