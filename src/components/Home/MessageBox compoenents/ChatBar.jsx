import videoCall from "../../../images/videoCall.svg"
import AddContact from "../../../images/AddContact.svg"
import moreIcon from "../../../images/moreIcon.svg"
const ChatBar = () => {
    return ( 
        <div className="chatBar">
            <span className="userChat">John</span>
            <div className="chatBarIcons">
                <img src={videoCall} alt="Video Call Icon" className="icon" />
                <img src={AddContact} alt="Phone Call Icon" className="icon" />
                <img src={moreIcon} alt="More Icon" className="icon" />
            </div>
        </div>
     );
}
 
export default ChatBar;