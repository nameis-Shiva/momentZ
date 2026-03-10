import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router";

const Navbar = () => {

  const navLinks = [
    {
      name: "Home",
      goTo:"/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9.85714L12 3L21 9.85714V21H14V14H10V21H3V9.85714Z" />
        </svg>
      ),
    },
    {
      name: "Search",
      goTo: "/search",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 20.3L16.65 16C17.5 14.85 18 13.45 18 12C18 7.58 14.42 4 10 4C5.58 4 2 7.58 2 12C2 16.42 5.58 20 10 20C11.45 20 12.85 19.5 14 18.65L18.3 23L21 20.3ZM4 12C4 8.69 7.69 4 10 4C12.31 4 16 8.69 16 12C16 15.31 12.31 20 10 20C7.69 20 4 15.31 4 12Z" />
        </svg>
      ),
    },
    {
      name: "Create",
      goTo:"/create-post",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5V19M5 12H19" strokeWidth="2" stroke="currentColor" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Profile",
      goTo:'/myprofile',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C8.13401 14 2 16.067 2 20V22H22V20C22 16.067 15.866 14 12 14Z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="navbar">
      {navLinks.map((link) => (
        <NavLink 
          key={link.name} 
          to={link.goTo} 
          end={link.goTo === "/"}
          className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
          <span className="icon">{link.icon}</span>
          {/* <span className="label">{link.name}</span> */}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;