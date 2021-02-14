import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import bcrypt from "bcryptjs";

function SignUp({setType}) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        username : "",
        password:""
    });
    const handleSubmit =async ()=>{
        if(value.username==="" || value.password===""){
            console.log("please fill all the fields!");
            return;
        }
        var index = users.findIndex(user=>user.username===value.username);
        if(index===-1){
            const hashPsw =await bcrypt.hash(value.password,12);
            const user = {
                username : value.username,
                password : hashPsw
            };
            users.push(user);
            localStorage.setItem("users",JSON.stringify(users));
            setValue({...value,username:"",password:""});
        }else{
            console.log("user already exists!");
            return;
        }
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
                <input type="text" value={value.username} onChange={(e)=>setValue({...value,username:e.target.value})} placeholder="Username"/>
                
                <input type="password" value={value.password} onChange={(e)=>setValue({...value,password:e.target.value})} placeholder="Password"/>
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
