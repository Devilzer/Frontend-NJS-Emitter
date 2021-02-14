import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";

function Login({setType}) {
    const dispatch = useDispatch();
   
    const [value, setValue] = useState({
        username:"",
        password:""
    });
    const handleSubmit =()=>{
        console.log(value);
    }
    return (
        <div className="login-container">
            <div className="contents">
                <div className="wtext">
                    Welcome Back,
                </div>
                <h1>
                    Log In!
                </h1>
                <input type="text" value={value.username} onChange={(e)=>setValue({...value,username:e.target.value})}  placeholder="Username"/>
                <input type="password" value={value.password} onChange={(e)=>setValue({...value,password:e.target.value})}  placeholder="Password"/>
                <button onClick={handleSubmit}>
                    Log In
                </button>
            </div>
            <div className="switch" onClick={()=>setType("signup")}>
                Create account
            </div>
        </div>
    )
};

export default Login;
