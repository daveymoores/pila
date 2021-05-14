export const colorPalette = {
  blue: "#2E32DB",
  grey_blue: "#3581b8",
  dark_blue: "#1d2430",
  night_blue: "#141921",
  green: "#56B3AE",
  light_green: "#6BEAC9",
  yellow: "#FFE06E",
  grey: "#6e7a8d",
  periwinkleCrayola: "#D5DCF9",
  redCrayola: "#F52F57",
  white: "#FFFFFF",
};

export const fontWeights = {
  bold: "500",
  normal: "400",
};

const pila = {
  name: "pila",
  rounding: 10,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: colorPalette.blue,
        light: colorPalette.blue,
      },
      "brand-dark": {
        light: "#2427B4",
      },
      background: {
        dark: "#1D2430",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#1D2430",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#1D2430",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#6E7A8D",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#6E7A8D",
      },
      border: {
        dark: "#6E7A8D",
        light: "#A1A7BF",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#F52F57",
      "status-warning": "#FFE06E",
      "status-ok": "#6BEAC9",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      focus: "#D5DCF9",
    },
    font: {
      family:
        "Rubik,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "10px",
      },
    },
    drop: {
      border: {
        radius: "10px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px",
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px",
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "384px",
          xlarge: "768px",
          full: "100%",
        },
      },
      medium: {
        value: 1536,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "12px",
      weight: 500,
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
  button: {
    border: {
      width: "0px",
      radius: "10px",
    },
    padding: {
      vertical: "20px",
      horizontal: "22px",
    },
  },
  checkBox: {
    check: {
      radius: "10px",
    },
    toggle: {
      radius: "24px",
      size: "48px",
    },
    size: "24px",
  },
  radioButton: {
    size: "24px",
  },
  select: {
    extend: {
      fontSize: "16px",
    },
    container: {
      text: { size: "small" },
    },
  },
  menu: {
    extend: `
          font-size: 16px;
          font-weight: ${fontWeights.bold};
      `,
    icons: {
      color: "#1D2430",
    },
  },
  formField: {
    border: {
      color: colorPalette.grey,
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      style: "solid",
      side: "all",
    },
    placeholder: {
      size: "16px",
    },
    content: {
      background: colorPalette.white,
      pad: "xlarge",
      size: "16px",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      background: colorPalette.white,
      size: "16px",
      margin: {
        vertical: "xsmall",
        horizontal: "none",
      },
    },
    help: {
      color: "dark-3",
      size: "16px",
      margin: {
        vertical: "xsmall",
        start: "none",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      weight: "500",
      size: "16px",
      margin: {
        bottom: "small",
        start: "none",
      },
    },
    round: "10px",
  },
  date: "2021-02-12T13:05:50.889Z",
  calendar: {
    small: {
      fontSize: "14px",
      lineHeight: 1.375,
      daySize: "27.43px",
    },
    medium: {
      fontSize: "18px",
      lineHeight: 1.45,
      daySize: "54.86px",
    },
    large: {
      fontSize: "30px",
      lineHeight: 1.11,
      daySize: "109.71px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "8px",
        size: "24px",
      },
      minute: {
        width: "4px",
        size: "12px",
      },
      second: {
        width: "3px",
        size: "9px",
      },
      size: {
        small: "72px",
        medium: "96px",
        large: "144px",
        xlarge: "216px",
        huge: "288px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "10px",
          height: 1.5,
        },
        small: {
          size: "14px",
          height: 1.43,
        },
        medium: {
          size: "18px",
          height: 1.375,
        },
        large: {
          size: "22px",
          height: 1.167,
        },
        xlarge: {
          size: "26px",
          height: 1.1875,
        },
        xxlarge: {
          size: "34px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      "1": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "38px",
          height: "46px",
          maxWidth: "600px",
        },
        medium: {
          size: "42px",
          height: "56px",
          maxWidth: "auto",
        },
        large: {
          size: "82px",
          height: "88px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "114px",
          height: "120px",
          maxWidth: "auto",
        },
      },
      "2": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "30px",
          height: "36px",
          maxWidth: "auto",
        },
        medium: {
          size: "42px",
          height: "48px",
          maxWidth: "auto",
        },
        large: {
          size: "54px",
          height: "60px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "66px",
          height: "72px",
          maxWidth: "auto",
        },
      },
      "3": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "26px",
          height: "32px",
          maxWidth: "auto",
        },
        medium: {
          size: "34px",
          height: "40px",
          maxWidth: "auto",
        },
        large: {
          size: "42px",
          height: "48px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "50px",
          height: "56px",
          maxWidth: "auto",
        },
      },
      "4": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "22px",
          height: "28px",
          maxWidth: "auto",
        },
        medium: {
          size: "26px",
          height: "32px",
          maxWidth: "auto",
        },
        large: {
          size: "30px",
          height: "36px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "34px",
          height: "40px",
          maxWidth: "auto",
        },
      },
      "5": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "18px",
          height: "26px",
          maxWidth: "auto",
        },
        medium: {
          size: "18px",
          height: "26px",
          maxWidth: "auto",
        },
        large: {
          size: "18px",
          height: "26px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "18px",
          height: "26px",
          maxWidth: "auto",
        },
      },
      "6": {
        font: {
          weight: fontWeights.bold,
        },
        small: {
          size: "14px",
          height: "20px",
          maxWidth: "auto",
        },
        medium: {
          size: "14px",
          height: "20px",
          maxWidth: "auto",
        },
        large: {
          size: "14px",
          height: "20px",
          maxWidth: "auto",
        },
        xlarge: {
          size: "14px",
          height: "20px",
          maxWidth: "auto",
        },
      },
    },
    font: {
      family:
        "fontspring_demo_-_greycliffBd,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
    },
  },
  paragraph: {
    xsmall: {
      size: "14px",
      height: "22px",
      maxWidth: "auto",
    },
    small: {
      size: "16px",
      height: "24px",
      maxWidth: "auto",
    },
    medium: {
      size: "18px",
      height: "26px",
      maxWidth: "auto",
    },
    large: {
      size: "24px",
      height: "32px",
      maxWidth: "auto",
    },
    xlarge: {
      size: "28px",
      height: "36px",
      maxWidth: "auto",
    },
    xxlarge: {
      size: "34px",
      height: "42px",
      maxWidth: "auto",
    },
  },
  text: {
    xsmall: {
      size: "14px",
      height: "20px",
      maxWidth: "auto",
    },
    small: {
      size: "16px",
      height: "22px",
      maxWidth: "auto",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "auto",
    },
    large: {
      size: "22px",
      height: "28px",
      maxWidth: "auto",
    },
    xlarge: {
      size: "26px",
      height: "32px",
      maxWidth: "auto",
    },
    xxlarge: {
      size: "34px",
      height: "40px",
      maxWidth: "auto",
    },
  },
  scale: 1,
  accordion: {
    icons: {
      color: colorPalette.dark_blue,
    },
    heading: {
      level: "5",
      size: "18px",
    },
  },
};

export default pila;
