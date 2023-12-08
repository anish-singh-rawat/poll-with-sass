import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../component/login/Login'
import SignUp from '../component/signup/SignUp'
import AdminPoll from '../page/Admins/AdminPoll'
import UsersPoll from '../page/Users/UsersPoll'
import AddData from '../page/AddData/AddData'
import EditData from '../page/EditData/EditData'
import Option from '../page/AddOption/Option'
import { useSelector } from 'react-redux'
import PrivateRoute from './PrivateRoute'

export default function Router() {

  const loginSlice = useSelector((state) => state.loginSlice);
  const Navigate = useNavigate()

  useEffect(() => {
    localStorage.getItem("token");
    localStorage.getItem("role");
  }, [loginSlice.isSuccess]);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem("role");
  const isToken = role && token ? true : false ;

  useEffect(()=>{
    Navigate('/')
  },[isToken])

  return (
    <Routes>
      
      { isToken &&  <Route path='/' element={role.toLowerCase() === "admin" ?  
      <AdminPoll /> : <UsersPoll /> } /> }

      <Route path='/' element={<Login />}></Route>

      <Route exact path="/adminPoll" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "admin")}>  <AdminPoll /></PrivateRoute>}>
      </Route>

      <Route exact path="/userPoll" element={<PrivateRoute login={(localStorage.getItem("token") && localStorage.getItem("role") === "guest")}>  <UsersPoll /></PrivateRoute>}>
      </Route>

      <Route path='/signup' element={<SignUp />}> </Route>
      {/* <Route path='/login' element={<Login />}> </Route> */}
      <Route path='/AddData' element={<AddData />} > </Route>
      <Route path='/Editdata/:editDataId' element={<EditData />}> </Route>
      <Route path='/AddOption/:optionDataId' element={<Option />}> </Route>

    </Routes>
  )
}

