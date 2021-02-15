import React,{useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";
import { w3cwebsocket } from "websocket";
import crypto from "crypto";
import { addData } from "../redux/actions";

const client = new w3cwebsocket('ws://127.0.0.1:8000');

function Home() {
    
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);

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
            var secret_key = crypto.createHash("sha256").update(JSON.stringify(object)).digest('hex');
            var data = {
                name : object.name,
                origin : object.origin,
                destination : object.destination,
                secret_key : secret_key
            };
            let cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
            let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            if(i===0 ){
                dataString = dataString + encrypted;
            }else{
                dataString = dataString +"|"+encrypted;
            }
        }
        console.log(dataString);
        client.send(dataString);
    };
    useEffect(() => {
        client.onopen=()=>{
            console.log("connected to the server");
          };
        //   setInterval(emitter, 2000);
        emitter();
    }, []);
    
      
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        dispatch(addData(dataFromServer));
        console.log(dataFromServer);
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
            <table className="results">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Origin</th>
                    <th>Destination</th>
                </tr>
            </thead>
            <tbody>
            {data.map((data,index)=>(
                
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                        <td>{data.origin} </td>
                        <td>{data.destination}</td>
                    </tr>
                
            ))}
            </tbody>
            </table>
        </>
    )
}

export default Home;
