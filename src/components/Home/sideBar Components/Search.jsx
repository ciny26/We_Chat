import { collection, query, where, getDocs, startAt, endAt } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase";

const Search = () => {
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
            setErr(true);
            console.log(error);
        }
    };

    const handleKey = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

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
            
                {usersList && usersList.map((user, index) => (
                    
                    <div key={index} className="searchUser">
                        <img src={user.photoURL} alt="" className="searchUserImg"/>
                        <span className="searchUserName">{user.userName}</span>
                    </div>
                ))}
            
            {err && <div>Error occurred while searching.</div>}
        </div>
    );
};

export default Search;
