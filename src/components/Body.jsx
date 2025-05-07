import NavBar from './NavBar'
import Footer from './Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view",
                { withCredentials: true }
            );
            dispatch(addUser(res.data));
        }

        catch (err) {
            if (err.status === 401)
                navigate("/login")
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Body