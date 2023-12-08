import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../Redux/store/store';
import { pollManage } from '../../Redux/slice/AdminPoll';
import { useNavigate } from 'react-router-dom';
import { VoteData } from '../../Redux/slice/AddVote';
import { Backdrop, CircularProgress, TablePagination } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersPoll = () => {

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
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("page"));
    if (data) {
      setPage(parseInt(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  const [disabledOptions, setDisabledOptions] = useState({});
  const pollList = useSelector((state) => state.pollSlice.data);
  const pollListLoading = useSelector((state) => state.pollSlice.isLoading);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const storedDisabledOptions = JSON.parse(localStorage.getItem("disabledOptions"));
    if (storedDisabledOptions) {
      setDisabledOptions(storedDisabledOptions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("disabledOptions", JSON.stringify(disabledOptions));
  }, [disabledOptions]);

  const header = {
    headers: {
      access_token: token,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(pollManage());
  }, []);

  const logOut = () => {
    navigate('/');
    localStorage.clear();
  };

  const inputVoteChange = (title, OptionId, OptionData) => {
    dispatch(VoteData(OptionId, OptionData, header));
    setDisabledOptions((prevOptions) => ({
      ...prevOptions,
      [title]: true,
    }));
    toast.success("Your Vote has been deployed")
  };


  if (!pollList || pollListLoading) {
    return(
    <h3>
      <center className="text-warning"> Loading... </center>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </h3>
    )
  }

  return (
    <>
      <ToastContainer />

      <center>
        <h2 className='text-light'> welcome to User Poll</h2>
        <div className="float-right text-danger mx-5" onClick={() => logOut()}>
          Logout
        </div>
      </center>

      <div className='container data-container'>
        <div className="row">
          <div className="col">
            {pollList.length > 0 &&
              pollList.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((dataList) => (
                <div className="card my-3" key={dataList._id}>
                  <div>
                    <div className="card-header bg-success">
                      <h5 className="card-title">{dataList.title}</h5>
                    </div>
                    <div className="card-body">
                      {dataList.options.map((option, index) => (
                        <div className="form-check" key={index}>
                          <input
                            className="form-check-input input-radio-btn"
                            type="radio"
                            name={`radio-${dataList._id}`}
                            id={`${index}`}
                            onChange={() =>
                              inputVoteChange(dataList.title, dataList._id, option.option)}
                            disabled={disabledOptions[dataList.title]} />
                          <label className="form-check-label mx-2" htmlFor={`radio-${dataList._id}-${index}`}>
                            <div className='text-sm text-md-lg text-lg-xl'>
                              {option.option}
                            </div>
                          </label>
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

export default UsersPoll;
