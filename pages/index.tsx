import React from "react";
import Matriz from "../components/Matriz";

const Home = (props) => {

  const Tiles = Array(8*8).fill(0).map((_, i) => ({
    checked: false,
    index: i,
    checkTile: null,
    isValid: false,
    clickIndex: 0
  }));

  
  return (
    <div className="Home">
      <Matriz tiles={Tiles} />
    </div>
  );
};

export default Home;
