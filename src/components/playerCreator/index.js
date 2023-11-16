import React from "react";
import { useState } from "react";

export default function PlayerCreator() {
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

  // Battle States
  const [accelWin, setAccelWin] = useState("");
  const [speedWin, setSpeedWin] = useState("");
  const [coverWin, setCoverWin] = useState("");
  const [accelCrit, setAccelCrit] = useState(false);
  const [speedCrit, setSpeedCrit] = useState(false);
  const [coverCrit, setCoverCrit] = useState(false);

  const statGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

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

  // Here's the dice roll function
  const battleRoll = (wrStat, cbStat) => {
    // We create two variables, one hold the result of a WR skill check up to 100,
    // the other holds the result of a CB skill check up to 100.
    // The WR/CB's stat in question serves as the possible minimum for the roll.
    let wrRoll = Math.floor(Math.random() * (100 - wrStat) + wrStat);
    let cbRoll = Math.floor(Math.random() * (100 - cbStat) + cbStat);

    if (wrRoll > cbRoll) {
      return {
        wrWins: true,
        wrWinDiff: wrRoll - cbRoll,
        cbWinDiff: null,
      };
    } else if (cbRoll > wrRoll) {
      return {
        wrWins: false,
        cbWinDiff: cbRoll - wrRoll,
        wrWinDiff: null,
      };
    } else if (wrRoll === cbRoll) {
      return "Push";
    }
  };

  // This function is the big bad battle. Acceleration determines who wins off the line, so that counts for the first
  // 1 seconds of the route. Speed determines who's more likely to win after that.
  // Unless the speed win is above 10 or more, you have three coverage vs. route running rolls,
  // best two out of three wins, unless one has a roll that's a 95+, then that's an automatic win.
  // Whoever wins has a +10 advantage to a catch, but if they lost on a 95+ critical, or if they lose by 20 or more,
  // they don't even get a catch roll. Later we'll add a yardage estimation (for short, medium, and long)
  // to progress down the field.

  const cbReceiverWar = (obj1, obj2) => {
    // Accel war
    let accelFight = battleRoll(obj1.accel, obj2.accel);

    if (accelFight.wrWins == true && accelFight.wrWinDiff <= 10) {
      console.log("WR Win Diff", accelFight.wrWinDiff);
      let speedRes = speedBattle(accelFight, wrObj, cbObj);
      console.log(speedRes);
      // routeVCover(speedRes, wrObj, cbObj);
    } else {
      console.log("CB Win Diff", accelFight.cbWinDiff);
      let speedRes = speedBattle(accelFight, wrObj, cbObj);
      console.log(speedRes);
      // routeVCover(speedRes, wrObj, cbObj);
    }
  };

  // This is the speed battle subfunction of the larger full battle function.
  // Obj 1 is the result of the accelFight, obj2 is WR, obj3 is CB.
  const speedBattle = (obj1, obj2, obj3) => {
    let speedFight = battleRoll(obj2.speed, obj3.speed);

    // We need implement the states for the wins, the result of speedfight, and the crit bools.
    if (obj1.wrWinDiff != null && obj1.wrWinDiff < 10) {
      console.log("WR accel win, speedfight result: ", speedFight);
    } else if (obj1.cbWinDiff != null && obj1.cbWinDiff < 10) {
      console.log("CB accel win, speedfight result: ", speedFight);
    } else if (obj1.wrWinDiff >= 10) {
      console.log("CRITICAL WR WIN, speedfight result: ", speedFight);
    } else if (obj1.cbWinDiff >= 10) {
      console.log("CRITICAL CB WIN, speedfight result: ", speedFight);
    }
  };

  // This is the route running v coverage battle subfunction of the larger full battle function.
  // Obj 1 is the result of the speedFight, obj2 is WR, obj3 is CB.
  const routeVCover = (obj1, obj2, obj3) => {
    let coverFight = battleRoll(obj2.routeR, obj3.coverage);

    if (obj1.wrWins === true && obj1.wrWinDiff < 10) {
      console.log("WR speed win, coverfight result: ", coverFight);
    } else if (obj1.wrWins === false && obj1.cbWinDiff < 10) {
      console.log("CB speed win, coverfight result: ", coverFight);
    } else if (obj1.wrWinDiff >= 10) {
      console.log("CRITICAL WR WIN, coverfight result: ", coverFight);
    } else if (obj1.cbWinDiff >= 10) {
      console.log("CRITICAL CB WIN, coverfight result: ", coverFight);
    }
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

  //   This function adds a point to the stat in question.
  // It doesn't allow the stat to go above 100 or upgradePoints to go below 0.
  const addPoint = (getter, setter) => {
    if (upgradePoints == 100 && getter != 60) {
      return;
    } else if (getter == 100) {
      return;
    } else {
      setter(getter + 1);
      setUpgradePoints(upgradePoints - 1);
    }
  };

  //  This function removes an added point from the stat in question.
  //  It doesn't allow the stat to go below 60 and it doesn't allow upgradePoints to go below 0.
  const subPoint = (getter, setter) => {
    if (upgradePoints == 0 || (getter <= 60 && getter <= 100)) {
      return;
    } else {
      setter(getter - 1);
      setUpgradePoints(upgradePoints + 1);
    }
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
            addPoint(armStr, setArmStr);
          }}
        >
          +
        </button>
        <button onClick={() => subPoint(armStr, setArmStr)}>-</button>
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
            cbReceiverWar(wrObj, cbObj);
          }}
        >
          Go!
        </button>
      </div>
    </div>
  );
}
