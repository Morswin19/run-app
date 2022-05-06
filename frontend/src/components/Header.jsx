import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/register')
  }

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">Runs</NavLink>
        <NavLink to="/goal">Goal</NavLink>
      </div>
      <ul>
        {user ? (
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> logout
              </button>
            </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">
                <FaSignInAlt /> login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <FaUser /> Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
