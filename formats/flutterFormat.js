const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const flutterFormat = (props) => {
  return (args) => {
    const { outputReferences } = args.options;

    return (
      fileHeader({ file: args.file }) +
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

module.exports = flutterFormat;
