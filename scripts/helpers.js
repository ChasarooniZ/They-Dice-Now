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
