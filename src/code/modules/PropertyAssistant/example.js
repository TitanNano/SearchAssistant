/* eslint-env node */
const Import = require('@std/esm')(module);

const { suggestMostCommonPropType } = Import('./index');

const products = require('../../../data/products.json');
const propertyTypes = require('../../../data/propertyTypes.json');

while (propertyTypes.length) {
    const result = suggestMostCommonPropType(products, propertyTypes);

    console.log(result);

    if (!result) {
        console.log(propertyTypes);
        break;
    }

    const index = propertyTypes.findIndex(prop => prop.name === result.name);

    propertyTypes.splice(index, 1);
}
