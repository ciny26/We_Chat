import NavBar from "./sideBar Components/NavBar";
import Search from "./sideBar Components/Search";
import Chats from "./sideBar Components/Chats";
const SideBar = () => {
    return ( 
        <div className="SideBarContainer">
            <NavBar />
            <Search/>
            <Chats/>
        </div>
     );
}
 
export default SideBar
