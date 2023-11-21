import React from "react";
import { useState } from "react";
import {
  statGenerator,
  addPoint,
  subPoint,
  cbReceiverWar,
} from "../../functions";

export default function PlayerCreator() {
  // Eventually, this will be the QB Player Createor vs the CB PC, WR PC, and in the future the DL and LB PC.
  // QB States
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [accuracy, setAccuracy] = useState(60);
  let [armStr, setArmStr] = useState(60);
  let [speed, setSpeed] = useState(60);
  let [accel, setAccel] = useState(60);
  let [decMak, setDecMak] = useState(60);
  let [upgradePoints, setUpgradePoints] = useState(25);

  // WR States
  const [wrSpeed, setWrSpeed] = useState(60);
  const [wrAccel, setWrAccel] = useState(60);
  const [routeR, setRouteR] = useState(60);
  const [wrCatch, setWrCatch] = useState(60);

  // CB States
  const [cbSpeed, setCbSpeed] = useState(60);
  const [cbAccel, setCbAccel] = useState(60);
  const [coverage, setCoverage] = useState(60);
  const [cbCatch, setCbCatch] = useState(60);

  // Battle States, may convert the wins into objects with the name and win diff (with crit as the value in the event of a crit)
  // as opposed to seperating win and crit into different states.
  const [accelWin, setAccelWin] = useState("");
  const [speedWin, setSpeedWin] = useState("");
  const [coverWin, setCoverWin] = useState("");
  const [accelCrit, setAccelCrit] = useState({ "": false });
  const [speedCrit, setSpeedCrit] = useState({ "": false });
  const [coverCrit, setCoverCrit] = useState({ "": false });

  // Final deterministic states
  const [wrOpen, setWrOpen] = useState(false);

  // We create an object to hold the states of both combatants so that they can easily go into the
  // battle function.
  const wrObj = {
    speed: wrSpeed,
    accel: wrAccel,
    routeR,
    catching: wrCatch,
  };

  const cbObj = {
    speed: cbSpeed,
    accel: cbAccel,
    coverage,
    catching: cbCatch,
  };

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
    <div>
      <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
        <input
          style={{ marginTop: 5 }}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          style={{ marginTop: 5, marginBottom: 15 }}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <h1>Upgrade Points: {upgradePoints}</h1>
      </div>
      <div>
        <h2>
          Arm Strength: <span>{armStr}</span>
        </h2>
        {/* For some reason we don't get expected functionality from add or sub buttons. */}
        <button
          onClick={() => {
            addPoint(armStr, setArmStr, upgradePoints, setUpgradePoints);
          }}
        >
          +
        </button>
        <button
          onClick={() =>
            subPoint(armStr, setArmStr, upgradePoints, setUpgradePoints)
          }
        >
          -
        </button>
      </div>
      <div>
        <h2>
          Accuracy: <span>{accuracy}</span>
        </h2>
      </div>
      <div>
        <h2>
          Speed: <span>{speed}</span>
        </h2>
      </div>
      <div>
        <h2>
          Acceleration: <span>{accel}</span>
        </h2>
      </div>
      <div>
        <h2>
          Decision Making: <span>{decMak}</span>
        </h2>
      </div>
      <div>
        <button
          onClick={() => {
            setArmStr(statGenerator(60, 99));
            setAccuracy(statGenerator(60, 99));
            setSpeed(statGenerator(60, 99));
            setAccel(statGenerator(60, 99));
            setDecMak(statGenerator(60, 99));
          }}
        >
          Randomize
        </button>
        <button
          onClick={() => {
            setArmStr(statGenerator(70, 99));
            setAccuracy(statGenerator(70, 99));
            setSpeed(statGenerator(60, 75));
            setAccel(statGenerator(60, 75));
            setDecMak(statGenerator(60, 99));
          }}
        >
          Pocket Passer
        </button>
        <button
          onClick={() => {
            setArmStr(statGenerator(60, 90));
            setAccuracy(statGenerator(60, 85));
            setSpeed(statGenerator(70, 99));
            setAccel(statGenerator(70, 99));
            setDecMak(statGenerator(60, 99));
          }}
        >
          Dual Threat
        </button>
      </div>
      <div>
        <h1>Now Let's Make Your WR and their Opponent</h1>
        <div>
          <h1>WR</h1>
          <h2>Speed: {wrSpeed}</h2>
          <h2>Accel: {wrAccel}</h2>
          <h2>Route Running: {routeR}</h2>
          <h2>Catching: {wrCatch}</h2>
          <button onClick={() => receiverGenerator()}>Generate Stats</button>
        </div>
        <div>
          <h1>CB</h1>
          <h2>Speed: {cbSpeed}</h2>
          <h2>Accel: {cbAccel}</h2>
          <h2>Coverage: {coverage}</h2>
          <h2>Catching: {cbCatch}</h2>
          <button onClick={() => cbGenerator()}>Generate Stats</button>
        </div>
      </div>
      <div>
        <h1>Rock and Roll! Let's play!</h1>
        <button
          onClick={() => {
            cbReceiverWar(
              wrObj,
              cbObj,
              accelWin,
              setAccelWin,
              accelCrit,
              setAccelCrit,
              speedWin,
              setSpeedWin,
              speedCrit,
              setSpeedCrit,
              coverWin,
              setCoverWin,
              coverCrit,
              setCoverCrit,
              wrOpen,
              setWrOpen
            );
          }}
        >
          Go!
        </button>
      </div>
    </div>
  );
}
