let fs = import("fs");

function getSCSSVariables() {
   return fs.readFileSync("./dist/scss/_variables.scss")
}

module.exports = { getSCSSVariables };