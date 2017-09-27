import NetworkRequest from 'application-frame/core/NetworkRequest';
import DataStorage from 'application-frame/core/DataStorage';

const { create } = Object;

const storage = create(DataStorage).constructor();
const request = create(NetworkRequest).constructor('./data/PropertyValues.json', { type: 'json' });

request.send().then(data => storage.fill(data));

export default storage;
