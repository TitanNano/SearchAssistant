export const scrapeFromArticles = function({ articleList, propertyDef }) {
    const props = {};

    articleList.forEach(article => scrapProperties({ article, propertyDef, props }));

    return Object.keys(props).map(key => props[key]);
};

export const scrapProperties = function({ article, propertyDef, props: globalProps }) {
    const props = globalProps || {};

    propertyDef.forEach(propertyDef => {
        if (article[propertyDef.name]) {
            const prop = { type: propertyDef.name, name: article[propertyDef.name] };

            collectProperty(props, prop);
        }
    });

    if (article.properties) {
        article.properties.forEach(prop => propertyDef.find(def => def.name === prop.name) && collectProperty(props, prop));
    }

    if (!globalProps) {
        return Object.keys(props).map(key => props[key]);
    }
};

const collectProperty = function(props, prop) {
    if (!props[prop.name]) {
        props[prop.name] = prop;
    } else if (props[prop.name] &&
        props[prop.name].type !== prop.type &&
        !props[`${prop.name}_${prop.type}`]) {
        props[`${prop.name}_${prop.type}`] = prop;
    }
};
