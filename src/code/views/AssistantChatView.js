import DataStorage from 'application-frame/core/DataStorage';
import ViewController from '@af-modules/databinding/prototypes/ViewController';

import { ArticleStore, restoreAllArticles } from '../ArticleStore';
import { SelectedProperties } from '../SelectedProperties';
import {
    getPossibleValues,
    suggestMostCommonPropType,
    suggestLeastCommonPropType,
    findBetterPropertyValue,
} from '../modules/PropertyAssistant';
import PropertyTypes from '../PropertyTypes';

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

    _options: null,

    messages: null,

    init() {
        this.constructor();
        this.messages = create(MessagesList).constructor();
        this.messages.when(this.scope.update.bind(this.scope));
        ArticleStore.when(list => {
            if (list.length === 0) {
                this.onNoArticlesFound();
            }
        });
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

    postUserMessage(text) {
        const message = {
            type: 'in',
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
        const currentArticleCount = ArticleStore.value.length;
        const unused = this.getUnusedProperties();

        if (!unused) {
            return;
        }

        this.postMessage(`We have ${currentArticleCount} articles matching your description.`);

        const result = suggestMostCommonPropType(ArticleStore.value, unused);

        if (result) {
            this.postMessage(`What kind of ${result.name} do you prefer?`);
            this.setOptions(getPossibleValues(result));
        }
    },

    onNoArticlesFound() {
        const currentTypes = Object.keys(this.selectedProperties.value)
            .map(type => PropertyTypes.find(prop => prop.name === type));

        const newArticleStore = create(DataStorage).constructor();

        restoreAllArticles(newArticleStore);

        const leastCommon = suggestLeastCommonPropType(newArticleStore.value, currentTypes);
        const possibleValues = getPossibleValues(leastCommon);
        const betterValue = findBetterPropertyValue(newArticleStore.value, possibleValues, leastCommon);

        this.postMessage('Unfortnatley we don\'t have any articles matching your description.');
        this.postMessage(`We how ever have ${betterValue.amount} articles of ${leastCommon.name} ${betterValue.value.name}`);
    },

    setOptions(optionsList) {
        this._options = optionsList;
    },

    onSelectOption(event, { item }) {
        if (item.type && item.name) {
            this.selectAttribute(item);
        }
    },

    selectAttribute(attributeValue) {
        const props = SelectedProperties.value;

        if (!props[attributeValue.type]) {
            props[attributeValue.type] = [];
        }

        props[attributeValue.type].push(attributeValue.name);

        SelectedProperties.fill(props);
        this.postUserMessage(attributeValue.name);
        this._options = null;
    },

    __proto__: ViewController,
};

export default AssistantChatView;
