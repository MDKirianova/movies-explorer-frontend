import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { NavLink, Outlet } from 'react-router-dom';
import "./Header.css";


export default function Header({ blueColor, isAuthorized }) {
  return (
    <>
      <header className={`header ${blueColor ? "header_blue-background" : ""} `}>
        <NavLink to={"/"}><img src={logo} alt="Логотип сайта про диплом" className="header__logo link" /></NavLink>
        <Navigation isAuthorized={isAuthorized} /> 
      </header>
      <Outlet />
    </>
  )
}