import React from "react";
import Ghost from "./Ghost";

function Ghosts() {

  return (
    <>
      <Ghost angleMultiplier={0.5} color={"green"}/>
      <Ghost angleMultiplier={0.32} color={"blue"} />
      <Ghost angleMultiplier={0.18} color={"red"}/>
    </>
  );
}

export default Ghosts;
