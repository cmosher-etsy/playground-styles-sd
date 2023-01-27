const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const useSCSSFormat = (args) => {
  const { outputReferences } = args.options;

  return (
    fileHeader({ file: args.file }) +
    formattedVariables({
      format: "sass",
      dictionary: args.dictionary,
      outputReferences,
      formatting: {
        suffix: " !default;",
      },
    }) +
    "\n"
  );
};

module.exports = useSCSSFormat;
