import { rollDice } from "./animation.js";
import { registerSettings } from "./settings.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  registerSettings();
  Hooks.on("createChatMessage", async function (msg, _status, userid) {
    const rolls = msg?.rolls;

    const results = [];

    if (rolls) {
      for (const roll of rolls ?? []) {
        if (roll.instances) {
          for (const instance of roll?.instances ?? []) {
            const type = instance.type;
            for (const die of instance?.dice ?? []) {
              //   console.log({ roll, instance, die });
              const dieType = `d${die.faces}`;
              results.push(
                ...(die?.results ?? []).map((res) => ({
                  value: res?.result,
                  active: res?.active,
                  die: dieType,
                  type: type,
                })),
              );
            }
          }
        } else {
          for (const die of roll?.dice ?? []) {
            // console.log({ roll, die });
            const dieType = `d${die.faces}`;
            results.push(
              ...(die?.results ?? []).map((res) => ({
                value: res?.result,
                active: res?.active,
                die: dieType,
                type: null,
              })),
            );
          }
        }
      }
    }
    console.log({ results });
    const visible =
      msg.whisper.length < 0 || msg.whisper.includes(game.user.id);
    for (const r of results) {
      rollDice(r.die, r.value, r.type, !visible);
    }
  });
});
