import SideBar from "../components/Home/SideBar";
import MessageBox from "../components/Home/MessageBox";
const Home = () => {
    return ( 
        <div className="home">
            <div className="boxWrapper">
                <SideBar/>
                <MessageBox/>
            </div>
        </div>
     );
}
 
export default Home;