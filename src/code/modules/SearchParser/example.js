/* eslint-env node */

import { configureGrammar, parseSearchQuery } from './index';

const configResult = configureGrammar({
    fillWords: [
        'and', 'or', 'with', 'before',
        'under', 'around', 'on', 'of',
    ],
    types: require('../../../data/propertyTypes'),
    values: require('../../../data/propertyValues.json')
});

console.log(configResult);

const result = parseSearchQuery('red blue and Pastellgelb chucks 23 600ml Löffel');

console.log(result);
