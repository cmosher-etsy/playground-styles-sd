module.exports = {
  type: "value",
  transitive: false,
  matcher: (token) => {
    return typeof token.value === "string" && token.value.indexOf("px") !== -1;
  },
  transformer: (token) => {
    const value = token.value;
    const sanitizedValue = value.replaceAll("px", "");
    const isNumeric = !isNaN(sanitizedValue) && !isNaN(parseFloat(sanitizedValue));
    if (isNumeric) {
      return sanitizedValue;
    } else {
      return token.value;
    }
  }
}