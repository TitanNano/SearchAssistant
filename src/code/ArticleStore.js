import DataStorage from 'application-frame/core/DataStorage';
import NetworkRequest from 'application-frame/core/NetworkRequest';
import { scrapProperties } from './modules/ArticlePropertyScraper';
import PropertyTypes from './PropertyTypes';
import { SelectedProperties } from './SelectedProperties';

const { create } = Object;

const store = create(DataStorage).constructor();
let allArticles = null;

const request = create(NetworkRequest).constructor('./data/products.json');

request.type = 'json';

request.send().then(result => {
    allArticles = result;
    restoreAllArticles(store);
});

SelectedProperties.when(list => {
    filterArticles(store, list);
});

export const restoreAllArticles = function(store) {
    store.fill(JSON.parse(JSON.stringify(allArticles)));
};

export const filterArticles = function(store, sProperties) {
    const list = store.value;

    list.filter(article => {
        const properties = scrapProperties({ article, propertyDef: PropertyTypes });

        console.log(properties);
    });
};

export { store as ArticleStore };
