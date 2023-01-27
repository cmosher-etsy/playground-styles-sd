module.exports = {
  type: "value",
  transitive: true,
  matcher: (token) => token.darkValue !== undefined, 
  transformer: (token) => {
    token.original.value = token.original.darkValue;
    return token.darkValue;
  }
}