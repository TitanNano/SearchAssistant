import '../modules/ArrayAll';

import ViewController from '@af-modules/databinding/prototypes/ViewController';

import { SelectedProperties } from '../SelectedProperties';
import { configureGrammar, parseSearchQuery } from '../modules/SearchParser';
import ActionChain from '../ActionChain';
import { TypesStorage } from '../PropertyTypes';
import PropertyValues from '../PropertyValues';
import AssistantChatView from './AssistantChatView';

const SearchBoxView = {

    template: 'search-box',

    searchResults: null,

    init() {
        this.constructor();
        this.createOnSearchChain();

        Promise.all([
            TypesStorage.once,
            PropertyValues.once,
        ]).then(([types, values]) => {
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
            return new Promise((resolve) => setTimeout(() => resolve(event), 500));
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
