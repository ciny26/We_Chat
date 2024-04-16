import ChatBar from "./MessageBox compoenents/ChatBar";
import Input from "./MessageBox compoenents/Input";
import Messages from "./MessageBox compoenents/Messages";
const MessageBox = () => {
    return ( 
        <div className="MessageBoxContainer">
            <ChatBar/>
            <Messages/>
            <Input/>
        </div>
     );
}
 
export default MessageBox;