import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants.js';
import { addRequests } from '../utils/requestSlice.js';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {

      const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
      dispatch(addRequests(res.data.receivedRequests));
    }
    catch (err) {
      console.error(err); 
    }
  }

  useEffect(() => {
    getRequests();
  }, [])

  return (
    <div>

    </div>
  )
}

export default Requests