export const getUsernameFromLocalStore = () => {
    const username = localStorage.getItem('username');
    return username
}

export const getUserIDFromLocalStore = () => {
    const user_id = localStorage.getItem('user_id');
    return user_id
}

export const getTokenFromLocalStore = () => {
    return localStorage.getItem('token') || null;
}
export const removeUserDataFromLocalStorage = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('user_id')
}

export const saveUserDataToLocalStorage = (token, username, user_id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('user_id', user_id);
}