import { useDispatch } from "react-redux"

export const logout = () => {
    const dispatch = useDispatch();
    dispatch(logout());

    // update the local storage
    localStorage.clear();

    // redirect to login page
    console.log('logout')

}