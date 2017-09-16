import NetworkRequest from 'application-frame/core/NetworkRequest';

const { create } = Object;

const types = [];

const request = create(NetworkRequest).constructor('./data/propertyTypes.json', { type: 'json' });

request.send().then(data => {
    types.push(...data);
});

export default types;
