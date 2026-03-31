import { BLACK, COLORS, MAX_ROLLS, MODULE_ID, WHITE } from "./const.js";
import {
  getDieRollPoint,
  getFinalCoordinates,
  getLandingSpot,
  getWindowPositions,
  randomSign,
} from "./helpers.js";

export function rollDice(results, hidden, userColor) {
  const doGhostDie = game.settings.get(MODULE_ID, "dice.show-ghost-rolls");

  if (hidden && !doGhostDie) return;

  const seq = new Sequence();

  const dieSize = 0.1 * game.settings.get(MODULE_ID, "dice.size");
  const textSize = 18 * game.settings.get(MODULE_ID, "text.size");
  const delayBetween = game.settings.get(MODULE_ID, "dice.delay-between");
  const aboveUI = game.settings.get(MODULE_ID, "dice.show-above-ui");
  const avoidWindows = game.settings.get(MODULE_ID, "dice.avoid.windows");
  const avoidDice = game.settings.get(MODULE_ID, "dice.avoid.dice");
  const doBorder = game.settings.get(MODULE_ID, "dice.border.enabled");
  const diceBorderColor = game.settings.get(MODULE_ID, "dice.border.user-color")
    ? userColor.toString()
    : BLACK.toString();

  const duration = game.settings.get(MODULE_ID, "dice.roll-duration") * 1000;
  const waitTime = game.settings.get(MODULE_ID, "dice.display-duration") * 1000;

  let cnt = 0;
  const previousPoints = [];
  for (const roll of results) {
    const { value, active, die, type } = roll;
    let dieColor = COLORS.DAMAGE_TYPES?.[type] ?? userColor.toString();
    if ((hidden && doGhostDie) || !active) {
      dieColor = COLORS.GHOST_DIE;
    }
    let textColor = Color.fromString(dieColor).mix(WHITE, 0.8).toString();
    if (die === "d20") {
      if (value === 1) {
        textColor = COLORS.CRIT_FAILURE;
      } else if (value === 20) {
        textColor = COLORS.CRIT_SUCCESS;
      }
    } else if (MAX_ROLLS?.[die] === value) {
      textColor = COLORS.HIGH_ROLL;
    }

    const degrees = 3 * 360 * randomSign();

    const params = {};
    if (avoidWindows) params.windows = getWindowPositions();
    if (avoidDice) params.dice = previousPoints;

    const finalCoordinates = getFinalCoordinates();
    const centerCoordinates = getDieRollPoint(params);
    if (avoidDice) {
      previousPoints.push(centerCoordinates);
    }

    // {
    //   x: randomSign() * 0.3 * Math.random(),
    //   y: randomSign() * 0.3 * Math.random(),
    // };
    //getLandingSpot(); This makes it feel too rigid :S
    // const centerAnchor = {
    //   x: 0.5 + centerCoordinates.x,
    //   y: 0.5 + centerCoordinates.y,
    // };

    seq
      .effect()
      .locally()
      .delay(delayBetween * cnt)
      .zIndex(0)
      .file(`icons/svg/${die}-grey.svg`)
      .screenSpace()
      .screenSpaceAboveUI(aboveUI)
      .screenSpaceScale({ fitY: true, ratioX: true })
      .scale(dieSize)
      .randomRotation()
      .tint(dieColor)
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
      .screenSpaceAnchor(centerCoordinates)
      .duration(duration + waitTime)
      .fadeOut(250);

    if (doBorder) {
      seq.filter("Glow", {
        distance: 5,
        outerStrength: 5,
        innerStrength: 0,
        color: diceBorderColor,
        quality: 0.1,
      });
    }

    if (!hidden) {
      seq
        .effect()
        .locally()
        .delay(delayBetween * cnt)
        .zIndex(1)
        .delay(duration)
        .duration(waitTime)
        .screenSpace()
        .screenSpaceAboveUI(aboveUI)
        .screenSpaceAnchor(centerCoordinates)
        .scaleIn(0, 300)
        .text(String(value), {
          fill: textColor,
          fontFamily: "Arial Black",
          fontSize: textSize,
          dropShadow: true,
          strokeThickness: 4,
        })
        .fadeOut(250);
    }
    cnt++;
  }
  seq.play();
}
