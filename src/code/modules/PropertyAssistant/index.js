import { scrapProperties } from '../ArticlePropertyScraper';
import arrayContains from '../arrayContains';
import PropertyValues from '../../PropertyValues';
import { SelectedProperties } from '../../SelectedProperties';

export const suggestMostCommonPropType = function(articleList, propertyDef) {
    const properties = articleList.reduce((list, article) => {
        const props = scrapProperties({ article, propertyDef });

        props.forEach(prop => {
            if (!list[prop.type]) {
                list[prop.type] = 1;
            } else {
                list[prop.type] += 1;
            }
        });

        return list;
    }, {});

    const mostImportant = Object.keys(properties)
        .sort((a, b) => properties[a] === properties[b] ? 0 : (properties[a] > properties[b] ? -1 : 1))
        .shift();

    const property = propertyDef.find(item => item.name === mostImportant);

    return property;
};

/**
 * [description]
 * @param  {Array} articleList [description]
 * @param  {{ name: string, type: string}[]} properties  [description]
 * @param  {{ name: string }[]} propertyDef [description]
 * @return {Array}             [description]
 */
export const findArticlesWithProperties = function(articleList, properties, propertyDef) {
    return articleList.filter(article => {
        const articleProperties = scrapProperties({ article, propertyDef });

        arrayContains(articleProperties, properties);
    });
};

/**
 * [description]
 * @param  {Array} articleList  [description]
 * @param  {{ name: string }} propertyType [description]
 * @param  {{ name: string }[]} propertyDef  [description]
 * @return {boolean}              [description]
 */
export const findArticlesWithPropertyType = function(articleList, propertyType, propertyDef) {
    return articleList.filter(article => {
        const articleProperties = scrapProperties({ article, propertyDef });

        return !!articleProperties.find(articleProp => articleProp.type === propertyType.name);
    });
};

export const getPossibleValues = function(propertyType) {
    return PropertyValues.value.filter(value => {
        return value.type === propertyType.name;
    });
};

export const suggestLeastCommonPropType = function(articleList, propertyDef) {
    const properties = articleList.reduce((list, article) => {
        const props = scrapProperties({ article, propertyDef });

        props.forEach(prop => {
            if (!list[prop.type]) {
                list[prop.type] = 1;
            } else {
                list[prop.type] += 1;
            }
        });

        return list;
    }, {});

    const mostImportant = Object.keys(properties)
        .sort((a, b) => properties[a] === properties[b] ? 0 : (properties[a] > properties[b] ? 1 : -1))
        .shift();

    const property = propertyDef.find(item => item.name === mostImportant);

    return property;
};

export const findBetterPropertyValue = function(articleList, values, propertyDef) {
    const selected = JSON.parse(JSON.stringify(SelectedProperties.value));

    delete selected[propertyDef.name];

    // filter out current selection
    articleList = articleList.slice().filter(article => {
        const articleProps = scrapProperties({
            article,
            propertyDef: Object.keys(selected).map(type => ({ name: type }))
        });

        return Object.keys(selected).every(type =>
            selected[type].some(value =>
                !!articleProps.find(articleProp =>
                    articleProp.type === type && articleProp.name === value)));

    });

    // test all values
    const betterValue = values.map(value => {
        const amount = articleList.slice().filter(article => {
            const articleProps = scrapProperties({ article, propertyDef: [propertyDef] });

            return !!articleProps.find(prop => prop.type === propertyDef.name && prop.name === value.name);
        }).length;

        return { value, amount };
    }).sort((a, b) => a.amount === b.amount ? 0 : (a.amount > b.amount ? 1 : -1))
        .find(item => item.amount > 0);

    return betterValue;
};
