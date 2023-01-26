let fs = import("fs");

function getSCSSVariables() {
  return fs.readFileSync("./dist/scss/_variables.scss");
}

function getSCSSDarkVariables() {
  return fs.readFileSync("./dist/scss/_variables-dark.scss");
}

function getCSSVariables() {
  return fs.readFileSync("./dist/scss/variables.css");
}

function getCSSDarkVariables() {
  return fs.readFileSync("./dist/scss/variables-dark.css");
}

module.exports = {
  getSCSSVariables,
  getSCSSDarkVariables,
  getCSSVariables,
  getCSSDarkVariables,
};
