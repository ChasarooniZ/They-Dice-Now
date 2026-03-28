import {
  COLORS,
  CRIT_FAILURE,
  CRIT_SUCCESS,
  MODULE_ID,
  WHITE,
} from "./const.js";
import { getFinalCoordinates, randomSign } from "./helpers.js";

export function rollDice(dieType, result, damageType, hidden) {
  const color = COLORS?.[damageType] ?? "#FFFFFF";

  let textColor = Color.fromString(color).mix(WHITE, 0.6).toString();
  if (dieType === "d20") {
    if (result === 1) {
      textColor = CRIT_FAILURE;
    } else if (result === 20) {
      textColor = CRIT_SUCCESS;
    }
  }

  const dieSize = 0.1 * game.settings.get(MODULE_ID, "dice.size");
  const textSize = 12 * game.settings.get(MODULE_ID, "text.size");
  const aboveUI = game.settings.get(MODULE_ID, "dice.show-above-ui");
  const doBorder = game.settings.get(MODULE_ID, "dice.border.enabled");
  const doGhostDie = game.settings.get(MODULE_ID, "dice.show-ghost-rolls");
  if (hidden && doGhostDie) {
    color = "#8a8a8aff";
  } else if (hidden && !doGhostDie) {
    return;
  }

  const duration = game.settings.get(MODULE_ID, "dice.roll-duration") * 1000;
  const waitTime = game.settings.get(MODULE_ID, "dice.display-duration") * 1000;
  const degrees = 3 * 360 * randomSign();

  const finalCoordinates = getFinalCoordinates();
  const centerCoordinates = {
    x: randomSign() * 0.3 * Math.random(),
    y: randomSign() * 0.3 * Math.random(),
  };
  const centerAnchor = {
    x: 0.5 + centerCoordinates.x,
    y: 0.5 + centerCoordinates.y,
  };

  const seq = new Sequence()
    .effect()
    .locally()
    .zIndex(0)
    .file(`icons/svg/${dieType}-grey.svg`)
    .screenSpace()
    .screenSpaceAboveUI(aboveUI)
    .screenSpaceScale({ fitY: true, ratioX: true })
    .scale(dieSize)
    .randomRotation()
    .tint(color)
    .rotateIn(degrees, duration * 1.1, { ease: "easeOutSine" })
    .animateProperty("spriteContainer", "position.x", {
      from: finalCoordinates.x,
      to: 0,
      duration: duration,
      screenSpace: true,
      ease: "easeOutSine",
    })
    .animateProperty("spriteContainer", "position.y", {
      from: finalCoordinates.y,
      to: 0,
      duration: duration,
      screenSpace: true,
      ease: "easeOutSine",
    })
    .screenSpaceAnchor(centerAnchor)
    .duration(duration + waitTime)
    .fadeOut(250);

  if (doBorder) {
    seq.filter("Glow", {
      distance: 5,
      outerStrength: 5,
      color: 0x000000,
      quality: 0.1,
    });
  }

  if (!hidden) {
    seq
      .effect()
      .locally()
      .zIndex(1)
      .delay(duration)
      .duration(waitTime)
      .screenSpace()
      .screenSpaceAboveUI(aboveUI)
      .screenSpaceAnchor(centerAnchor)
      .scaleIn(0, 300)
      .text(String(result), {
        fill: textColor,
        fontFamily: "Arial Black",
        fontSize: textSize,
        dropShadow: true,
        strokeThickness: 4,
      })
      .fadeOut(250)
      .play();
  }
}
