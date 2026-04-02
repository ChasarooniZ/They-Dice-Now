import { rollDice } from "./animation.js";
import { getSFX } from "./helpers.js";

export function setupToolbeltSupport() {
  Hooks.on(
    "pf2e-toolbelt.rollSave",
    async ({ roll, message, rollMessage, target, data }) => {
      const results = [];
      for (const die of roll.dice) {
        for (const res of die.results) {
          results.push({
            value: res.result,
            active: res.active,
            die: "d20",
            type: "",
          });
        }
      }
      rollDice(results, false, game?.user?.color, getSFX(1));
    },
  );
  Hooks.on(
    "pf2e-toolbelt.rerollSave",
    async ({ oldRoll, newRoll, keptRoll, message, target, data }) => {
      const results = [];
      for (const die of newRoll.dice) {
        for (const res of die.results) {
          results.push({
            value: res.result,
            active: res.active,
            die: "d20",
            type: "",
          });
        }
      }
      rollDice(results, false, game?.user?.color, getSFX(1));
    },
  );
}
