import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../../../firebase";
import {AuthContext} from "../../../AuthContext"

const Search = () => {
    const currentUser = useContext(AuthContext)
    const [userName, setUserName] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [err, setErr] = useState(false);

    const handleSearch = async () => {
        try {
            setErr(false);
            // Construct a query to search for usernames starting with the specified input
            const q = query(
                collection(db, "users"),
                where("userName", ">=", userName),
                where("userName", "<=", userName + '\uf8ff')
            );
            const querySnapshot = await getDocs(q);
            const fetchedUsers = [];
            querySnapshot.forEach((doc) => {
                fetchedUsers.push(doc.data());
                console.log(doc.data())
            });

            setUsersList(fetchedUsers);
        } catch (error) {
            
            console.log(error);
        }
    };

    const handleKey = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };


    const handleSelect = async (user)=>{
        //check if the chats collection exists (chats ixists in firebase)
        console.log(currentUser)
        const combinedID = user.uid > currentUser.uid ? user.uid + currentUser.uid : 
                                                        currentUser.uid + user.uid 
        
        try {
            const res = await getDoc(doc(db , "chats" , combinedID))
            if (!res.exists()) {
                //creat chat in chats collection 
                await setDoc(doc (db , "chats" , combinedID) , {messages : []})
                //create user chat
                await updateDoc(doc(db , "userChat" , currentUser.uid) , {
                    [combinedID + ".userInfo"]:{
                        uid:user.uid ,
                        userName : user.userName , 
                        photoURL : user.photoURL

                    },
                    [combinedID + ".Date"] : serverTimestamp()
                })
                // and ad it for the person you wanted to send messages to him also 
                await updateDoc(doc(db , "userChat" , user.uid) , {
                    [combinedID + ".userInfo"]:{
                        uid: currentUser.uid ,
                        userName : currentUser.displayName , 
                        photoURL : currentUser.photoURL

                    },
                    [combinedID + ".Date"] : serverTimestamp()
                })
                
            
            }   
            else {
                
            }
            setUsersList([])
            setUserName("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Search">
            <input
                type="text"
                className="SearchInput"
                placeholder="Search for a user ..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={handleKey}
            />
            
                {usersList && usersList.length > 0 && usersList.map((user, index) => (
                    
                    <div key={index} className="searchUser" onClick={() => handleSelect(user)}>
                        <img src={user.photoURL} alt="" className="searchUserImg"/>
                        <span className="searchUserName">{user.userName}</span>
                    </div>
                ))}
            
            {usersList.length == 0 && err &&<div>No user found !!</div>}
            
        </div>
    );
};

export default Search;
