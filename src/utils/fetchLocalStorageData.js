export const fetchUser = () => {
    // Get user data from local storage
    // If user data is not available, clear local storage because it means the user is not logged in
    // If user data is available, parse the data and return it
    
    const userInfo = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    return userInfo;
}
