import plugin from "tailwindcss/plugin";

export default plugin(function ({ addUtilities, theme }) {
  addUtilities({
    ".text-H-28-B": {
      fontSize: theme("fontSize.28"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-20-B": {
      fontSize: theme("fontSize.20"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-20-M": {
      fontSize: theme("fontSize.20"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-18-B": {
      fontSize: theme("fontSize.18"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-18-M": {
      fontSize: theme("fontSize.18"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-16-B": {
      fontSize: theme("fontSize.16"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-T-16-M": {
      fontSize: theme("fontSize.16"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-SB-14-B": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-SB-14-M": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-SB-14-R": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.R"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-B-14-B": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.140"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-B-14-M": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.140"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-B-14-R": {
      fontSize: theme("fontSize.14"),
      fontWeight: theme("fontWeight.R"),
      lineHeight: theme("lineHeight.140"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-C-12-M": {
      fontSize: theme("fontSize.12"),
      fontWeight: theme("fontWeight.M"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
    ".text-C-12-B": {
      fontSize: theme("fontSize.12"),
      fontWeight: theme("fontWeight.B"),
      lineHeight: theme("lineHeight.120"),
      letterSpacing: theme("letterSpacing.normal"),
    },
  });
});
