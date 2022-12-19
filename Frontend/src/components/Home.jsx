import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "../styles/home.css";


const Home = () => {

    let [username, setUsername] = useState("");
    let [variable, setVariable] = useState(false);
    const navigate = useNavigate()

    async function onSearch() {
        const payload = { userName: username }
        // console.log("name", payload);
        setVariable(true);
        let result = await fetch("http://localhost:3001/createUser", {
            method: "POST",
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        result = await result.json()
        if (!result.error) {
            setTimeout(() => {
                setVariable(false);
                navigate(`/dashboard/${result.data._id}`);
            }, 1000)
        } else {
            setVariable(false);
            alert("Something went wrong")
        }

        console.log("name", result);
    }


    return (
        <div className="body">
            {
                variable
                    ? <div className="message">
                        <h5>Redirecting to dashboard...</h5>
                    </div>
                    : ""
            }
            <div className="container">
                <h1>Welcome</h1>
                <div className="user">
                    <label htmlFor='name'  >Please Enter Your Username</label>
                    <input id='name' type="text" onChange={(e) => setUsername(e.target.value)} placeholder='Type Here...' value={username} />
                </div>
                <button onClick={onSearch} >
                    <Link className='link' >Submit</Link>
                </button>
            </div>
        </div>
    )
}



export default Home