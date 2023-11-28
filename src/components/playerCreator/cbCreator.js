import React from "react";
import { statGenerator } from "../../functions";

export default function CBCreator({
  cbSpeed,
  setCbSpeed,
  cbAccel,
  setCbAccel,
  coverage,
  setCoverage,
  cbCatch,
  setCbCatch,
}) {
  // For now, corners have 4 stats: speed, accel, coverage and catching.
  // Accel determines if they can cover a WR right off the line.
  // Speed determines if they can keep pace with their WR.
  // Coverage determines if they can lock up their WR's route running and stay on top of them.
  // Catching determines if they can catch an interception if they have an overwhelming coverage win.

  // Later, we'll subdivide corners into zone guys, man guys, and all arounders.
  const cbGenerator = () => {
    setCbSpeed(statGenerator(60, 99));
    setCbAccel(statGenerator(60, 99));
    setCoverage(statGenerator(60, 99));
    setCbCatch(statGenerator(60, 99));
  };

  return (
    <div style={{ backgroundColor: "purple" }}>
      <h1>CB</h1>
      <h2>Speed: {cbSpeed}</h2>
      <h2>Accel: {cbAccel}</h2>
      <h2>Coverage: {coverage}</h2>
      <h2>Catching: {cbCatch}</h2>
      <button onClick={() => cbGenerator()}>Generate Stats</button>
    </div>
  );
}
