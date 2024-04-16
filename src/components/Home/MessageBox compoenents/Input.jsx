import AddImg from "../../../images/AddImg.svg"
import AttachFile from "../../../images/AttachFile.svg"
import SendIcon from "../../../images/Send.svg"
const Input = () => {
    return ( 
        <div className="Input">
            
            <input type="text" placeholder="Type something ..."  className="message"/>
            <div className="Send">

                <input type="file" style={{display:"none"}} id="addImg" />
                <label htmlFor="addImg">
                    <img src={AddImg} alt="" className="addImg" />
                </label>
                
                <input type="file" style={{display:"none"}} id="addFile" />
                <label htmlFor="addFile">
                    <img src={AttachFile} alt="" />
                </label>
                <div className="sendBtn">
                    <img src={SendIcon} alt="" />
                </div>

            </div>
        </div>
     );
}
 
export default Input;