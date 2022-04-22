import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/">RunSetter</Link>
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
              <Link to="/login">
                <FaSignInAlt /> login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
