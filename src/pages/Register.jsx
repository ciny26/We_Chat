import AddImg from "../images/AddImg.svg"
const Register = () => {
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WE CHAT!</span>
                <span className="title">Register Now</span>
                <form>
                    <input type="text" name="" id="" placeholder="Enter a name" />
                    <input type="email" name="" id="" placeholder="Enter an email" />
                    <input type="password" name="" id="" placeholder="Enter a password" />
                    <input style={{display:"none"}} type="file" name="" id="file" placeholder="Enter profile image" />
                    <label htmlFor="file">
                        <span><img src={AddImg} alt="" /></span>
                        <span className="fileText">add your picture</span>
                    </label>
                    <button type="button">Sign up</button>
                </form>
                <span>If you already have an account ? login </span>
            </div>
        </div>

        
     );
}
 
export default Register
