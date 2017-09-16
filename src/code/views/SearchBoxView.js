import '../modules/ArrayAll';

import NetworkRequest from 'application-frame/core/NetworkRequest';
import ViewController from '@af-modules/databinding/prototypes/ViewController';

import { SelectedProperties } from '../SelectedProperties';
import { configureGrammar, parseSearchQuery } from '../modules/SearchParser';
import ActionChain from '../ActionChain';
import AssistantChatView from './AssistantChatView';

const { create } = Object;

const SearchBoxView = {

    template: 'search-box',

    searchResults: null,

    init() {
        this.constructor();
        this.createOnSearchChain();

        [create(NetworkRequest).constructor('./data/propertyTypes.json', {type: 'json'}),
            create(NetworkRequest).constructor('./data/propertyValues.json', {type: 'json'})]
        .map(request => request.send())
            .all(promises => Promise.all(promises))
            .then(([types, values]) => {
                configureGrammar({
                    fillWords: ['as', 'with', 'like', 'a'],
                    types,
                    values,
                });
            });
    },

    selectedProperties: SelectedProperties,
    onSearchChain: null,

    createOnSearchChain() {
        this.onSearchChain = ActionChain().stage(event => {
            return new Promise((resolve) => setTimeout(() => resolve(event), 100));
        }).stage(event => {
            const searchText = event.target.value;
            const result = parseSearchQuery(searchText);

            const selected = result.reduce((map, item) => {
                if (!map[item.type]) {
                    map[item.type] = [];
                }

                map[item.type].push(item['name']);

                return map;
            }, {});

            this.selectedProperties.fill(selected);
        }).stage(() => {
            return new Promise(r => setTimeout(r, 100));
        }).stage(() => {
            AssistantChatView.startSession();
        });
    },

    onSearch(event) {
        this.onSearchChain.feed(event);
    },

    __proto__: ViewController,
};

export default SearchBoxView;
