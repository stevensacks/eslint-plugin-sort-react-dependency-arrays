/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const HOOKS = ['useCallback', 'useEffect', 'useLayoutEffect', 'useMemo'];

function isDependencyArrayHook(node) {
    if (node.type === 'Identifier') {
        return HOOKS.includes(node.name);
    }
    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    create(context) {
        return {
            CallExpression(node) {
                if (isDependencyArrayHook(node.callee)) {
                    const dependencies = node.arguments[1];

                    if (
                        dependencies &&
                        dependencies.type === 'ArrayExpression' &&
                        dependencies.elements.length > 1
                    ) {
                        const currentDependencies = [...dependencies.elements];
                        const currentNames = currentDependencies.map(
                            (item) => item.name
                        );

                        const sortedDependencies = [
                            ...dependencies.elements,
                        ].sort((a, b) => (a.name < b.name ? -1 : 1));
                        const sortedNames = sortedDependencies.map(
                            (item) => item.name
                        );

                        if (String(currentNames) !== String(sortedNames)) {
                            context.report({
                                fix: (fixer) =>
                                    currentDependencies.map(
                                        (dependency, index) =>
                                            fixer.replaceText(
                                                dependency,
                                                sortedNames[index]
                                            )
                                    ),
                                message: 'Sort dependencies',
                                loc: dependencies.loc,
                            });
                        }
                    }
                }
            },
        };
    },
    meta: {
        docs: {
            category: 'Stylistic Issues',
            description: 'Sort React dependency arrays',
            recommended: false,
            url: 'https://github.com/stevensacks/eslint-plugin-sort-react-dependency-arrays',
        },
        fixable: 'code',
        schema: [],
        type: 'suggestion', // no options
    },
};
