import React,{useState} from 'react';
import { useDispatch, useSelector } from "react-redux";


function SignUp({setType}) {
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        username : "",
        password:""
    });
    const handleSubmit = ()=>{
        return;
    };
    return (
        <div className="signup-container">
            <div className="contents">
                <div className="wtext">
                    Hello,
                </div>
                <h1>
                    Create account!
                </h1>
                <input type="text" value={value.name} onChange={(e)=>setValue({...value,username:e.target.value})} placeholder="Username"/>
                
                <input type="text" value={value.password} onChange={(e)=>setValue({...value,password:e.target.value})} placeholder="Password"/>
                <button onClick={handleSubmit}>
                    Create account
                </button>
            </div>
            <div className="switch" onClick={()=>setType("login")}>
                Log In
            </div>
        </div>
    )
};

export default SignUp;
