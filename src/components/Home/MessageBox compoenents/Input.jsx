import { useContext, useState } from "react"
import AddImg from "../../../images/AddImg.svg"
import AttachFile from "../../../images/AttachFile.svg"
import SendIcon from "../../../images/Send.svg"
import { v4 as uuid } from "uuid"
import { Timestamp, doc, updateDoc , arrayUnion , serverTimestamp } from "firebase/firestore"
import { db , storage } from "../../../firebase"
import { ChatContext } from "../../../Context/ChatContext"
import { AuthContext } from "../../../AuthContext"
import { ref , uploadBytesResumable , getDownloadURL} from "firebase/storage"

const Input = () => {
    const [textMessage , setTextMessage] = useState("")
    const [imgMessage , setImgMessage ] = useState(null)
    const {data} = useContext(ChatContext)
    const currentUser = useContext(AuthContext)
    const handleSend = async () => {
        if (imgMessage) {
            const storageRef = ref(storage, uuid());
            const uploadTaskSnapshot = await uploadBytesResumable(storageRef, imgMessage);
            const imgMessageURL = await getDownloadURL(uploadTaskSnapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    textMessage,
                    sender: currentUser.uid,
                    date: Timestamp.now(),
                    imgMessageURL: imgMessageURL // Store the download URL of the uploaded image
                })
            });
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    textMessage,
                    sender: currentUser.uid,
                    date: Timestamp.now()
                })
            });
        }
    
        await updateDoc(doc(db, "userChat", currentUser.uid), {
            [data.chatId + ".lastMessage"]: textMessage,
            [data.chatId + ".Date"]: serverTimestamp()
        });
    
        await updateDoc(doc(db, "userChat", data.user.uid), {
            [data.chatId + ".lastMessage"]: textMessage,
            [data.chatId + ".Date"]: serverTimestamp()
        });
    
       // Reset input values
        console.log("Before reset:", textMessage, imgMessage);
        setTextMessage("");
        setImgMessage(null);
        console.log("After reset:", textMessage, imgMessage);
        console.log("sent");
    };
    
    return ( 
        <div className="Input">
            
            <input type="text" placeholder="Type something ..."  className="message" 
            onChange={((e)=>setTextMessage(e.target.value))}/>
            <div className="Send">

                <input type="file" style={{display:"none"}} id="addImg" 
                onChange={((e)=>setImgMessage(e.target.files[0]))} />
                <label htmlFor="addImg">
                    <img src={AddImg} alt="" className="addImg" />
                </label>
                
                <input type="file" style={{display:"none"}} id="addFile" />
                <label htmlFor="addFile">
                    <img src={AttachFile} alt="" />
                </label>
                <div className="sendBtn">
                    <img src={SendIcon} alt="" onClick={(()=>handleSend())} />
                </div>

            </div>
        </div>
     );
}
 
export default Input;