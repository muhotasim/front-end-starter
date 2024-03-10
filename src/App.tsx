import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/protected-route';
import Loader from './components/loading';
const Dashboard = lazy(()=>import('./pages/dashboard'))
const Login = lazy(()=>import('./pages/login'))
const ForgotPassword = lazy(()=>import('./pages/forgot-password'))
const ResetPassword = lazy(()=>import('./pages/reset-password'))
const PageNotFound = lazy(()=>import('./pages/404'));
function App() {

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
