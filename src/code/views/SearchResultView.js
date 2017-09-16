//import DataStorage from 'application-frame/core/DataStorage';
import ViewController from '@af-modules/databinding/prototypes/ViewController';
import { ArticleStore } from '../ArticleStore';

//const { create } = Object;

const SearchResultView = {

    template: 'search-results',

    searchResults: null,

    init() {
        this.constructor();
        this.searchResults = ArticleStore;
        this.searchResults.when(this.scope.update.bind(this.scope));
    },

    __proto__: ViewController,
};

export default SearchResultView;
