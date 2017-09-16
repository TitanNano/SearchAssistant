//import DataStorage from 'application-frame/core/DataStorage';
import ViewController from '@af-modules/databinding/prototypes/ViewController';
import { SelectedProperties } from '../SelectedProperties';

//const { create } = Object;

const FiltersView = {

    template: 'filters',

    selectedProperties: null,

    selectedPropertiesList: [],

    init() {
        this.constructor();
        this.selectedProperties = SelectedProperties;
        this.selectedProperties.when(properties => {
            this.selectedPropertiesList = Object.keys(properties)
                .map(key => ({ name: key, values: properties[key]}));

            this.scope.update();
        });
    },

    notLast(list, index) {
        return !(list.length-1 === index);
    },

    __proto__: ViewController,
};

export default FiltersView;
