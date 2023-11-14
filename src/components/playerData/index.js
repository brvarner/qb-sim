import React from "react";
import { useState } from "react";

export default function PlayerInfo() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [accuracy, setAccuracy] = useState(60);
  let [armStr, setArmStr] = useState(60);
  let [speed, setSpeed] = useState(60);
  let [accel, setAccel] = useState(60);
  let [decMak, setDecMak] = useState(60);
  let [upgradePoints, setUpgradePoints] = useState(100);

  const statGenerator = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
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
            console.log("click 1");
            addPoint(armStr, setArmStr);
            console.log("click 2");
            console.log(armStr);
          }}
        >
          +
        </button>
        <button onClick={() => subPoint(armStr, setArmStr)}>-</button>
      </div>
      <h2>
        Accuracy: <span>{accuracy}</span>
      </h2>
      <h2>
        Speed: <span>{speed}</span>
      </h2>
      <h2>
        Acceleration: <span>{accel}</span>
      </h2>
      <h2>
        Decision Making: <span>{decMak}</span>
      </h2>
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
    </div>
  );
}
