import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useContext } from "react";
import {AuthContext} from "../../../AuthContext.jsx"

const NavBar = () => {
    const currentUser = useContext(AuthContext)
    return ( 
        <nav className="navBar">
            <span className="logo">WE CHAT</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" className="userImg" />
                <span className="userName">{currentUser.displayName}</span>
                <button onClick={()=>{
                    signOut(auth)
                }}>Logout</button>
            </div>
        </nav>
     );
}
 
export default NavBar;