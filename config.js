// config.js
const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

function setValueToDarkValue(token) {
  if (token && token.darkValue && token.original && token.original.darkValue) {
    const alteredToken = { ...token };
    alteredToken.value = token.darkValue;
    alteredToken.original.value = token.original.darkValue;
    return alteredToken;
  } else {
    return token;
  }
}

/**
 * This function will wrap a built-in format and replace `.value` with `.darkValue`
 * if a token has a `.darkValue`.
 * @param {String} format - the name of the built-in format
 * @returns {Function}
 */
function darkCSSVariables(args) {
  // Override each token's `value` with `darkValue`
  const dictionary = Object.assign({}, args.dictionary);
  dictionary.allTokens = args.dictionary.allTokens.map(setValueToDarkValue);
  dictionary.allProperties =
    args.dictionary.allProperties.map(setValueToDarkValue);

  const { outputReferences } = args.options;
  return (
    fileHeader({ file: args.file }) +
    "[data-theme=dark]:root {\n" +
    formattedVariables({
      format: "css",
      dictionary,
      outputReferences,
    }) +
    "\n}\n"
  );
}

function darkSCSSVariables(args) {
  // Override each token's `value` with `darkValue`
  const dictionary = Object.assign({}, args.dictionary);
  dictionary.allTokens = args.dictionary.allTokens.map(setValueToDarkValue);
  dictionary.allProperties =
    args.dictionary.allProperties.map(setValueToDarkValue);

  // Use the built-in format but with our customized dictionary object
  // so it will output the darkValue instead of the value
  return StyleDictionary.format["scss/variables"]({ ...args, dictionary });
}

module.exports = {
  source: [`assets/tokens/**/*.json`],

  // custom formats
  format: {
    cssDark: darkCSSVariables,
    scssDark: darkSCSSVariables,
  },

  platforms: {
    css: {
      transformGroup: `css`,
      buildPath: "dist/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "variables-dark.css",
          format: "cssDark",
          options: {
            outputReferences: true,
          },
          filter: (token) => token.darkValue !== undefined,
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "dist/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
        },
        {
          destination: "_variables-dark.scss",
          format: "scssDark",
          options: {
            outputReferences: true,
          },
          filter: (token) => token.darkValue !== undefined,
        },
      ],
    },
    android: {
      transformGroup: "android",
      buildPath: "dist/android/",
      files: [
        {
          destination: "font_dimens.xml",
          format: "android/fontDimens",
        },
        {
          destination: "colors.xml",
          format: "android/colors",
        },
      ],
    },
    compose: {
      transformGroup: "compose",
      buildPath: "dist/compose/",
      files: [
        {
          destination: "StyleDictionaryColor.kt",
          format: "compose/object",
          className: "StyleDictionaryColor",
          packageName: "StyleDictionaryColor",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionarySize.kt",
          format: "compose/object",
          className: "StyleDictionarySize",
          packageName: "StyleDictionarySize",
          type: "float",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
      ],
    },
    ios: {
      transformGroup: "ios",
      buildPath: "dist/ios/",
      files: [
        {
          destination: "StyleDictionaryColor.h",
          format: "ios/colors.h",
          className: "StyleDictionaryColor",
          type: "StyleDictionaryColorName",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionaryColor.m",
          format: "ios/colors.m",
          className: "StyleDictionaryColor",
          type: "StyleDictionaryColorName",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionarySize.h",
          format: "ios/static.h",
          className: "StyleDictionarySize",
          type: "float",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
        {
          destination: "StyleDictionarySize.m",
          format: "ios/static.m",
          className: "StyleDictionarySize",
          type: "float",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
      ],
    },
    "ios-swift": {
      transformGroup: "ios-swift",
      buildPath: "dist/ios-swift/",
      files: [
        {
          destination: "StyleDictionary+Class.swift",
          format: "ios-swift/class.swift",
          className: "StyleDictionaryClass",
          filter: {},
        },
        {
          destination: "StyleDictionary+Enum.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionaryEnum",
          filter: {},
        },
        {
          destination: "StyleDictionary+Struct.swift",
          format: "ios-swift/any.swift",
          className: "StyleDictionaryStruct",
          filter: {},
          options: {
            imports: "SwiftUI",
            objectType: "struct",
            accessControl: "internal",
          },
        },
      ],
    },
    "ios-swift-separate-enums": {
      transformGroup: "ios-swift-separate",
      buildPath: "dist/ios-swift/",
      files: [
        {
          destination: "StyleDictionaryColor.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionaryColor",
          filter: {
            attributes: {
              category: "color",
            },
          },
        },
        {
          destination: "StyleDictionarySize.swift",
          format: "ios-swift/enum.swift",
          className: "StyleDictionarySize",
          filter: {
            attributes: {
              category: "size",
            },
          },
        },
      ],
    },
  },
};
