import Dispatcher from './Dispatcher.js';
import Store from './Store.js';

const store = new Store();
const dispatcher = new Dispatcher(store);

window.flux = {
    getState() {
        return store.state;
    },

    addActions(actions) {
        dispatcher.register(actions);
    },

    createAction(type, payloadCreator) {
        payloadCreator = typeof payloadCreator === 'function' ? payloadCreator : payload => payload;

        return (...args) => {
            const payload = payloadCreator(...args);
            const action = {
                type,
            };

            if (payload !== undefined) {
                action.payload = payload;
            }

            return dispatcher.dispatch(action);
        };
    },

    addListener(...args) {
        store.addListener(...args);
    },

    removeListener(callback) {
        store.removeListener(callback);
    },

    dispatch(...args) {
        dispatcher.dispatch(...args);
    }
};
