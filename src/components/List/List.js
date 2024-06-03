import React, { useEffect, useRef, useState } from "react";
import classes from "./List.module.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ListItem from "../ListItem/ListItem";

export const List = ({ list }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const [clickLimit, setLimit] = useState(window.innerWidth/230);
  const [shuffledArray, setShuffledArray] = useState([]);
  const listRef = useRef();
  useEffect(() => {
    setShuffledArray(
      () => list && list.content.sort((a, b) => 0.5 - Math.random())
    );
  }, [list]);

  let timer;
  const timerHandle = (direction) => {
    clearTimeout(timer);
    timer = setTimeout(() => handleClick(direction), 400);
  };
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 13-clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className={classes.list}>
      <span className={classes.listTitle}>{list.title}</span>
      <div className={classes.wrapper}>
        <ArrowBackIosOutlinedIcon
          className={classes.sliderArrowLeft}
          onClick={() => {
            timerHandle("left");
          }}
          style={{ display: !isMoved && "none" }}
        />
        <div
          className={classes.container} //style={{ transform: "translateX(100px)" }}
          ref={listRef}
        >
          {shuffledArray.map((item, i) => (
            <ListItem index={i} item={item} key={i}></ListItem>
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon
          className={classes.sliderArrowRight}
          onClick={() => timerHandle("right")}
        />
      </div>
    </div>
  );
};
