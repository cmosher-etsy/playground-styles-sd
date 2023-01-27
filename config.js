module.exports = {
  source: [`assets/tokens/**/*.json`],

  // custom token transforms
  transform: {
    "color/useDarkValue": require("./transforms/useDarkValue"),
  },

  // custom output file formats
  format: {
    cssFormat: require("./formats/cssFormat")({ dataSelector: "" }),
    cssFormatDark: require("./formats/cssFormat")({ dataSelector: "[data-theme=dark]" }),
    scssFormat: require("./formats/scssFormat")(),
    flutterMaterialColorFormat:
      require("./formats/flutterMaterialColorFormat")({ className: "CollageColor" }),
    flutterMaterialColorFormatDark:
      require("./formats/flutterMaterialColorFormat")({ className: "CollageColorDark" }),
  },

  platforms: {
    /**
     * CSS Variables
     */
    css: {
      buildPath: "dist/web/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "time/seconds",
        "content/icon",
      ],
      files: [
        {
          destination: "variables.css",
          format: "cssFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    cssDark: {
      buildPath: "dist/web/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/useDarkValue",
        "color/css",
        "time/seconds",
        "content/icon",
      ],
      files: [
        {
          destination: "variables-dark.css",
          format: "cssFormatDark",
          options: {
            outputReferences: true,
          },
          filter: (token) => token.darkValue !== undefined,
        },
      ],
    },

    /**
     * SCSS Variables
     */
    scss: {
      buildPath: "dist/web/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "time/seconds",
        "content/icon",
      ],
      files: [
        {
          destination: "_variables.scss",
          format: "scssFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    scssDark: {
      buildPath: "dist/web/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/useDarkValue",
        "color/css",
        "time/seconds",
        "content/icon",
      ],
      files: [
        {
          destination: "_variables-dark.scss",
          format: "scssFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },

    /**
     * Flutter .dart files
     */
    dart: {
      buildPath: "dist/flutter/",
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "color/hex8flutter",
        "size/flutter/remToDouble",
        "content/flutter/literal",
        "asset/flutter/literal",
        "font/flutter/literal",
      ],
      files: [
        {
          destination: "collage_color.dart",
          format: "flutterMaterialColorFormat",
          filter: (token) => token.value.indexOf("Color(") === 0,
        },
      ],
    },
    dartDark: {
      buildPath: "dist/flutter/",
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "color/useDarkValue",
        "color/hex8flutter",
        "size/flutter/remToDouble",
        "content/flutter/literal",
        "asset/flutter/literal",
        "font/flutter/literal",
      ],
      files: [
        {
          destination: "collage_color_dark.dart",
          format: "flutterMaterialColorFormatDark",
          filter: (token) => token.value.indexOf("Color(") === 0,
        },
      ],
    },
  },
};
