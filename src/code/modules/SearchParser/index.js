
const config = {
    fillWords: null,
    types: null,
    values: null,
};

export const parseSearchQuery = function(queryText) {

    if (!config.fillWords || !config.types || !config.values) {
        return [];
    }

    const query = queryText.split(' ').filter(word => !config.fillWords.includes(word));

    const containedValues = query.map(word => (word in config.values) ? config.values[word] : null)
        .reduce((list, item) => list.concat(item), [])
        .filter((value, index, list) => !!value && list.indexOf(value) === index)
        .filter((value) => queryText.search(value.regex) > -1);

    return containedValues;
};

export const configureGrammar = function({ fillWords = [], types = [], values = [] } = {}) {

    config.fillWords = fillWords;
    config.types = types;
    config.values = values.reduce((container, value) => {
        let names = value.name.split(' ').map(item => item.toLowerCase());

        if (value.aliases) {
            names = names.concat(value.aliases.map(alias => alias.split(' '))
                .reduce((list, item) => list.concat(item), []));

            value.regex = new RegExp(`(${value.name.toLowerCase()}|${value.aliases.map(item => item.toLowerCase()).join('|')})`);
        } else {
            value.regex = new RegExp(`${value.name.toLowerCase()}`);
        }

        names.forEach(name => {
            if (!container[name]) {
                container[name] = [];
            }

            container[name].push(value);
        });

        return container;
    }, {});

    return config;
};
