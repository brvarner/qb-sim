import React from "react";
import { statGenerator, addPoint, subPoint } from "../../functions";

export default function QBCreator({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  accuracy,
  setAccuracy,
  armStr,
  setArmStr,
  speed,
  setSpeed,
  accel,
  setAccel,
  decMak,
  setDecMak,
  upgradePoints,
  setUpgradePoints,
}) {
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
    </div>
  );
}
