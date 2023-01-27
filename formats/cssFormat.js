const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const cssFormat = (props) => {
  return (args) => {
    const { outputReferences } = args.options;

    return (
      fileHeader({ file: args.file }) +
      `${props.dataSelector}:root {\n` +
      formattedVariables({
        format: "css",
        dictionary: args.dictionary,
        outputReferences,
      }) +
      "\n}\n"
    );
  };
};

module.exports = cssFormat;
