import videoCall from "../../../images/videoCall.svg"
import AddContact from "../../../images/AddContact.svg"
import moreIcon from "../../../images/moreIcon.svg"
import { ChatContext } from "../../../Context/ChatContext"
import { useContext } from "react"
const ChatBar = () => {
    const {data}= useContext(ChatContext)
    return ( 
        <div className="chatBar">
            <span className="userChat">{data.user.userName}</span>
            <div className="chatBarIcons">
                <img src={videoCall} alt="Video Call Icon" className="icon" />
                <img src={AddContact} alt="Phone Call Icon" className="icon" />
                <img src={moreIcon} alt="More Icon" className="icon" />
            </div>
        </div>
     );
}
 
export default ChatBar;