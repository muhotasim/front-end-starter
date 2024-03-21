import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import Loader from './components/loading';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-store.store';
import { RootState } from './store';
import PublicRoute from './components/public-route';
const UserPage =  lazy(()=>import('./pages/users'));
const Dashboard = lazy(()=>import('./pages/dashboard'))
const Login = lazy(()=>import('./pages/login'))
const ChangePassword = lazy(()=>import('./pages/change-password'))
const ForgotPassword = lazy(()=>import('./pages/forgot-password'))
const ResetPassword = lazy(()=>import('./pages/reset-password'))
const PageNotFound = lazy(()=>import('./pages/404'));
const Notification = lazy(()=>import('./pages/notifications'));
function App() {
  const dispatch = useDispatch();
  const appLoading = useSelector((state:RootState)=>state.auth.appLoading)
  useEffect(()=>{
    authActions.revalidateTokens()(dispatch);
    console.log('mounted '+new Date().toLocaleString())
    setInterval(()=>{
      console.log('refreshed: '+new Date().toLocaleString())
      authActions.revalidateTokens()(dispatch);
    }, 60000)
  },[])

  if(appLoading) return <div className='app'><Loader/></div>
  return (
    <div className='app'>
      <Suspense fallback={<Loader/>}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/reset-password/:token' element={<ResetPassword/>}/>

            <Route path='/' element={<ProtectedRoute component={Dashboard}/>}/>
            <Route path='/notifications' element={<ProtectedRoute component={Notification}/>}/>
            <Route path='/change-password' element={<ProtectedRoute component={ChangePassword}/>}/>
            <Route path='/users' element={<ProtectedRoute component={UserPage}/>}/>
            <Route path='/*' element={<ProtectedRoute component={PageNotFound}/>}/>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
