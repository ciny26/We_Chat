const Login = () => {
    return ( 
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">WE CHAT!</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" name="" id="" placeholder="Enter an email" />
                    <input type="password" name="" id="" placeholder="Enter a password" />
                    <button type="button">Login</button>
                </form>
                <span>You don't have an account ? register </span>
            </div>
        </div>
     );
}
 
export default Login;