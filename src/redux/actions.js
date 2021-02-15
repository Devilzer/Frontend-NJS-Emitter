import { showNotification } from "../config/noty";

export const loginUser = ()=>{
    showNotification("Login Successful");
    return {
        type : "LOGIN_USER"
    };
};

export const logoutUser = ()=>{
    showNotification("Logout Successful");
    return{
        type :"LOGOUT_USER"
    };
};

export const addData = (data)=>{
    return{
        type : "ADD_DATA",
        payload : data
    };
};

export const updateSearch = (value)=>{
    return{
        type : "UPDATE_SEARCH",
        payload : value
    };
};