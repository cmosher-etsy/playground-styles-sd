module.exports = {
  source: [`assets/tokens/**/*.json`],

  // custom token transforms
  transform: {
    "color/useDarkValue": require('./transforms/useDarkValue'),
  },

  // custom output file formats
  format: {
    scssFormat: require('./formats/useSCSSFormat'),
    cssDarkThemeFormat: require('./formats/useCSSDarkThemeFormat'),
    flutterMaterialColorFormat: require('./formats/useFlutterMaterialColorFormat'),
  },

  platforms: {

    /**
     * CSS Variables
     */
    css: {
      transformGroup: `css`,
      buildPath: "dist/web/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
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
        "size/rem",
      ],
      files: [
        {
          destination: "variables-dark.css",
          format: "cssDarkThemeFormat",
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
      transformGroup: `scss`,
      buildPath: "dist/web/",
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
        "size/rem",
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
      transformGroup: `flutter`,
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
          format: "flutterMaterialColorFormat",
          filter: (token) => token.value.indexOf("Color(") === 0,
        },
      ],
    },
  },
};
