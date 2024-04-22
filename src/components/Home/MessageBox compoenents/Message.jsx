const Message = ({message}) => {
    const a = 'https://cdn.britannica.com/73/234573-050-8EE03E16/Cristiano-Ronaldo-ceremony-rename-airport-Santa-Cruz-Madeira-Portugal-March-29-2017.jpg'
    return ( 
        <div className="Message owner">
           <div className="MessageInfo">
            <img src={a} alt="" />
            <span>Just now</span>
           </div>
           <div className="MessageContent">
            <p>hello</p>
            <img src={a} alt="" />
           </div>
        </div>
     );
}
 
export default Message;