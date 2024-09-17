module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint", "jsx-a11y", "import", "prettier"],
  rules: {
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        useTabs: false,
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
    // 'import/prefer-default-export': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    "react/prop-types": "off",
    "no-console": "error",
    "react/jsx-props-no-spreading": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
    },
  },
};
