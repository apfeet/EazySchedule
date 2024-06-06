import React, { useEffect, useState } from 'react';
import CheckifUserIsLogged from '../!function/CheckifUserIsLogged.js';
import { Link } from 'react-router-dom';
import '../style.css';
import logo from '../../assets/ES_logo.png';
import Button from './Button.jsx';
import { MdOutlineCreateNewFolder, MdOutlineMonitorHeart } from 'react-icons/md';
import { IoReceiptOutline } from 'react-icons/io5';
import { CiLogin } from 'react-icons/ci';
import { RiLogoutCircleRLine } from "react-icons/ri";
import logout from '../!function/Logout.js';

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await CheckifUserIsLogged();
      setIsLogged(response.status);
    };
    checkLoginStatus();
  }, []);

  if (isLogged) {
    return (
      <>
        {/* NavBar */}
        <div className='NavBarContainer'>
          <Link to="/">
            <img className="NavBarContainer_Logo" src={logo} alt="Logo" />
          </Link>
          <div className="NavBarContainer__InnerButtonContainer">
            <Link to="/create">
            <Button
              buttonText="Create"
              icon={<MdOutlineCreateNewFolder />}
            />
            </Link>
            <Button
              buttonText="Monitor"
              icon={<MdOutlineMonitorHeart />}
            />
            <Button
              buttonText="Prizing"
              icon={<IoReceiptOutline />}
            />
          </div>
          <button onClick={(e) => {
            e.preventDefault();
            logout();
          }} >
            <RiLogoutCircleRLine className='NavBarContainer_Logo' color='white' cursor="pointer" />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* NavBar */}
      <div className='NavBarContainer'>
        <Link to="/">
          <img className="NavBarContainer_Logo" src={logo} alt="Logo" />
        </Link>
        <div className="NavBarContainer__InnerButtonContainer">
          <Button
            buttonText="Create"
            icon={<MdOutlineCreateNewFolder />}
          />
          <Button
            buttonText="Monitor"
            icon={<MdOutlineMonitorHeart />}
          />
          <Button
            buttonText="Prizing"
            icon={<IoReceiptOutline />}
          />
        </div>
        <Link to="/EnterPortal">
          <CiLogin className='NavBarContainer_Logo' color='white' cursor="pointer" />
        </Link>
      </div>
    </>
  );
};

export default NavBar;
