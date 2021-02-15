import React,{useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";
import { w3cwebsocket } from "websocket";
import crypto from "crypto";
import { addData , updateSearch } from "../redux/actions";

//creating connection with the socket server.
const client = new w3cwebsocket('ws://njs-listener-socket.herokuapp.com');

function Home() {
    
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const search = useSelector(state => state.search);
    //NJS-Emitter Function..
    const emitter=()=> {
        const names = ["Deepak Jena","Tony Stark","Bruce Wayne","Steven Rogers","Matthew Murdock","Barry Allen","Bruce Banner","Peter Parker","Clark Kent","Frank Castle"];
        const originCities = ["Surat","Chennai","Hyderabad","Nagpur","Lucknow","Pune","Indore","Jaipur","Ludhiana","Agra"];
        const destCities = ["Mumbai","Delhi","Bangalore","Kolkata","Indore","Bhopal","Vadodara","Ghaziabad","Amritsar","Srinagar"];
        
        //values for Cipher..
        let iv = "1234123412341234";
        let key = '12345678123456781234567812345678';

        var dataString = "";
        for(let i=0 ;i <10 ;i++){
            var object = {
                name : names[Math.floor(Math.random()*names.length)],
                origin : originCities[Math.floor(Math.random()*originCities.length)],
                destination : destCities[Math.floor(Math.random()*destCities.length)]
            };

            //creating secret_key.
            var secret_key = crypto.createHash("sha256").update(JSON.stringify(object)).digest('hex');
            var data = {
                name : object.name,
                origin : object.origin,
                destination : object.destination,
                secret_key : secret_key
            };

            //aes-256-ctr encryption
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
          emitter();
          setInterval(emitter, 10000);
    }, []);
    
      //receiving data from server.
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        dispatch(addData(dataFromServer));
        console.log(dataFromServer);
      };

      //connection close function.
      client.onclose = function() {
        console.log('Client Closed.');
        };

        //user Logout function.
      const handleLogout = ()=>{
        dispatch(logoutUser());
      }

      //search functionality
      var filtered = []
      if(search!==""){
          filtered = data.filter(dateItem=>{
              return dateItem.name.toLowerCase().indexOf(search.toLowerCase())!==-1;
          })
      }else{
          filtered = data;
      }

    return (
        <> 
            <div className="heading">
                <h1>
                    Home
                </h1>
                <h2 onClick={handleLogout}>
                    LogOut
                </h2>
            </div>
            <div className="search-container">
                <input type="text" value={search} onChange={(e)=>dispatch(updateSearch(e.target.value))} placeholder="Search for data using name..."/>
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
            {filtered.map((data,index)=>(
                
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
