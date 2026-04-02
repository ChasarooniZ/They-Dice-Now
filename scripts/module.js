import { MODULE_ID } from "./const.js";
import {
  generatePoints,
  getDiceResults,
  getSFX,
  setupAPI,
  setupLandingSpots,
} from "./helpers.js";
import { registerSettings } from "./settings.js";
import { setupToolbeltSupport } from "./toolbelt-support.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  registerSettings();
  setupAPI();
  setupLandingSpots();
  generatePoints();
  Hooks.on("preCreateChatMessage", setChatMessageSFX);
  Hooks.on("createChatMessage", chatMessageDiceRoll);
  if (game?.toolbelt?.active) setupToolbeltSupport();
});

async function chatMessageDiceRoll(msg, _status, _userid) {
  const rolls = msg?.rolls;
  if (!rolls) return;
  const pf2eHide =
    !game.settings.get("pf2e", "metagame_showBreakdowns") &&
    !msg.hasPlayerOwner &&
    !msg.isOwner;
  getDiceResults(
    rolls,
    msg.whisper.length === 0 ||
      (msg.whisper.includes(game.user.id) && !pf2eHide),
    msg.user?.color,
  );
}

async function setChatMessageSFX(msg, _status, _userid) {
  if (game.settings.get(MODULE_ID, "dice.sfx.override")) {
    const rolls = msg?.rolls;
    if (msg?.rolls?.length > 0) {
      let cnt = 0;
      for (const roll of rolls) {
        for (const dice of roll.dice) {
          cnt += dice.number;
        }
      }
      const sfx = getSFX(cnt);
      await msg.updateSource({ sound: sfx });
    }
  }
}
