export function statGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// This function adds a point to the stat in question.
// It doesn't allow the stat to go above 100 or upgradePoints to go below 0.
export function addPoint(getter, setter, upgradePoints, setUpgradePoints) {
  if (upgradePoints == 100 && getter != 60) {
    return;
  } else if (getter == 100) {
    return;
  } else {
    setter(getter + 1);
    setUpgradePoints(upgradePoints - 1);
  }
}

//  This function removes an added point from the stat in question.
//  It doesn't allow the stat to go below 60 and it doesn't allow upgradePoints to go below 0.
export function subPoint(getter, setter, upgradePoints, setUpgradePoints) {
  if (upgradePoints == 0 || (getter <= 60 && getter <= 100)) {
    return;
  } else {
    setter(getter - 1);
    setUpgradePoints(upgradePoints + 1);
  }
}
