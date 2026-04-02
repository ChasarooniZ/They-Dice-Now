export const MODULE_ID = "dicearooni";

export const COLORS = {
  DAMAGE_TYPES: {
    bludgeoning: "#3c3c3c",
    piercing: "#3c3c3c",
    slashing: "#3c3c3c",
    acid: "#007300",
    bleed: "#99001a",
    chaotic: "#a600a6",
    cold: "#2f2fa6",
    electricity: "#B8860B",
    evil: "#4B0082",
    fire: "#a62f00",
    force: "#6300aa",
    good: "#9d730a",
    lawful: "#402600",
    mental: "#191970",
    poison: "#5b7332",
    healing: "#90EE90",
    sonic: "#008B8B",
    spirit: "#5a5585",
    vitality: "#ffffe0",
    void: "#00001f",
    precision: "#f5bf03",
  },
  BASIC: {
    WHITE: "#ffffff",
    BLACK: "#000000",
  },
  GHOST_DIE: "#8a8a8a",
  CRIT_SUCCESS: "#008000",
  CRIT_FAILURE: "#ff0000",
  HIGH_ROLL: "#17dfc4",
};

export const WHITE = Color.fromString(COLORS.BASIC.WHITE);

export const BLACK = Color.fromString(COLORS.BASIC.BLACK);

export const MAX_ROLLS = { d4: 4, d6: 6, d8: 8, d10: 10, d12: 12 };

export const IN_WINDOW = {
  X: {
    MIN: 0.05,
    MAX: 0.75,
  },
  Y: {
    MIN: 0.05,
    MAX: 0.95,
  },
};

export const SUPPORTED_DICE = new Set(["d4", "d6", "d8", "d10", "d12", "d20"]);

export const SFX = {
  DICE: {
    SINGLE: {
      VELVET: [
        "modules/dicearooni/assets/sfx/dice/velvet/velvet_1.ogg",
        "modules/dicearooni/assets/sfx/dice/velvet/velvet_2.ogg",
        "modules/dicearooni/assets/sfx/dice/velvet/velvet_3.ogg",
        "modules/dicearooni/assets/sfx/dice/velvet/velvet_4.ogg",
      ],
    },
    FEW: {
      WOOD: [
        "modules/dicearooni/assets/sfx/dice/wood/few_1.ogg",
        "modules/dicearooni/assets/sfx/dice/wood/few_2.ogg",
        "modules/dicearooni/assets/sfx/dice/wood/few_3.ogg",
      ],
    },
    MANY: {
      WOOD: [
        "modules/dicearooni/assets/sfx/dice/wood/many_1.ogg",
        "modules/dicearooni/assets/sfx/dice/wood/many_2.ogg",
        "modules/dicearooni/assets/sfx/dice/wood/many_3.ogg",
        "modules/dicearooni/assets/sfx/dice/wood/many_4.ogg",
      ],
    },
  },
};
