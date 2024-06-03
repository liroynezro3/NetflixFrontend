import React, { useState, useEffect,useContext} from "react";
import classes from "./ListItem.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [isLoading,setIsLoading]=useState(false)
  const {user} = useContext(AuthContext);
  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_NETFLIXBACKEND}/movies/find/` + item, {
          headers: {
            token:
            `Bearer ${user.accessToken}`,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getMovie();
    console.log("is render");
  }, [item]);
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div className={classes.listItem}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={()=>setIsHovered(true)}
        onTouchEnd={()=>setIsHovered(false)}
      >
        {isLoading?<div className={classes.aroundSpan}><span className={classes.loader}/></div>:<img src={movie?.img} alt={movie?.title} />}
        {isHovered && (
          <div className={classes.itemHover}>
            <video  src={movie?.trailer} muted autoPlay={"autoplay"} loop playsInline/>
            <div className={classes.itemInfo}>
              <div className={classes.icons}>
                <PlayArrowIcon className={classes.icon} />
                <AddIcon className={classes.icon} />
                <ThumbUpOutlinedIcon className={classes.icon} />
                <ThumbDownOutlinedIcon className={classes.icon} />
              </div>
              <h3 style={{margin:"5px"}}>{movie?.title}</h3>
              <div className={classes.itemInfoTop}>
                <span>{movie?.duration}</span>
                <span className={classes.limit}>{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className={classes.desc}>{movie?.desc?.substring(0, 70)}...</div>
              <div className={classes.genre}>{movie?.genre}</div>
            </div>
         </div>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
