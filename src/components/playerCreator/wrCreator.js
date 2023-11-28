import React from "react";
import { statGenerator } from "../../functions";

export default function WRCreator({
  wrSpeed,
  setWrSpeed,
  wrAccel,
  setWrAccel,
  routeR,
  setRouteR,
  wrCatch,
  setWrCatch,
}) {
  // For now, receivers have 4 stats: speed, accel, route running and catching.
  // Accel determines if they can beat a corner right off the line.
  // Speed determines if they can outrun their corner to get open.
  // Route running determines if they can beat their CB with moves.
  // Catching determines if they bring in the ball or drop it.

  // Later, we'll subdivide receivers into possession, speed, and all arounders.
  const receiverGenerator = () => {
    setWrSpeed(statGenerator(60, 99));
    setWrAccel(statGenerator(60, 99));
    setRouteR(statGenerator(60, 99));
    setWrCatch(statGenerator(60, 99));
  };

  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>WR</h1>
      <h2>Speed: {wrSpeed}</h2>
      <h2>Accel: {wrAccel}</h2>
      <h2>Route Running: {routeR}</h2>
      <h2>Catching: {wrCatch}</h2>
      <button onClick={() => receiverGenerator()}>Generate Stats</button>
    </div>
  );
}
