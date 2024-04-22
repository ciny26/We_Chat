import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useContext } from "react";
import {AuthContext} from "../../../AuthContext.jsx"
import { ChatContext } from "../../../Context/ChatContext.jsx";

const NavBar = () => {
    const currentUser = useContext(AuthContext)
    const dispatch = useContext(ChatContext)
    const handleSignOut = (currentUser)=>{
       
        signOut(auth).then(() => {
            dispatch.dispatch({type:"LOG_OUT"}); // Update the context to indicate no user is logged in
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
    }
    return ( 
        <nav className="navBar">
            <span className="logo">WE CHAT</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" className="userImg" />
                <span className="userName">{currentUser.displayName}</span>
                <button onClick={()=>{
                    handleSignOut()
                }}>Logout</button>
            </div>
        </nav>
     );
}
 
export default NavBar;