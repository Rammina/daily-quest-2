module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'css'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  moduleNameMapper: {      
     "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};