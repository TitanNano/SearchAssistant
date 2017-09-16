const arrayContains = function(array, subset) {
    const result = array.some(item => {
        const subIndex = subset.findIndex(subItem => match(item, subItem));

        if (subIndex > -1) {
            subIndex.splice(subIndex, 1);
        }

        if (subset.length === 0) {
            return true;
        }
    });

    return result;
};

export default arrayContains;

const match = function(objectA, objectB) {
    const keys = (Object.keys(objectA).length > Object.keys(objectB).length) ?
        Object.keys(objectA) : Object.keys(objectB);

    return keys.reduce((state, key) => state && objectA[key] === objectB[key]);
};
