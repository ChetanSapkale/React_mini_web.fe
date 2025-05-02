import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {Logoutfunction}=useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () =>{
    Logoutfunction();
    navigate("/");
  }
  return (
    <nav className="navbar">
      <div className="navbar-title"><Link to={"/"}>Navbar</Link></div>
      <ul className="navbar-links">
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
      <div className="auth-buttons">
        <Link to={"/login"}><button className="auth-button login">Login</button></Link>
        <button className="auth-button logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
