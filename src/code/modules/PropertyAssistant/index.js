import { scrapProperties } from '../ArticlePropertyScraper';
import arrayContains from '../arrayContains';

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
        .sort((a, b) => properties[a] === properties[b] ? 0 : (properties[a] > properties[b] ? 1 : -1))
        .shift();

    const property = propertyDef.find(item => item.name === mostImportant);

    return property;
};

export const findArticlesWithProperties = function(articleList, properties, propertyDef) {
    articleList.filter(article => {
        const articleProperties = scrapProperties({ article, propertyDef });

        arrayContains(articleProperties, properties);
    });
};
