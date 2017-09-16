/* eslint-env node */

const load = require('@std/esm')(module);
const ArticlePropertyScraper = load('./index');
const fs = require('fs');

const result = ArticlePropertyScraper.scrapeFromArticles({
    articleList: require('../../../data/products.json'),
    propertyDef: require('../../../data/propertyTypes.json').filter(prop => prop.name !== 'price')
});

fs.writeFileSync('src/data/propertyValues.json', JSON.stringify(result), 'utf8');

console.log(result);
