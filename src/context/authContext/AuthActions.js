export const loginStart =()=>({
    type:"LOGIN_START"//מפעיל את הREDUCER CASE
})
export const loginSuccess =(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})
export const loginFailure =()=>({
    type:"LOGIN_FAILURE"
})

//logout
export const logoutStart =()=>({
    type:"LOGOUT"
})
