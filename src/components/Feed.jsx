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

  if (!feed) return;

  if (feed.length <= 0) 
    return <h1 className='flex justify-center mt-20 font-bold'>Oops no more feed to show...</h1>

  return (

    (feed &&
      <>
        <div className='flex justify-center mt-15 h-screen'>
          <UserCard user={feed[0]} />
        </div>
      </>)
  )
}

export default Feed