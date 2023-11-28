// Here's the dice roll function
function battleRoll(wrStat, cbStat) {
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
}

// This is the speed battle subfunction of the larger full battle function.
// Obj 1 is the result of the accelFight, obj2 is WR, obj3 is CB.
function speedBattle(
  win,
  obj1,
  obj2,
  obj3,
  setSpeedWin,
  setSpeedCrit,
  setWrOpen
) {
  let speedFight = battleRoll(obj2.speed, obj3.speed);
  // We need implement the states for the wins, the result of speedfight, and the crit bools.

  // This is what happens if there's an accel crit. Should this be moved to the larger battle function?
  if (win == "wr" && obj1.wrWinDiff > 10) {
    console.log("CRITICAL WR WIN, speedfight result: ", speedFight);
    setSpeedWin("wr");
    setWrOpen(true);
  } else if (win == "cb" && obj1.cbWinDiff > 10) {
    console.log("CRITICAL CB WIN, speedfight result: ", speedFight);
    setSpeedCrit({ cb: true });
    setSpeedWin("cb");
    // This is what happens if there's an accel win, but no crit.
  } else if (win == "wr") {
    console.log("WR accel win, speedfight result: ", speedFight);
    setWrOpen(true);
    setSpeedWin("wr");
  } else if (win == "cb") {
    console.log("CB accel win, speedfight result: ", speedFight);
    setWrOpen(false);
    setSpeedWin("cb");
  }
}

// This is the route running v coverage battle subfunction of the larger full battle function.
// Obj 1 is the result of the speedFight, obj2 is WR, obj3 is CB.
function routeVCover(
  win,
  obj1,
  obj2,
  obj3,
  speedWin,
  setCoverWin,
  setCoverCrit,
  setWrOpen
) {
  if (speedWin) {
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
  }
}

// These three functions define the different route lengths. Short Routes see a single CB Receiver War
// Mid Routes are best 2 out of 3, deep routes are best 3 out of 5.
export function shortRoute({
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
}) {
  //
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

  if (wrOpen === true) {
    console.log("Mailbox!");
  } else {
    console.log("Strapped!");
  }
}

export function midRoute({
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
}) {}

export function deepRoute({
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
}) {}

// This function is the big bad battle. Acceleration determines who wins off the line, so that counts for the first
// 1 seconds of the route. Speed determines who's more likely to win after that.
// Unless the speed win is above 10 or more, you have three coverage vs. route running rolls,
// best two out of three wins, unless one has a roll that's a 95+, then that's an automatic win.
// Whoever wins has a +10 advantage to a catch, but if they lost on a 95+ critical, or if they lose by 20 or more,
// they don't even get a catch roll. Later we'll add a yardage estimation (for short, medium, and long)
// to progress down the field.

// We need this function to return a win state or a crit state. Should we really be tracking all of these states?

export function cbReceiverWar(
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
) {
  // Accel war kicks off the fight. If we land a crit here, the battle is pretty much over.
  // After 1.5 seconds, we move to the speed battle.
  // If that battle ends up in a crit, then it's over.
  // During the speed battle, we have the coverage vs route running battle.
  // If there's a coverage crit, it's the same deal. Either the receiver is locked up,
  // or the CB is juked out of their shoes. The catch battle is the last line of defense.
  let accelFight = battleRoll(wrObj.accel, cbObj.accel);
  // Don't forget to add accelCrits here, and account for a "Push" result.
  if (accelFight.wrWins == true && accelFight.wrWinDiff <= 10) {
    console.log("WR Win Diff", accelFight.wrWinDiff);
    setAccelWin("wr");
    setWrOpen(true);
    setTimeout(() => {
      console.log("speed battle triggered wr win");
      speedBattle(
        accelWin,
        accelFight,
        wrObj,
        cbObj,
        setSpeedWin,
        setSpeedCrit,
        setWrOpen
      );
      routeVCover(speedWin, wrObj, cbObj);
    }, 1500);
  } else if (accelFight.wrWins == false && accelFight.cbWinDiff <= 10) {
    console.log("CB Win Diff", accelFight.cbWinDiff);
    setAccelWin("cb");
    setTimeout(() => {
      console.log("speed battle triggered cb win");
      speedBattle(
        accelWin,
        accelFight,
        wrObj,
        cbObj,
        setSpeedWin,
        setSpeedCrit,
        setWrOpen
      );
      routeVCover(speedWin, wrObj, cbObj);
    }, 1500);
    // Critical accel win for WR
  } else if (accelFight.wrWins == true && accelFight.wrWinDiff > 10) {
    setAccelWin("wr");
    setAccelCrit({ wr: true });
    setWrOpen(true);
  } else if (accelFight.wrWins == false && accelFight.cbWinDiff > 10) {
    setAccelWin("cb");
    setAccelCrit({ cb: true });
  }
}
