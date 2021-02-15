
export const loginUser = ()=>{
    return {
        type : "LOGIN_USER"
    };
};

export const logoutUser = ()=>{
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