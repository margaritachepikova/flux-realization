const STATE = 'state';
export default class Store {
    constructor() {
        this.listeners = {};
        this.state = typeof window.localStorage[STATE] !== 'undefined' ? JSON.parse(window.localStorage[STATE]) : {};
    }

    setState (newState) {
        this.state = newState;
        window.localStorage[STATE] =  JSON.stringify(this.state);
    };

    addListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    removeListener(callback) {
        this.listeners.forEach(() => {
            const calbackIndex = this.listeners.indexOf(callback);
            this.listeners.splice(calbackIndex, 1);
        });
    }

    trigger(event) {
        const eventListeners = this.listeners[event];

        for (let i = 0; i < eventListeners.length; i++) {
            eventListeners[i].call(this, this.state);
        }
    }
}
