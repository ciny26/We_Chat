import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../AuthContext";
import { ChatContext } from "../../../Context/ChatContext";

// Function to format timestamp
const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = timestamp.toDate();
    const diff = now - messageTime;

    // Convert milliseconds to minutes
    const minutes = Math.floor(diff / 60000);
    // Convert milliseconds to hours
    const hours = Math.floor(diff / 3600000);
    // Convert milliseconds to days
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) {
        return "Just now";
    } else if (minutes < 60) {
        return `${minutes} min ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        // Format date as dd/mm/yyyy
        const dd = String(messageTime.getDate()).padStart(2, "0");
        const mm = String(messageTime.getMonth() + 1).padStart(2, "0");
        const yyyy = messageTime.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
};

const Message = ({ message }) => {
    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef()
    useEffect(()=>{
      ref.current.scrollIntoView({behavior:"smooth"})
    } , [message])
    return (
        <div ref={ref}  className={`Message ${message.sender == currentUser.uid ? "owner" : ""} `}>
            <div className="MessageInfo">
                <img src={message.sender == currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>{formatTimestamp(message.date)}</span>
            </div>
            <div className="MessageContent">
                {message.textMessage && <p>{message.textMessage}</p>}
                {message.imgMessageURL && <img src={message.imgMessageURL} alt="" />}
            </div>
        </div>
    );
};

export default Message;
