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
    meta: {
        type: 'suggestion',
        fixable: 'code',
        docs: {
            category: 'Stylistic Issues',
            description: 'require react dependency arrays to be sorted',
            recommended: false,
            url: 'https://github.com/stevensacks/eslint-plugin-sort-react-dependency-arrays'
        },
        schema: [] // no options
    },
    create: function(context) {
        return {
            CallExpression(node) {
                if (isDependencyArrayHook(node.callee)) {
                    const dependencies = node.arguments[1];

                    if (dependencies && dependencies.type === 'ArrayExpression' && dependencies.elements.length > 1) {
                        const sorted = [...dependencies.elements].sort((a, b) => (a.name < b.name ? -1 : 1));
                        const sortedNames = sorted.map((dep) => dep.name);

                        context.report({
                            node,
                            message: 'Sorting dependencies',
                            fix: function (fixer) {
                                return fixer.replaceText(dependencies, `[${sortedNames}]`);
                            }
                        });
                    }
                }
            }
        };
    }
};
