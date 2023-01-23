let fs = import("fs");

function getSCSSVariables() {
   return fs.readFileSync("./build/scss/_variables.scss")
}

module.exports = { getSCSSVariables };