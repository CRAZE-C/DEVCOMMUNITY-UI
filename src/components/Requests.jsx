import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants.js';
import { addRequest, removeRequest } from '../utils/requestSlice.js';

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);

  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {} ,
        {withCredentials: true}
      );
      dispatch(removeRequest(id));
    }
    catch (err) {
      console.error("ERROR : " + err);
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true });
      dispatch(addRequest(res.data.receivedRequests));
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getRequests();
  }, [])

  return (
    <div className="flex flex-col items-center w-full px-4">
      <div className="mt-8 text-4xl font-bold text-center">⟬ Requests ⟭</div>

      {requests.length === 0 ? (
        <h1 className="mt-10 text-xl italic">Yet no request came...</h1>
      ) : (
        <div className="w-full max-w-[1150px] mt-10 bg-base-100 max-h-[65vh] overflow-auto rounded-lg relative">
          <table className="table w-full bg-base-200 text-sm md:text-base rounded-lg">
            <thead className="sticky top-0 bg-base-300 z-30">
              <tr>
                <th className="min-w-[200px]">Name</th>
                <th className="min-w-[120px]">Job</th>
                <th className="min-w-[100px]">Gender</th>
                <th className="min-w-[200px]">Skills</th>
                <th className="min-w-[200px]">About</th>
                <th className="min-w-[50px]">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={request.fromUserId.profilePicture}
                            alt="User profile"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {request.fromUserId.firstName + " " + request.fromUserId.lastName}
                        </div>
                        <div className="text-sm italic opacity-50">{request.fromUserId.age}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {request.fromUserId.jobRole === "Add your jobRole here..."
                      ? "Not added"
                      : request.fromUserId.jobRole}
                  </td>
                  <td>{request.fromUserId.gender ?? "Not Added"}</td>
                  <td>
                    {request.fromUserId.skills.length === 0
                      ? "No skills added"
                      : request.fromUserId.skills.join(", ")}
                  </td>
                  <td>
                    {request.fromUserId.about === "Add about yourself..."
                      ? "Not added"
                      : request.fromUserId.about}
                  </td>
                  <td className='flex flex-col gap-2 '>
                    <button className="flex items-center justify-center btn w-full " onClick={() => handleRequest("accepted",request._id)}>
                      Accept
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    </button>
                    <button className="flex items-center justify-center btn w-full " onClick={() => handleRequest("rejected",request._id)}>
                      Reject
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em] ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  )
}

export default Requests