import { rollDice } from "./animation.js";
import { MODULE_ID } from "./const.js";

export function randomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

const offScreen = 0.05;

export function getFinalCoordinates() {
  const type = Math.floor(Math.random() * 3);
  if (type === 0) {
    // X large
    return {
      x: (offScreen + (Math.random() * offScreen) / 5) * randomSign(),
      y: Math.random() * offScreen * randomSign(),
    };
  } else if (type === 1) {
    // Y large
    return {
      y: (offScreen + (Math.random() * offScreen) / 5) * randomSign(),
      x: Math.random() * offScreen * randomSign(),
    };
  } else if (type === 2) {
    // both Large
    return {
      x: (offScreen + (Math.random() * offScreen) / 5) * randomSign(),
      y: (offScreen + (Math.random() * offScreen) / 5) * randomSign(),
    };
  }
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
  const landingSpots = [];
  const spotEnd = 0.3;
  const spotBegin = -0.3;
  const step = 0.05 * game.settings.get(MODULE_ID, "dice.size");
  let x = spotBegin;
  let y = spotBegin;
  while (x <= spotEnd) {
    y = spotBegin;
    while (y <= spotEnd) {
      landingSpots.push({ x, y });
      y += step;
    }
    x += step;
  }
  window.dicearooni.data.landingSpots = landingSpots;
  window.dicearooni.data.currentLandingSpots = Sequencer.Helpers.shuffle_array(
    window.dicearooni.data.landingSpots,
  );
}

export function getLandingSpot() {
  if (window.dicearooni.data.currentLandingSpots.length === 0) {
    window.dicearooni.data.currentLandingSpots =
      Sequencer.Helpers.shuffle_array(window.dicearooni.data.landingSpots);
  }
  return window.dicearooni.data.currentLandingSpots.pop();
}
