import React,{useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket('ws://127.0.0.1:8000');

function Home() {
    
    const dispatch = useDispatch();

    const emitter=()=> {
        const names = ["Deepak Jena","Tony Stark","Bruce Wayne","Steven Rogers","Matthew Murdock","Barry Allen","Bruce Banner","Peter Parker","Clark Kent","Frank Castle"];
        const originCities = ["Surat","Chennai","Hyderabad","Nagpur","Lucknow","Pune","Indore","Jaipur","Ludhiana","Agra"];
        const destCities = ["Mumbai","Delhi","Bangalore","Kolkata","Indore","Bhopal","Vadodara","Ghaziabad","Amritsar","Srinagar"];
        let iv = "1234123412341234";
        let key = '12345678123456781234567812345678';
        
        var dataString = "";
        for(let i=0 ;i <10 ;i++){
            var object = {
                name : names[Math.floor(Math.random()*names.length)],
                origin : originCities[Math.floor(Math.random()*originCities.length)],
                destination : destCities[Math.floor(Math.random()*destCities.length)]
            };
            var secret_key = require("crypto").createHash("sha256").update(JSON.stringify(object)).digest('hex');
            console.log(secret_key);
        }
        // client.send(JSON.stringify({
        //   message : "hello there"
        // }));
    };
    useEffect(() => {
        client.onopen=()=>{
            console.log("connected to the server");
          };
          setInterval(emitter, 2000);
    }, []);
    
      
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log('got reply! ', dataFromServer);
      };
      client.onclose = function() {
        console.log('Client Closed.');
        };
      

      

      const handleLogout = ()=>{
        dispatch(logoutUser());
      }

    return (
        <> 
            <div className="heading">
                <h1>
                    home
                </h1>
                <h2 onClick={handleLogout}>
                    LogOut
                </h2>
            </div>
            
        </>
    )
}

export default Home;
