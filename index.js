let fs = import("fs");

function getSCSSVariables() {
  return fs.readFileSync("./dist/web/_variables.scss");
}

function getSCSSDarkVariables() {
  return fs.readFileSync("./dist/web/_variables-dark.scss");
}

function getCSSVariables() {
  return fs.readFileSync("./dist/web/variables.css");
}

function getCSSDarkVariables() {
  return fs.readFileSync("./dist/web/variables-dark.css");
}

module.exports = {
  getSCSSVariables,
  getSCSSDarkVariables,
  getCSSVariables,
  getCSSDarkVariables,
};
