const { create } = Object;

const ActionChain = {
    _stages: null,
    _current: null,
    _coreId: null,
    _currentId: null,

    stage(callback) {
        this._stages.push(callback);

        return this;
    },

    feed(event) {
        const instance = create(this);

        this._coreId = window.performance.now();
        instance._currentId = this._coreId;
        instance._current = 0;

        instance._runStage(event);
    },

    _scheduleStage(currentValue) {
        if (currentValue && currentValue.then && typeof currentValue.then === 'function') {
            currentValue.then(this._runStage.bind(this));
        } else {
            Promise.resolve(currentValue).then(this._runStage.bind(this));
        }

        console.log(`stage ${this._current} has been scheduled!`);
    },

    _runStage(currentValue) {
        if (this._currentId !== this._coreId) {
            console.log(`${this._currentId} has been canceled by ${this._coreId}`);
            return;
        }

        const callback = this._stages[this._current];
        const newValue = callback(currentValue);

        this._current += 1;

        if (this._current === this._stages.length) {
            console.log('ActionChain completed', this);
            return;
        }

        this._scheduleStage(newValue);
    }
};

const craft = function() {
    const chain = create(ActionChain);

    chain._stages = [];
    chain.feed = chain.feed.bind(chain);

    return chain;
};

export default craft;
