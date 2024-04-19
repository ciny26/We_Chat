import { useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
const Login = () => {
    const navigate = useNavigate()
    const [err , setErr] = useState(false)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const email = e.target[0].value
        console.log(email)
        const password = e.target[1].value
        console.log(password)
        try {
            setErr(false)
            const res = await signInWithEmailAndPassword(auth, email, password)
            console.log(res)
            console.log("Login succed")
            navigate('/')
        
        }
        catch(err){
            setErr(true)
        }
    }
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WE CHAT!</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="" id="email" placeholder="Enter an email" />
                    <input type="password" name="" id="password" placeholder="Enter a password" />
                    <button>Login</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <span>You don't have an account ? <Link to='/register'>register</Link>  </span>
            </div>
        </div>
     );
}
 
export default Login;