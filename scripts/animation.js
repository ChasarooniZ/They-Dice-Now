import { COLORS, CRIT_FAILURE, CRIT_SUCCESS, WHITE } from "./const.js";
import { getFinalCoordinates } from "./helpers.js";

export function rollDice(dieType, result, damageType) {
  const color = COLORS?.[damageType] ?? "#FFFFFF";

  let textColor = Color.fromString(color).mix(WHITE, 0.6).toString();
  if (dieType === "d20") {
    if (result === 1) {
      textColor = CRIT_FAILURE;
    } else if (result === 20) {
      textColor = CRIT_SUCCESS;
    }
  }

  const dieSize = 0.1;
  const textSize = 12;
  const aboveUI = false;

  const duration = 1 * 1000;
  const waitTime = 2 * 1000;
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
    .play();
}
