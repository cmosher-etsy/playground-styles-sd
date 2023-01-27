module.exports = {
  type: "value",
  transitive: false,
  matcher: () => {
    return true;
  },
  transformer: (token) => {
    if (typeof token.value !== "string" || token.value.length === 0) {
      return token.value;
    }

    const isNumeric = !isNaN(token.value) && !isNaN(parseFloat(token.value));
    const isColor = token.value.indexOf("Color(") === 0;
    const isString = token.value.charAt(0) === "\"";

    if (isNumeric || isColor || isString) {
      return token.value;
    } else {
      return `"${token.value}"`;
    }
  },
};
