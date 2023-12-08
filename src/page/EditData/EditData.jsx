import { useFormik } from 'formik';
import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { dispatch } from '../../Redux/store/store';
import { EditTitle } from '../../Redux/slice/EditTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditData = () => { 

    const location = useLocation()
    const {editDataId} = useParams();
    const navigate = useNavigate()
    
  const formikEditData = useFormik({
    initialValues: {
      Edittitle: location.state,

    },
    onSubmit: (values) => {
      try {
        if (values.Edittitle.trim() !== '') {
            toast.success("data Update successfully")
            dispatch(EditTitle(editDataId,values.Edittitle ))
            navigate('/adminPoll')
        }
        else{
            toast.error("Please enter data to update")
        }
      }
      catch (error) { console.log(error , 'error');}
    },
  });

    return (
        <>
            <ToastContainer/>
            <center><h2 className='mt-4 text-light'>Edit Data Here </h2></center>
              <form className='input-form mt-5' onSubmit={formikEditData.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>

                  <input type="text" className="form-control mt-2"
                  value={formikEditData.values.Edittitle}
                  onChange={formikEditData.handleChange}
                     name='Edittitle'
                    placeholder="Enter message title" />
                  {formikEditData.errors.title &&
                  <p className="text-danger">{formikEditData.errors.title}</p>}
                </div>

                <div className="d-flex justify-content-between mt-4">
                <button type='submit' className="btn btn-success"
                  disabled={!formikEditData.dirty} >                    
                  submit
                  </button>

                  <Link to={'/adminPoll'} className="btn btn-danger">                    
                  cancel
                  </Link>
                </div>
              </form>
        </>   
    )
}

export default EditData