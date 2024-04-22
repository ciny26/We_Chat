import React, { useContext, useState, useEffect } from "react";
import AddImg from "../../../images/AddImg.svg";
import AttachFile from "../../../images/AttachFile.svg";
import SendIcon from "../../../images/Send.svg";
import { v4 as uuid } from "uuid";
import { Timestamp, doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ChatContext } from "../../../Context/ChatContext";
import { AuthContext } from "../../../AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Input = () => {
    const initialImgState = {
        imgName : "",
        imgURL : ""
        
    }
    const [selectedImg , setSelectedImg] = useState(initialImgState)
    const [imgErr , setImgErr] = useState(false)
    const [textMessage, setTextMessage] = useState("");
    const [imgMessage, setImgMessage] = useState(null);
    const { data } = useContext(ChatContext);
    const currentUser = useContext(AuthContext);

    const [isSendDisabled, setIsSendDisabled] = useState(true);

    useEffect(() => {
        // Check if there is at least one letter in the textMessage or imgMessage is not null
        setIsSendDisabled(!textMessage.trim() && !imgMessage);
    }, [textMessage, imgMessage]);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImgMessage(e.target.files[0])
                setImgErr(false)
            setSelectedImg({
                imgName: file.name,
                imgURL: URL.createObjectURL(file)
            });
        } else {
            // Reset the selected image state if the file is not an image
            setSelectedImg(initialImgState);
            setImgErr(true)
            
        }
    };

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
        setTextMessage("");
        setImgMessage(null);
        setSelectedImg(initialImgState)
    };

    return (
        <div className="Input">
            <input
                type="text"
                placeholder="Type something ..."
                className="message"
                onChange={(e) => setTextMessage(e.target.value)}
                value={textMessage}
                disabled={!data.user.userName}
            />
            {selectedImg && <div className="sentImg"> 
                                {selectedImg.imgURL && <img src={selectedImg.imgURL} alt="" className="sentImgDisplay" accept="image/*" />}
                        </div>
                    }
            <div className="Send">
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="addImg"
                    onChange={(e) => handleImgChange(e)}
                    defaultValue={imgMessage}
                    disabled={!data.user.userName}
                />
                <label htmlFor="addImg">
                    <img src={AddImg} alt="" className="addImg" />
                </label>

                <div className="sendBtn" style={{ visibility: isSendDisabled ? "hidden" : "visible" }}>
                    <img src={SendIcon} alt="" onClick={() => handleSend()} />
                </div>
            </div>
        </div>
    );
};

export default Input;
