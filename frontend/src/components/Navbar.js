import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiHomeSmileFill } from 'react-icons/ri';
import { BsShopWindow } from 'react-icons/bs';
import { PiPhoneCallFill } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { FcAbout } from "react-icons/fc";
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/');
  };

  const Menus = [
    { name: 'HOME', icon: RiHomeSmileFill, link: '/' },
    { name: 'PROPERTY', icon: BsShopWindow, link: '/Property' },
    { name: 'ABOUT', icon: FcAbout, link: '/about' },
    { name: 'CONTACT', icon: PiPhoneCallFill, link: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          {Menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.link}
              className="text-black mr-4 hover:text-gray-300 flex items-center"
            >
              <menu.icon className="mr-2" />
              {menu.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-button">LOGOUT</button>
          ) : (
            <Link to="/login" className="nav-button">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;