const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const flutterMaterialColorFormat = (props) => {
  return (args) => {
    const { outputReferences } = args.options;

    return (
      fileHeader({ file: args.file }) +
      "import 'package:flutter/material.dart';\n\n" +
      `class ${props.className} {\n` +
      formattedVariables({
        format: "dart",
        dictionary: args.dictionary,
        outputReferences,
        formatting: {
          prefix: "  static const Color ",
        },
      }) +
      "\n}\n"
    );
  };
};

module.exports = flutterMaterialColorFormat;
