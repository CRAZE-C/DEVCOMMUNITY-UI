import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants.js';
import { addConnections } from '../utils/connectionSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
    const connections = useSelector((store) => store.connection)
    console.log(connections);
    const dispatch = useDispatch();

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            dispatch(addConnections(res.data.data));
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if (!connections) return;

    return (
        <div className="flex flex-col items-center">
            <div className='mt-8 text-4xl font-bold'>⟬ Connections ⟭</div>
            {connections.length === 0 ? <h1 className='mt-15 text-xl italic'>Yet no connections made...</h1> :
                <div className="w-[1150px] overflow-y-auto mt-15 max-h-[70vh]">
                    <table className="table w-full bg-base-200">
                        <thead >
                            <tr className='text-white opacity-80'>
                                <th className="w-[250px]">Name</th>
                                <th className='w-[150px]'>Job</th>
                                <th className='w-[150px]'>Gender</th>
                                <th className='w-[300px]'>Skills</th>
                                <th className='w-[300px]'>About</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {connections.map((connection, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={connection.profilePicture}
                                                        alt="User profile"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{connection.firstName + " " + connection.lastName}</div>
                                                <div className="text-sm italic opacity-50">{connection.age}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{connection.jobRole === "Add your jobRole here..." ? "Not added" : connection.jobRole}</td>
                                    <td>{connection.gender === undefined ? "Not Added" : connection.gender}</td>

                                    <td>{connection.skills.length === 0 ? "No skills added" : connection.skills.join(", ")}</td>

                                    <td>{connection.about === "Add about yourself..." ? "Not added" : connection.about}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );

}

export default Connections