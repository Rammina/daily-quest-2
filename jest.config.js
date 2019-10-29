module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "css"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    ".+\\.(css|less|scss|sss|styl|png|jpg|jpeg|svg|ttf|woff|woff2)?$":
      "jest-transform-stub"
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sss|styl|png|jpg|jpeg|svg|ttf|woff|woff2)?$":
      "jest-transform-stub"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};
