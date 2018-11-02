export default class Dispatcher {
    constructor(store) {
        this.store = store;
        this.handlers = {};
    }

    register (handlers) {
        this.handlers = {
            ...this.handlers,
            ...handlers,
        };
    };

    dispatch ({ type, payload }) {
        const handler = this.handlers[type];
        if (typeof handler === 'function') {
            this.store.setState(handler(this.store.state, payload));
            this.store.trigger('changed');
        }
    };
}
