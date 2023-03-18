module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["prettier", "react", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
