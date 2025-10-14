import React from "react";

export default function LinesPage() {
  return (
    <div>
      // YOUR JSX CODE
      <NavBar color={currColor} data={stationData}></NavBar>
      <TrainList color={currColor} data={trainData}></TrainList>
      // YOUR JSX CODE
    </div>
  );
}
