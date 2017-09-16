import Application from 'application-frame/core/Application';

import AssistantChatView from './views/AssistantChatView';
import FiltersView from './views/FiltersView';
import SearchBoxView from './views/SearchBoxView';
import SearchResultView from './views/SearchResultView';

/**
 * [App description]
 *
 * @extends Application
 */
const App = {
    name: 'Search Assistant Bot',
    version: '1.0.0',

    /**
     * [init description]
     *
     * @return {void} [description]
     */
    init() {
        this.constructor();

        SearchResultView.init();
        AssistantChatView.init();
        SearchBoxView.init();
        FiltersView.init();
    },

    __proto__: Application,
};

export default App;
