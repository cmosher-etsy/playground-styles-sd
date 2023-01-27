const StyleDictionary = require("style-dictionary");
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;

const useCSSDarkThemeFormat = (args) => {
  const { outputReferences } = args.options;

  return (
    fileHeader({ file: args.file }) +
    "[data-theme=dark]:root {\n" +
    formattedVariables({
      format: "css",
      dictionary: args.dictionary,
      outputReferences,
    }) +
    "\n}\n"
  );
};

module.exports = useCSSDarkThemeFormat;
