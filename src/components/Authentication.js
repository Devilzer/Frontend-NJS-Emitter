import React,{useState} from 'react';
import Login from "./Login";
import SignUp from "./SignUp";

function Authentication() {
    const [type, setType] = useState("login");
    return (
        <>
            {type==="login" && <Login
              setType = {setType}
            />}
            {type==="signup" && <SignUp
                setType = {setType}
            />}  
        </>
    )
};

export default Authentication;
