module.exports = {
  source: [`assets/tokens/**/*.json`],

  // custom token transforms
  transform: {
    "useDarkValues": require("./transforms/useDarkValues"),
    "useImplicitCalcs": require("./transforms/useImplicitCalcs"),
    "useImplicitPixels": require("./transforms/useImplicitPixels"),
    "useExplicitStrings": require("./transforms/useExplicitStrings"),
  },

  // custom output file formats
  format: {
    cssFormat: require("./formats/cssFormat")({ dataSelector: "" }),
    cssFormatDark: require("./formats/cssFormat")({ dataSelector: "[data-theme=dark]" }),
    scssFormat: require("./formats/scssFormat")(),
    flutterFormat: require("./formats/flutterMaterialColorFormat")({ className: "Collage" }),
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
        "useDarkValues",
        "color/css",
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
        "useDarkValues",
        "color/css",
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
     * Figma JSON files
     */
    json: {
      buildPath: "dist/figma/",
      transforms: [
        "attribute/cti",
        "name/cti/pascal",
        "color/hex",
      ],
      files: [
        {
          destination: "variables.json",
          format: "json",
          options: {
            outputReferences: false,
          },
        },
      ],
    },
    jsonDark: {
      buildPath: "dist/figma/",
      transforms: [
        "attribute/cti",
        "name/cti/pascal",
        "useDarkValues",
        "color/hex",
      ],
      files: [
        {
          destination: "variables-dark.json",
          format: "json",
          options: {
            outputReferences: false,
          },
        },
      ],
    },

    /**
     * Flutter .dart files
     */
    dart: {
      buildPath: "dist/flutter/",
      transformGroup: "flutter",
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "useImplicitPixels",
        "useImplicitCalcs",
        "color/hex8flutter",
        "useExplicitStrings",
      ],
      files: [
        {
          destination: "collage.dart",
          format: "flutterFormat",
          filter: (token) => token.attributes.category !== "color",
        },
      ],
    },
    dartColors: {
      buildPath: "dist/flutter/",
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "color/hex8flutter",
      ],
      files: [
        {
          destination: "collage_color.dart",
          format: "flutterMaterialColorFormat",
          filter: (token) => token.attributes.category === "color",
        },
      ],
    },
    dartColorsDark: {
      buildPath: "dist/flutter/",
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "useDarkValues",
        "color/hex8flutter",
      ],
      files: [
        {
          destination: "collage_color_dark.dart",
          format: "flutterMaterialColorFormatDark",
          filter: (token) => token.attributes.category === "color",
        },
      ],
    },
  },
};
