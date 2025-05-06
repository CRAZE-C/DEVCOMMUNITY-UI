import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addUser } from "../utils/userSlice.js";

export const ProfileEdit = ({ user }) => {
    const [firstName, setFirstName] = useState(user.data.firstName ?? "");
    const [lastName, setLastName] = useState(user.data.lastName ?? "");
    const [gender, setGender] = useState(user.data.gender ?? "");
    const [age, setAge] = useState(user.data.age ?? "");
    const [about, setAbout] = useState(user.data.about ?? "");
    const [profilePicture, setProfilePicture] = useState(user.data.profilePicture ?? "");
    const [skills, setSkills] = useState(user.data.skills ?? []);
    const [jobRole, setJobRole] = useState(user.data.jobRole ?? "");
    const [newSkill, setNewSkill] = useState("");
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();

    const addSkill = () => {
        try {
            const trimmed = newSkill.trim();
            if (trimmed && !skills.includes(trimmed)) {
                setSkills([...skills, trimmed]);
                setNewSkill("");
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    const removeSkill = (skillToRemove) => {
        try {
            setSkills(skills.filter(skill => skill !== skillToRemove));
        }
        catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                gender,
                age: Number(age),
                about,
                profilePicture,
                skills,
                jobRole
            }, { withCredentials: true }
            );
            dispatch(addUser(res.data));
            setToast(true);
            setTimeout(() => {
                setToast(false)
            }, 3000);
        } catch (err) {
            console.log(err);
            setError(err.response.data || "Something went wrong");
        }
    };

    return (
        <div className="flex mt-13 justify-center gap-5">
            <div className=" bg-base-100">
                <div className="card bg-base-300 shadow-md w-[380px] h-[70vh] overflow-y-auto">
                    <div className="card-body px-2 py-2 overflow-y-auto">

                        <div className="card-body w-full items-center gap-4">
                            <h1 className="card-title text-lg font-bold">⟬ Edit your profile ⟭</h1>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">First Name:</legend>
                                <input
                                    type="text"
                                    value={firstName}
                                    className="w-full px-3 min-h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Last Name:</legend>
                                <input
                                    type="text"
                                    value={lastName}
                                    className="w-full px-3 min-h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Gender:</legend>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-2 h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male" className="text-black">Male</option>
                                    <option value="Female" className="text-black">Female</option>
                                    <option value="Others" className="text-black">Other</option>
                                </select>
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Age:</legend>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full px-3 h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">About:</legend>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 min-h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Profile Picture:</legend>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setProfilePicture(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="file-input bg-white/20"
                                />
                                <label className="label">Max size 1MB</label>
                            </fieldset>


                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Skills:</legend>

                                <div className="flex flex-wrap gap-2 mb-2">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="ml-2 text-white hover:text-red-300"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add a skill"
                                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
                                    >
                                        Add
                                    </button>
                                </div>
                            </fieldset>

                            <fieldset className="w-full">
                                <legend className="mb-2 text-sm font-medium">Job Role:</legend>
                                <input
                                    type="text"
                                    value={jobRole}
                                    onChange={(e) => setJobRole(e.target.value)}
                                    className="w-full px-3 h-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </fieldset>

                            <p className="text-red-500 w-[380px] max-w-full line-clamp-3">{error}</p>

                            <div className="card-actions pt-2 w-30">
                                <button className="btn btn-wide" onClick={handleSave}>
                                    Save
                                </button>
                            </div>
                            {toast && <div className="toast toast-top toast-start">
                                <div className="alert border-white bg-green-400 mt-20 w-full alert-success">
                                    <span>» Profile saved successfully...</span>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, profilePicture, about, age }} />
        </div>

    );
};
