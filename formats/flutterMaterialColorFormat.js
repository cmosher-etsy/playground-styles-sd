const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const flutterMaterialColorFormat = (props) => {
  return (args) => {
    const { outputReferences } = args.options;

    const colors = {...args.dictionary};
    colors.allTokens = colors.allTokens.filter((token) => {
      return typeof token.value === "string" && token.value.indexOf("Color(") === 0;
    });
    colors.allProperties = colors.allProperties.filter((property) => {
      return typeof property.value === "string" && property.value.indexOf("Color(") === 0;
    });

    const nonColors = {...args.dictionary};
    nonColors.allTokens = nonColors.allTokens.filter((token) => {
      return !(typeof token.value === "string" && token.value.indexOf("Color(") === 0);
    });
    nonColors.allProperties = nonColors.allProperties.filter((property) => {
      return !(typeof property.value === "string" && property.value.indexOf("Color(") === 0);
    });

    let materialColorImportStatement = "import 'package:flutter/material.dart';\n\n";
    if (colors.allTokens.length === 0) {
      materialColorImportStatement = "";
    }

    let separatorStatement = "\n";
    if (colors.allTokens.length === 0) {
      separatorStatement = "";
    }

    return (
      fileHeader({ file: args.file }) +
      materialColorImportStatement +
      `class ${props.className} {\n` +
      formattedVariables({
        format: "dart",
        dictionary: colors,
        outputReferences,
        formatting: {
          prefix: "  static const Color ",
        },
      }) +
      separatorStatement +
      formattedVariables({
        format: "dart",
        dictionary: nonColors,
        outputReferences,
        formatting: {
          prefix: "  static const ",
        },
      }) +
      "\n}\n"
    );
  };
};

module.exports = flutterMaterialColorFormat;
