export function registerSettings() {
  game.settings.register(MODULE_ID, "dice.border.enabled", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.border.enabled.name`,
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.border.enabled.hint`,
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "dice.show-above-ui", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.show-above-ui.name`,
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.show-above-ui.hint`,
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "dice.show-ghost-rolls", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.show-ghost-rolls.name`,
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.show-ghost-rolls.hint`,
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register(MODULE_ID, "dice.size", {
    name: game.i18n.localize(`${MODULE_ID}.module-settings.dice.size.name`),
    hint: game.i18n.localize(`${MODULE_ID}.module-settings.dice.size.hint`),
    scope: "world",
    config: true,
    default: 1,
    range: {
      min: 0,
      step: 0.1,
      max: 2,
    },
    type: Number,
  });

  game.settings.register(MODULE_ID, "text.size", {
    name: game.i18n.localize(`${MODULE_ID}.module-settings.text.size.name`),
    hint: game.i18n.localize(`${MODULE_ID}.module-settings.text.size.hint`),
    scope: "world",
    config: true,
    default: 1,
    range: {
      min: 0,
      step: 0.1,
      max: 2,
    },
    type: Number,
  });

  game.settings.register(MODULE_ID, "dice.roll-duration", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.roll-duration.name`,
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.roll-duration.hint`,
    ),
    scope: "world",
    config: true,
    default: 1,
    range: {
      min: 0,
      step: 0.25,
      max: 4,
    },
    type: Number,
  });

  game.settings.register(MODULE_ID, "dice.display-duration", {
    name: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.display-duration.name`,
    ),
    hint: game.i18n.localize(
      `${MODULE_ID}.module-settings.dice.display-duration.hint`,
    ),
    scope: "world",
    config: true,
    default: 2,
    range: {
      min: 0,
      step: 0.25,
      max: 10,
    },
    type: Number,
  });
}
