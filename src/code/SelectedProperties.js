import DataStorage from 'application-frame/core/DataStorage';

const { create } = Object;

const store = create(DataStorage).constructor();

store.fill({});


export { store as SelectedProperties };
