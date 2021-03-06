const initialState = {
    data:[],
    isLoggedIn :false,
    search:""
};

const reducer = (state = initialState,action)=>{
    switch (action.type) {
        case "LOGIN_USER":
            return{
                ...state,
                isLoggedIn : true
            };
        case "LOGOUT_USER":
            return{
                ...state,
                isLoggedIn : false
            }
        case "ADD_DATA":
            return{
                ...state,
                data : [...state.data,...action.payload]
            };
        case "UPDATE_SEARCH":
            return{
                ...state,
                search : action.payload
            };
        default:
            return state;
    };
};

export default reducer;