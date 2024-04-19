import AddImg from "../images/AddImg.svg"
import UserImg from "../images/user.svg"
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { auth , db, storage } from "../firebase";
import {  useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc , doc } from "firebase/firestore";
import { useNavigate , Link } from "react-router-dom";

const addUser = async(res , userName , email , downloadURL , password)=>{
        setDoc(doc(db , "users" , res?.user?.uid) , {
        uid:res.user.uid,
        userName,
        email,
        photoURL: downloadURL,
        password
    })
}


const addUserChat = async(res)=>{
    setDoc(doc(db , "userChat" , res?.user?.uid) , {})
}






const Register = () => {
    const navigate = useNavigate()
    const [err , setErr] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const userName = e.target[0].value
        console.log(e.target[0].value)
        const email = e.target[1].value
        console.log(email)
        const password = e.target[2].value
        console.log(password)
        const img = e.target[3].files[0]
        console.log(img)
        try {
            setErr(false)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res)

            try {
                if (img) {
                    const storageRef = ref(storage, userName);
                    const uploadTask = uploadBytesResumable(storageRef, img);

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Track upload progress if needed
                        },
                        (error) => {
                            console.error(error);
                            setErr(true);
                        },
                        async () => {
                                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                                console.log(downloadURL , res?.user)
                                await updateProfile(res.user, {
                                    displayName: userName,
                                    photoURL: downloadURL
                                });
                                await addUser(res , userName , email , downloadURL , password)
                                await addUserChat(res)
                                navigate('/')
                            })
                            
                        }
                    );
                } else {
                    // If no image selected, update user profile without photoURL
                    await updateProfile(res?.user, {
                        displayName: userName,
                        photoURL: UserImg
                    });
                    await addUser(res, userName, email, UserImg, password); // Pass null as photoURL
                    await addUserChat(res);
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
                setErr(true);
            }

        } catch (err) {
            setErr(true)
        }
       
          
          
        }
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WE CHAT!</span>
                <span className="title">Register Now</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="" id="userName" placeholder="Enter a name" required />
                    <input type="email" name="" id="email" placeholder="Enter an email"/>
                    <input type="password" name="" id="password" placeholder="Enter a password" />
                    <input style={{display:"none"}} type="file" name="" id="file" />
                    <label htmlFor="file">
                        <span><img src={AddImg} alt="" /></span>
                        <span className="fileText">add your picture</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span className="error">There is some thing wrong</span>}
                </form>
                <span>If you already have an account ? <Link to='/login'>login</Link> </span>
            </div>
        </div>

        
     );
}
 
export default Register
