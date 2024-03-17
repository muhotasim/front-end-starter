import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import Loader from './components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from './store/user-store.store';
const Dashboard = lazy(()=>import('./pages/dashboard'))
const Login = lazy(()=>import('./pages/login'))
const ForgotPassword = lazy(()=>import('./pages/forgot-password'))
const ResetPassword = lazy(()=>import('./pages/reset-password'))
const PageNotFound = lazy(()=>import('./pages/404'));
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    userActions.revalidateTokens()(dispatch);
    console.log('mounted '+new Date().toLocaleString())
    setInterval(()=>{
      console.log('refreshed: '+new Date().toLocaleString())
      userActions.revalidateTokens()(dispatch);
    }, 60000)
  },[])

  return (
    <div className='app'>
      <Suspense fallback={<Loader/>}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute component={Dashboard}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/reset-password/:token' element={<ResetPassword/>}/>
            <Route path='/*' element={<ProtectedRoute component={PageNotFound}/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
