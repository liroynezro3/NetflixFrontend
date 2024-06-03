import classes from "./Watch.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, Link } from "react-router-dom";
const Watch = () => {
  const location = useLocation();
  const movie = location.movie;
console.log(movie)
  return (
    <div className={classes.watch}>
      <Link to="/">
        <div className={classes.back}>
          <ArrowBackIcon />
          Home
        </div>
      </Link>
      <video className={classes.video} autoPlay progress="true" src={movie?.video} controls playsInline/>
    </div>
  );
};

export default Watch;
