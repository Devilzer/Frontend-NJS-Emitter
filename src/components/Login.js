import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs";
import { loginUser } from "../redux/actions";

function Login({setType}) {
    const dispatch = useDispatch();
    var users = JSON.parse(localStorage.getItem("users")) || [];
    const [value, setValue] = useState({
        username:"",
        password:""
    });
    const handleSubmit =async()=>{
        if(value.username==="" || value.password===""){
            console.log("Please fill the values!");
            return;
        }
        var index = users.findIndex(user=>user.username===value.username);
        if(index===-1){
            console.log("Invalid Username or password!");
            return;
        }else{
            const valid = await bcrypt.compare(value.password,users[index].password);
            if(valid){
                console.log("logged");
                dispatch(loginUser());
            }
            else{
                console.log("Invalid Username or password!");
                return;
            }
        }
    };

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
