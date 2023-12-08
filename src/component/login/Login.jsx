import React, { useEffect, useState } from 'react'
import { dispatch } from '../../Redux/store/store';
import './Login.css'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { schema } from '../../utilities/utilities';
import { login, resetReducer } from '../../Redux/slice/login';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const Login = () => {
  const [buttonDisable, setButtonDisable] = useState(false)
  const navigate = useNavigate()

  const loginSlice = useSelector((state) => state.loginSlice);
  const status = useSelector((state) => state.loginSlice.isLoading);

  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role.toLowerCase());
      dispatch(resetReducer());
      if (decoded.role.toLowerCase() === "admin") {
        navigate("/adminPoll");
      }
      else if (decoded.role.toLowerCase() === "guest") {
        navigate("/userPoll");
      }
    }

    else if (loginSlice.data.error === 1) {
      toast.error("user does not exist!");
      setButtonDisable(false)
    }
    dispatch(resetReducer());
  }, [loginSlice.isSuccess])

  const formikData = useFormik({
    initialValues: {
      username: "",
      userpassword: "",
    },
    onSubmit: (values) => {
      try {
        if (!loginSlice.data.token) {
          dispatch(resetReducer());
        }
        dispatch(login(values));
        setButtonDisable(true)
      } catch (error) { }
    },
    validationSchema: schema,
  });

  return (
    <>
      <ToastContainer />
      <div className="container-fluid containe-for-sub-box ">
        <div className="row">
          <div className="col">
            <div className="parent-form-div">
              <div className="sub-form-data">
                <div className="form-top-heading mt-2">Log In</div>
                <form className='mt-2' onSubmit={formikData.handleSubmit}>

                  <div className="user-name-feild-div">
                    <label htmlFor="" className='user-name-label-feild'> UserName </label>
                    <br />
                    <input type="text"
                      name='username'
                      value={formikData.values.username}
                      onChange={formikData.handleChange}
                      className='user-name-input mt-2' />
                    {formikData.errors.username && formikData.touched.username &&
                      <p className="text-danger">{formikData.errors.username}</p>}
                  </div>

                  <div className="user-password-feild mt-5">
                    <label htmlFor="" className='user-password-label-feild'> Password </label>
                    <br />
                    <input type="password" name='userpassword'
                      value={formikData.values.userpassword}
                      onChange={formikData.handleChange}
                      className='user-password-input mt-2' />

                    {formikData.errors.userpassword
                      && formikData.touched.userpassword &&
                      <p className="text-danger">{formikData.errors.userpassword}
                      </p>}
                  </div>

                  <center className='p-4'>
                    {
                      status ?
                        <CircularProgress color="inherit" />
                        :
                        <button type="submit" disabled={buttonDisable}
                          className="login-btn btn btn-success">
                          Log In
                        </button>
                    }
                    <br />
                    <br />
                    <Link to={'/signup'} className="sign-up mt-3 text-dark">
                      don't have account ? register now
                    </Link>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login