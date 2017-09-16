import ViewController from '@af-modules/databinding/prototypes/ViewController';

import { SelectedProperties } from '../SelectedProperties';
import PropertyTypes from '../PropertyTypes';
import { ArticleStore } from '../ArticleStore';
import { suggestMostCommonPropType } from '../modules/PropertyAssistant';

const { create } = Object;

const MessagesList = {

    _list: null,
    _callbacks: null,

    constructor() {
        this._list = [];
        this._callbacks = [];

        return this;
    },

    add(message) {
        this._list.push(message);

        this._callbacks.forEach(callback => callback(this._list));
    },

    when(callback) {
        this._callbacks.push(callback);
    },

    getItems() {
        return this._list;
    },

    get length() {
        return this._list.length;
    },

    set length(value) {
        this._list.length = value;
    }
};


const AssistantChatView = {
    template: 'assistant-chat',

    messages: null,

    init() {
        this.constructor();
        this.messages = create(MessagesList).constructor();
        this.messages.when(this.scope.update.bind(this.scope));
    },

    selectedProperties: SelectedProperties,

    startSession() {
        this.messages.length = 0;

        const primary = this.pickPrimary();
        const notPrimary = this.pickOthers();

        this.postMessage(`So you are looking for a ${notPrimary.join(' ')} ${primary.join(' ')}?`);
        this.generateNextSugestion();
    },

    pickPrimary() {
        const list = this.selectedProperties.value;
        return Object.keys(list)
            .filter(key => !!PropertyTypes.find(type => type.name === key).primary)
            .map(key => list[key].join(' '));
    },

    pickOthers() {
        const list = this.selectedProperties.value;

        return Object.keys(list)
            .filter(key => !PropertyTypes.find(type => type.name === key).primary)
            .map(key => list[key].join(' '));
    },

    postMessage(text) {
        const message = {
            type: 'out',
            text,
        };

        this.messages.add(message);
    },

    getUnusedProperties() {
        const list = this.selectedProperties.value;
        const unused = PropertyTypes.filter(prop => Object.keys(list).indexOf(prop.name) < 0);

        return unused;
    },

    generateNextSugestion() {
        const unused = this.getUnusedProperties();

        const result = suggestMostCommonPropType(ArticleStore.value, unused);
        const currentArticleCount = ArticleStore.value.length;

        this.postMessage(`We have ${currentArticleCount} Articles matching your description.`);
        this.postMessage(`What kind of ${result.name} do you prefer?`);
    },

    __proto__: ViewController,
};

export default AssistantChatView;
