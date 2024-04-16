const a = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.britannica.com%2Fbiography%2FCristiano-Ronaldo&psig=AOvVaw0wqv1Mi-QyROTAjstK34o1&ust=1713306653472000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMj9iOaixYUDFQAAAAAdAAAAABAE'
const NavBar = () => {
    return ( 
        <nav className="navBar">
            <span className="logo">WE CHAT</span>
            <div className="user">
                <img src='https://cdn.britannica.com/73/234573-050-8EE03E16/Cristiano-Ronaldo-ceremony-rename-airport-Santa-Cruz-Madeira-Portugal-March-29-2017.jpg' alt="" className="userImg" />
                <span className="userName">Yassine</span>
                <button>Logout</button>
            </div>
        </nav>
     );
}
 
export default NavBar;