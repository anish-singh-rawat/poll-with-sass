import React, { useEffect } from 'react'
import { dispatch } from '../../Redux/store/store';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss'
import { useFormik } from 'formik'
import { schema } from '../../utilities/utilities'
import { resetReducer, signup } from '../../Redux/slice/signUp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate()

  const signupSlice = useSelector((state) => state.signupSlice);

  useEffect(() => {
    if (signupSlice.data.error === 1) {
      toast.error(signupSlice.data.message);
      dispatch(resetReducer())
    }
    else if (signupSlice.data.error === 0) {
      toast.success('signUp successfully')
      navigate("/")
      dispatch(resetReducer())
    }
  }, [signupSlice.isSuccess])

  const formikData = useFormik({
    initialValues: {
      username: '',
      userpassword: '',
      role: 'guest'
    },
    validationSchema: schema,
    onSubmit: (values) => {
      try {
        if (values.username.length < 5) {
          toast.warning("user name must be atleast 5 charecter!");
        }
        else if (values.userpassword.length < 5) {
          toast.warning("user password must be atleast 5 charecter")
        }
        else {
          dispatch(signup(values));
          dispatch(resetReducer());
        }
      }
      catch (error) {
        dispatch(resetReducer());
      }
    },
  })

  if (signupSlice.isSuccess) {
    return (
      <h3>
        <center className="text-warning"> Loading... </center>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </h3>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid containe-for-sub-box">
        <div className="row">
          <div className="col">
            <div className="parent-form-div-sign-up">
              <div className="sub-form-data">
                <div className="form-top-heading mt-2">Sign Up</div>
                <form className='mt-2' onSubmit={formikData.handleSubmit}>

                  <div className="user-name-feild-div">
                    <label htmlFor="" className='user-name-label-feild'> UserName </label>
                    <br />
                    <input type="text" name='username'
                      onChange={formikData.handleChange}
                      value={formikData.values.username}
                      className='user-name-input mt-2' />

                  </div>

                  <div className="user-password-feild mt-5">
                    <label htmlFor="" className='user-password-label-feild'> Password </label>
                    <br />
                    <input type="password" name='userpassword'
                      onChange={formikData.handleChange}
                      value={formikData.values.userpassword} className='user-password-input mt-2' />
                    {formikData.errors.userpassword && formikData.touched.userpassword &&
                      <p className="text-danger">{formikData.errors.userpassword}</p>}
                  </div>

                  <div className="sign-up-role-div mt-5">
                    <div className="role-heading">Role</div>

                    <select name='role' onBlur={formikData.handleBlur}
                      onChange={formikData.handleChange}
                      className='select-role-options mt-3'>
                      <option value="guest">Guest</option>
                      <option value="admin">Admin</option>

                    </select>
                  </div>

                  <center className='p-4'>
                  <button to={'/signup'} type='submit' 
                  className="singup-btn btn btn-success">
                    Sign Up
                  </button>
                  <br />
                  <br />
                    <Link to={'/'} className="sign-up text-dark">
                      already have account ? Login 
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

export default SignUp