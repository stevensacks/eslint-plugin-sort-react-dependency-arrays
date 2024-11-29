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

### Set locale
The code uses JavaScript's **localeCompare** function so on different environments the result can be different. To avoid
this issue specify the locale in your **.env** file.

To set locale you can use one of these environment variables:
* env.LANG
* env.LANGUAGE
* env.LC_ALL
* env.LC_MESSAGES;

**.env** file example:
```
LC_ALL=en_US.UTF-8
```
