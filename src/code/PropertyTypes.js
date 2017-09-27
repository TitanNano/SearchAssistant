import NetworkRequest from 'application-frame/core/NetworkRequest';
import DataStorage from 'application-frame/core/DataStorage';

const { create } = Object;

const types = [];
const storage = create(DataStorage).constructor();
const request = create(NetworkRequest).constructor('./data/propertyTypes.json', { type: 'json' });

request.send().then(data => {
    types.push(...data);
    storage.fill(data);
});

export default types;

export { storage as TypesStorage };
