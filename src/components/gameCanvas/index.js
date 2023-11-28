import React, { useState } from "react";
import { shortRoute } from "../../functions";
import { QBCreator, WRCreator, CBCreator } from "../playerCreator";

export default function GameCanvas() {
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

  // Last but not least, for concision's sake we have an object that contains all the states and variables
  // we need for a fair fight.

  const battleObj = {
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
    setWrOpen,
  };

  return (
    <div
      style={{
        backgroundColor: "red",
        alignContent: "center",
        display: "flex",
        flexBasis: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Let's Start with Your QB</h1>
        <QBCreator
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          accuracy={accuracy}
          setAccuracy={setAccuracy}
          armStr={armStr}
          setArmStr={setArmStr}
          speed={speed}
          setSpeed={setSpeed}
          accel={accel}
          setAccel={setAccel}
          decMak={decMak}
          setDecMak={setDecMak}
          upgradePoints={upgradePoints}
          setUpgradePoints={setUpgradePoints}
        />
      </div>
      <div>
        <h1>Now Let's Make Your WR and their Opponent</h1>
        <WRCreator
          wrSpeed={wrSpeed}
          setWrSpeed={setWrSpeed}
          wrAccel={wrAccel}
          setWrAccel={setWrAccel}
          routeR={routeR}
          setRouteR={setRouteR}
          wrCatch={wrCatch}
          setWrCatch={setWrCatch}
        />
        <CBCreator
          cbSpeed={cbSpeed}
          setCbSpeed={setCbSpeed}
          cbAccel={cbAccel}
          setCbAccel={setCbAccel}
          coverage={coverage}
          setCoverage={setCoverage}
          cbCatch={cbCatch}
          setCbCatch={setCbCatch}
        />
      </div>
      <div>
        <h1>Rock and Roll! Let's play!</h1>
        <button
          onClick={() => {
            shortRoute(battleObj);
          }}
        >
          Short route
        </button>
      </div>
    </div>
  );
}
