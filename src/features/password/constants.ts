export const PASSWORD_STRENGTH_CONFIG = {
  MAX_STRENGTH: 4,
  WEAK_THRESHOLD: 3,
  COLOR_THRESHOLDS: {
    WEAK: 33,
    MEDIUM: 66,
    STRONG: 100,
  },
  MESSAGES: {
    EMPTY: "Enter a password",
    VERY_WEAK: "Very weak",
    WEAK: "Weak",
    STRONG: "Strong",
    VERY_STRONG: "Very strong",
  },
} as const;
