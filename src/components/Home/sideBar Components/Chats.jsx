import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { AuthContext } from "../../../AuthContext";
import { ChatContext } from "../../../Context/ChatContext";

const Chats = () => {
    const currentUser = useContext(AuthContext)
    const dispatch = useContext(ChatContext)
    const [chats , setChats] = useState([])

    const handleUserClick = (user)=>{
        dispatch.dispatch({type:"CHANGE_USER" , payload:user})
    }
    useEffect(()=>{
       const getChats = ()=>{
                const unsub = onSnapshot(doc(db , "userChat" , currentUser.uid) , (doc)=>{
                    setChats(doc.data())
                })
                return ()=>{
                    unsub()
                }
            }
            currentUser.uid && getChats()
    } , [currentUser.uid] 
)


    return ( 
        <div className="chats">
            {
                (Object.entries(chats))?.sort((a , b ) =>  b[1].Date - a[1].Date ).map((chat)=>(

                    <div className="userChat" key={chat[0]} onClick={()=>{handleUserClick(chat[1].userInfo)}}>
                        <img src={chat[1].userInfo.photoURL} alt="profile pic" className="chatUserImg" />
                        <div className="userChatInfo">
                            <span className="userName">{chat[1].userInfo.userName}</span>
                            <p className="lastUserMessage">{chat[1].lastMessage}</p>
                        </div>
                    </div>
                ))
            }
           


            </div>
     );
}
 
export default Chats;