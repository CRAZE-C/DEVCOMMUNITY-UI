import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants.js';
import { addConnections } from '../utils/connectionSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Connections = () => {
    const connections = useSelector((store) => store.connection);
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
        <div className="flex flex-col items-center w-full px-4">
            <div className="mt-8 text-4xl font-bold text-center">⟬ Connections ⟭</div>

            {connections.length === 0 ? (
                <h1 className="mt-10 text-xl italic">Yet no connections made...</h1>
            ) : (
                <div className="w-full max-w-[1150px] mt-10 bg-base-300 max-h-[60vh] overflow-auto relative rounded-lg">
                    <table className="table w-full bg-base-200 text-sm md:text-base rounded-lg">
                        <thead className="sticky top-0 bg-base-300 z-30">
                            <tr>
                                <th className="min-w-[200px]">Name</th>
                                <th className="min-w-[120px]">Job</th>
                                <th className="min-w-[100px]">Gender</th>
                                <th className="min-w-[200px]">Skills</th>
                                <th className="min-w-[250px]">About</th>
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
                                                <div className="font-bold">
                                                    {connection.firstName + " " + connection.lastName}
                                                </div>
                                                <div className="text-sm italic opacity-50">{connection.age}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{connection.jobRole === "Add your jobRole here..." ? "Not added" : connection.jobRole}</td>
                                    <td>{connection.gender ?? "Not Added"}</td>
                                    <td>
                                        {connection.skills.length === 0
                                            ? "No skills added"
                                            : connection.skills.join(", ")}
                                    </td>
                                    <td>{connection.about === "Add about yourself..." ? "Not added" : connection.about}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default Connections