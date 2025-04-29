import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants.js'
import { addFeed } from '../utils/feedSlice.js'
import UserCard from './UserCard.jsx'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();  
  
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed",
        { withCredentials: true }
      );
      dispatch(addFeed(res.data));
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);
 
  return (
    
    (feed &&
    <>
      <div className='flex justify-center mt-15'>
        <UserCard user={feed[0]}/>
      </div>
    </>)
  )
}

export default Feed