import AddImg from "../images/AddImg.svg"
import AnonymousUser from "../images/AnonymousUser.png"
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
    const initialImgState = {
        imgName : "",
        imgURL : ""
        
    }
    const [selectedImg , setSelectedImg] = useState(initialImgState)
    const navigate = useNavigate()
    const [err , setErr] = useState(false)
    const [imgErr , setImgErr] = useState(false)
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
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
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const userName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const img = e.target[3].files[0]
        
        try {
            setErr(false)
            const res = await createUserWithEmailAndPassword(auth, email, password)
           
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
                            console.log(error)
                            setErr(true);
                        },
                        async () => {
                                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                                //console.log(downloadURL , res?.user)
                                setSelectedImg({
                                    imgURL:downloadURL
                                })
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
                        photoURL: AnonymousUser
                    });
                    await addUser(res, userName, email, AnonymousUser, password); // Pass null as photoURL
                    await addUserChat(res);
                    navigate("/");
                }
            }  catch (err) {
                console.error("Error creating user:", err);
                setErr(true);
            }

        }  catch (err) {
            console.error("Error creating user:", err);
            setErr(true);
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
                    <input style={{display:"none"}} type="file" name="" id="file" onChange={handleImgChange}/>
                    <label htmlFor="file">
                        <span><img src={AddImg} alt="" /></span>
                        <span className="fileText">add your picture</span>
                        {selectedImg && <div className="selectedImg"> 
                                {selectedImg.imgURL && <img src={selectedImg.imgURL} alt="" className="selectedImgDisplay" accept="image/*" />}
                                <span className="selectedImgTitle">{selectedImg.imgName} </span> 
                        </div>
                    }
                    </label>
                    {imgErr && <span className="error"> Invalid Image Type </span>}

                    
                    
                    <button>Sign up</button>
                    {err && <span className="error">Something went wrong. <br />It might be an existing user with those credentials <br />
                    or you are using a short password or invalid email </span>}
                </form>
                <span style={{textAlign:"center"}}>If you already have an account ? <Link to='/login'>login</Link> </span>
            </div>
        </div>

        
     );
}
 
export default Register
