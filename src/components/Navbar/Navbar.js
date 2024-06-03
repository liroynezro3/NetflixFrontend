import React, { useContext, useState } from "react";
import classes from "./Navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { logout } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useHistory } from "react-router-dom";
const Navbar = ({setGenre}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {dispatch} = useContext(AuthContext)
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const history=useHistory()
  const logoutHandler=()=>{
    logout(dispatch);
    history.push("/")
  }
  return (
    <div className={isScrolled?`${classes.navbar} ${classes.scrolled}`:classes.navbar}>
      <div className={classes.container}>
        <div className={classes.left}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
            alt=""
          ></img>
          <Link to="/" className={classes.link} onClick={()=>{setGenre(null)}}><span>Homepage</span></Link>
          <Link to="series" className={classes.navbarmainLinks}><span>Series</span></Link>
          <Link to="movies" className={classes.navbarmainLinks}><span>Movies</span></Link>
        </div>
        <div className={classes.right}>
          <SearchIcon className={classes.icon}></SearchIcon>
          <NotificationsIcon className={classes.icon}></NotificationsIcon>
          <img
            src="https://coolmenshair.com/wp-content/uploads/hairstyles-for-50-year-old-man-3.jpg"
            alt=""
          ></img>
          <div className={classes.profile}>
            <ArrowDropDownIcon className={classes.icon}></ArrowDropDownIcon>
            <div className={classes.options}>
              <span onClick={logoutHandler} style={{ cursor: "pointer"}}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
