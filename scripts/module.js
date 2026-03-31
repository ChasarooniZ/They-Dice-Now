import {
  generatePoints,
  getDiceResults,
  setupAPI,
  setupLandingSpots,
} from "./helpers.js";
import { registerSettings } from "./settings.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {
  registerSettings();
  setupAPI();
  setupLandingSpots();
  generatePoints();
  Hooks.on("createChatMessage", chatMessageDiceRoll);
});

async function chatMessageDiceRoll(msg, _status, _userid) {
  const start = performance.now();
  const rolls = msg?.rolls;
  if (!rolls) return;
  getDiceResults(
    rolls,
    msg.whisper.length === 0 || msg.whisper.includes(game.user.id),
    msg.user?.color,
  );
  const end = performance.now();
  console.log("MS", end - start);
}
