import React, { useEffect, useState, useContext  } from "react";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Home.module.css";
import Featured from "../../components/Featured/Featured";
import { List } from "../../components/List/List";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const {user} = useContext(AuthContext);
  console.log(lists)
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_NETFLIXBACKEND}/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
          {
            headers: {
              token:
                `Bearer ${user.accessToken}`,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className={classes.home}>
      <Navbar setGenre={setGenre}></Navbar>
      <Featured type={type} setGenre={setGenre}></Featured>
      {lists.map((list, index) => (
        <List list={list} key={index} />
      ))}
    </div>
  );
};

export default Home;
