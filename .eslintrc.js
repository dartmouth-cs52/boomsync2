module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [ 2, 2 ],
        "max-len": 0,
        "prefer-destructuring": 0,
        "linebreak-style": [ 2,"unix"],
        "strict": 0,
        "quotes": [2, "single"],
        "no-else-return": 0,
        "new-cap": [2, {"capIsNewExceptions": ["Router"]}],
        "no-console": 0,
        "import/no-unresolved": [2, { "caseSensitive": false } ],
        "no-unused-vars": [2, { "vars": "all", "args": "none" }],
        "no-underscore-dangle": 0,
        "arrow-body-style": 0,
        "no-nested-ternary": 1,
        "one-var": [2, { "uninitialized": "always", "initialized": "never" }],
        "one-var-declaration-per-line": [2, "initializations"],
        "max-len": [2, 200],
        "no-extra-parens": 0,
        "no-plusplus": 0,
        "no-param-reassign": [2, { "props": false }],
        "no-return-assign": [2, "except-parens"],
        "no-restricted-syntax": [ 0, "DebuggerStatement"],
        "no-debugger": 1,
        "no-eval": 1,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2,
        "react/prop-types": 0,
        "react/jsx-first-prop-new-line": 0,
        "react/jsx-filename-extension": 0,
        "react/prefer-stateless-function": 0,
        "jsx-a11y/media-has-caption": 0,
    }
};
