module.exports = {
  type: "value",
  transitive: true,
  matcher: (token) => {
    return typeof token.value === "string" && token.value.indexOf("calc(") === 0;
  },
  transformer: (token) => {
    const value = token.value;
    const sanitizedValue = value.substring(0, value.length - 1).replaceAll("calc(", "");
    return sanitizedValue;
  }
}