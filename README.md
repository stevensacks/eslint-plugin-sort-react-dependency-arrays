# eslint-plugin-sort-react-dependency-arrays
ESLint plugin to enforce alphanumerically sorted React hook dependency arrays.

Works with --fix.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-sort-react-dependency-arrays`:

```sh
npm install eslint-plugin-sort-react-dependency-arrays --save-dev
```

## Usage

Add `sort-react-dependency-arrays` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "sort-react-dependency-arrays"
    ]
}
```

Then enable the rule under the rules section.

```json
{
    "rules": {
        "sort-react-dependency-arrays/sort": "error"
    }
}
```
