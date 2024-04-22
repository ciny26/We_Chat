import { useContext , useState , useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../../../Context/ChatContext";
import { db  } from "../../../firebase";
import { onSnapshot , doc } from "firebase/firestore";
const Messages = () => {
    const [messages , setMessages] = useState([])
    const {data} = useContext(ChatContext)
    useEffect(()=>{
        const getMessages = ()=>{
                
                 const unsub = onSnapshot(doc(db , "chats" , data.chatId) , (doc)=>{
                     doc.exists() && setMessages(doc.data().messages)
                 })
                 return ()=>{
                     unsub()
                 }
             }
             data.user.uid && getMessages()
     } , [data.user.uid] 
 )

    return ( 
    <div className="Messages">
        
        {messages.map((m)=>(
            <Message message={m} key={m.id}/>
        ))}
        
        
        
    </div> );
}
 
export default Messages;