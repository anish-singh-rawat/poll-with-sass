import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { pollManage } from '../../Redux/slice/AdminPoll';
import './Admin.scss';
import { resetReducer } from '../../Redux/slice/listData';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteTitle } from '../../Redux/slice/DeleteTitle';
import { deleteOption } from '../../Redux/slice/deleteOption';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TablePagination } from '@mui/material';
import { dispatch } from '../../Redux/store/store';

const AdminPoll = () => {
  const [deleteTitleId, setDeleteId] = useState(null)
  const [optionData, setOptionData] = useState(null)
  const [page, setPage] = useState(0);
  const [rowsPerPageOption, setRowPerPageOption] = useState([5, 10, 15]);
  const handlePageChange = (event, updatedPage) => setPage(updatedPage)

  const handleRowPerPageChange = (event) => {
    setRowPerPage(event.target.value)
    setPage(0)
  }

  const row = () => {
    if (localStorage.getItem("rowpage")) {
      return JSON.parse(localStorage.getItem("rowpage"));
    }
    return 5;
  };

  const [rowPerPage, setRowPerPage] = useState(row());

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem("page"));
    const rowpage = JSON.parse(localStorage.getItem("rowpage"));

    if (page, rowpage) {
      setPage(parseInt(page));
      setRowPerPage(parseInt(rowpage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  const pollList = useSelector((state) => state.pollSlice.data);
  const deleteTitleLoading = useSelector((state) => state.deleteTitleSlice.isLoading);
  const deleteOptionLoading = useSelector((state) => state.deleteOptionSlice.isLoading);
  const editTitleSliceLoading = useSelector((state) => state.editTitleSlice.isLoading);
  const addOptionSliceLoading = useSelector((state) => state.addOptionSlice.isLoading);
  const listDataloading = useSelector((state) => state.listDataSlice.isLoading)
  const addVoteLoading = useSelector((state) => state.addVote.isLoading)

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pollManage());
  }, [deleteTitleLoading, editTitleSliceLoading, deleteOptionLoading, addOptionSliceLoading, listDataloading]);

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };

  
  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitle(titleID));
    setDeleteId(titleID)
  };

  const deleteOptionData = (optionInd, optionText) => {
    dispatch(deleteOption(optionInd, optionText.option));
    setOptionData(optionText.option)
  };

  if (!pollList || addOptionSliceLoading || editTitleSliceLoading || listDataloading || addVoteLoading) {
    return (
      <h3>
        <center className="text-warning"> Loading... </center>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </h3>
    );
  }

  return (
    <>
      <ToastContainer />
      <center>
        <h2 className="text-light"> Welcome to Admin Page</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>
          Logout
        </div>
      </center>

      <Link to={'/AddData'}
        className="d-flex justify-content-center align-item-center text-light"
        style={{
          fontSize: '22px', fontWeight: 'bold', cursor: 'pointer',
          textDecoration: 'none'
        }}>
        AddPoll +
      </Link>

      <div className="container data-container mt-2" style={{ wordWrap: 'break-word' }}>
        <div className="row">
          <div className="col">
            {pollList.length > 0 &&
              pollList.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((dataList) => (
                <div key={dataList._id}>
                  <div className="card mt-3">
                    <div className="card-header bg-success text-light ">
                      <h5 className="card-title" style={{ wordWrap: 'break-word' }}>
                        {dataList.title}
                      </h5>
                      <div className="shift-right d-flex justify-content-around">

                        {dataList.options.length < 4 && (
                          <Link
                            to={`/AddOption/${dataList._id}`}
                            state={dataList.options}
                            className="fa-solid fa-plus text-white"
                            style={{ textDecoration: 'none' }}
                          ></Link>
                        )}

                        <Link to={`/Editdata/${dataList._id}`}
                          state={dataList.title}
                          className="fa-regular fa-pen-to-square mx-5 text-light">
                        </Link>

                        {

                          dataList._id === deleteTitleId
                            && deleteTitleLoading ?
                            <CircularProgress color="inherit" />
                            :
                            <i className="fa-solid fa-trash"
                              onClick={() => deleteTitleData(dataList._id)}></i>
                        }

                      </div>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, ind) => (
                        <div className="form-check mt-2 p-2" key={ind}
                          style={{ borderBottom: '1px solid black' }} >
                          <div className="d-flex justify-content-between">
                            <div className="text-sm text-md-lg text-lg-xl" style={{ wordWrap: 'break-word' }}>
                              {option.option}
                            </div>
                            <div className="icons d-flex">
                              <div className="vote-div mx-5">vote : {option.vote}</div>

                              {
                                optionData == option.option &&
                                  deleteOptionLoading ?
                                  <CircularProgress color="inherit" />
                                  :
                                  <i className="fa-solid fa-trash" onClick={() => deleteOptionData(dataList._id, option)}></i>
                              }

                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>

      <TablePagination
        style={{ display: 'flex', justifyContent: 'center', color: 'white' }}
        component="div"
        rowsPerPageOptions={rowsPerPageOption}
        count={pollList.length}
        page={!pollList.length || pollList.length <= 0 ? 0 : page}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange} />
    </>
  );
};

export default AdminPoll;
