import { rollDice } from "./animation.js";
import { IN_WINDOW, MODULE_ID } from "./const.js";

export function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

const offScreen = 0.05;

export function getFinalCoordinates() {
  const type = Math.floor(Math.random() * 3);
  return {
    x: type === 1 ? onScreenOffset() : offscreenOffset(),
    y: type === 0 ? onScreenOffset() : offscreenOffset(),
  };
}

function offscreenOffset() {
  return (offScreen + (Math.random() * offScreen) / 5) * randomSign();
}

function onScreenOffset() {
  return Math.random() * offScreen * randomSign();
}

export function setupAPI() {
  window.dicearooni = {
    api: {
      rollDice,
    },
    data: {},
  };
}

export function setupLandingSpots() {
  const spotEnd = 0.3;
  const spotBegin = -0.3;
  const step = 0.1 * game.settings.get(MODULE_ID, "dice.size");
  const stepCount = Math.round((spotEnd - spotBegin) / step);
  const landingSpots = [];
  let x = spotBegin;
  let y = spotBegin;
  for (let i = 0; i <= stepCount; i++) {
    for (let j = 0; j <= stepCount; j++) {
      landingSpots.push({
        x: spotBegin + i * step + getLandingSpotJitter(step),
        y: spotBegin + j * step + getLandingSpotJitter(step),
      });
    }
  }
  window.dicearooni.data.landingSpots =
    Sequencer.Helpers.shuffle_array(landingSpots);
  window.dicearooni.data.landingSpotIndex = 0;
}

function getLandingSpotJitter(step) {
  const jitterBase = step / 10;
  return randomSign() * jitterBase * Math.random();
}

export function getLandingSpot() {
  if (
    window.dicearooni.data.landingSpots.length <=
    window.dicearooni.data.landingSpotIndex
  ) {
    window.dicearooni.data.landingSpotIndex = 0;
    window.dicearooni.data.landingSpots = Sequencer.Helpers.shuffle_array(
      window.dicearooni.data.landingSpots,
    );
  }
  return window.dicearooni.data.landingSpots[
    window.dicearooni.data.landingSpotIndex++
  ];
}

export function distance(coords1, coords2) {
  return Math.hypot(coords2.x - coords1.x, coords2.y - coords1.y);
}

export function getDiceResults(rolls, visible, userColor) {
  const results = [];

  for (const roll of rolls ?? []) {
    if (roll.instances) {
      for (const instance of roll?.instances ?? []) {
        const type = instance.type;
        dieResultsHelper(roll.dice, results, type);
      }
    } else {
      dieResultsHelper(roll.dice, results, null);
    }
  }

  // console.log({ results });

  rollDice(results, !visible, userColor);
}

function dieResultsHelper(roll, results, type) {
  for (const die of roll ?? []) {
    // console.log({ roll, die });
    const dieType = `d${die.faces}`;
    for (const res of die?.results ?? []) {
      results.push({
        value: res?.result,
        active: res?.active,
        die: dieType,
        type,
      });
    }
  }
  return results;
}

export function generatePoints() {
  const points = [];
  for (let i = 0; i < 1000; i++) {
    points.push({
      x: IN_WINDOW.X.MIN + (IN_WINDOW.X.MAX - IN_WINDOW.X.MIN) * Math.random(),
      y: IN_WINDOW.Y.MIN + (IN_WINDOW.Y.MAX - IN_WINDOW.Y.MIN) * Math.random(),
    });
  }
  window.dicearooni.data.points = points;
  window.dicearooni.data.pointCount = 0;
}

export function getDieRollPoint({ windows, dice }) {
  const avoidWindows = game.settings.get(MODULE_ID, "dice.avoid.windows");
  const avoidOtherDice = game.settings.get(MODULE_ID, "dice.avoid.dice");
  if (
    window.dicearooni.data.pointCount >= window.dicearooni.data.points.length
  ) {
    window.dicearooni.data.points = Sequencer.Helpers.shuffle_array(
      window.dicearooni.data.points,
    );
    window.dicearooni.data.pointCount = 0;
  }
  if (avoidWindows || avoidOtherDice) {
    const TOO_CLOSE = BASE_DISTANCE * game.settings.get(MODULE_ID, "dice.size");
    while (
      window.dicearooni.data.pointCount <
      window.dicearooni.data.points.length - 1
    ) {
      const point =
        window.dicearooni.data.points[window.dicearooni.data.pointCount++];

      if (avoidWindows && testIfInWindows(point, windows)) {
        continue;
      }

      if (
        avoidOtherDice &&
        testIfTooCloseToDice(point.x, point.y, dice, TOO_CLOSE)
      ) {
        continue;
      }

      return point;
    }
  } else {
    return window.dicearooni.data.points[window.dicearooni.data.pointCount++];
  }
}

const BASE_DISTANCE = 0.06;
export function getWindowPositions() {
  const WINDOW_BORDER =
    (BASE_DISTANCE * game.settings.get(MODULE_ID, "dice.size")) / 2;
  return [
    ...Object.values(ui.windows),
    ...foundry.applications.instances
      .values()
      .toArray()
      .filter((a) => a.hasFrame),
  ].map((win) => {
    const br = win.element?.length
      ? win.element[0]?.getBoundingClientRect()
      : win.element?.getBoundingClientRect();
    return {
      x1: br.left / window.innerWidth - WINDOW_BORDER,
      y1: br.top / window.innerHeight - WINDOW_BORDER,

      x2: br.right / window.innerWidth + WINDOW_BORDER,
      y2: br.bottom / window.innerHeight + WINDOW_BORDER,
    };
  });
}
function testIfInWindows(point, windows) {
  return windows.some(
    ({ x1, y1, x2, y2 }) =>
      point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2,
  );
}

function testIfTooCloseToDice(px, py, dice, TOO_CLOSE) {
  for (let i = 0; i < dice.length; i++) {
    const d = dice[i];
    const dx = d.x - px;
    const dy = d.y - py;
    if (dx * dx + dy * dy <= TOO_CLOSE * TOO_CLOSE) return true;
  }
  return false;
}
