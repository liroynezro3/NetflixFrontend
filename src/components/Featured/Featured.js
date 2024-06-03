import React, { useState, useEffect,useContext} from "react";
import classes from "./Featured.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";
const Featured = ({ type, setGenre }) => {
  const {user} = useContext(AuthContext);
  const [content, setContent] = useState();
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_NETFLIXBACKEND}/movies/random?type=${type}`, {
          headers: {
            token:
            `Bearer ${user.accessToken}`,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className={classes.featured}>
      {type && (
        <div className={classes.category}>
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={e => setGenre(e.target.value)}
          >
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantazy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {content?<img src={content?.img}/>:<div className={classes.aroundSpan}><span className={classes.loader}></span></div>}
      <div className={classes.info}>
        <h3 className={classes.title}>{content?.title}</h3>
        <span className={classes.description}>{content?.desc?.substring(0, 370)}</span>
        <div className={classes.buttons}>
        <Link className={classes.link} to={{ pathname: "/watch", movie: content }}>
          <button className={classes.play}>
            <PlayArrowIcon />
            <span>play</span>
          </button>
          </Link>
          <button className={classes.more}>
            <InfoOutlinedIcon />
            <span>more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
