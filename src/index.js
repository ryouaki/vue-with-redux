import { createStore, combineReducers, applyMiddleware } from 'redux';

export default {
  install: (Vue) => {
    Vue.mixin({
      beforeCreate: reduxMixin
    })
  }
};

function reduxMixin() {
  if (this.$root.$options.store) {
    this.dispatch = (action) => {
      if (typeof action === 'function') {
        action(this.dispatch.bind(this), this.$root.$options.store.getState);
      } else {
        this.$root.$options.store.dispatch(action);
        updateState.call(this);
      }
    };
  } 
}

function updateState() {
  if (this.mapReduxState) {
    const state = this.mapReduxState(this.$root.$options.store.getState());
    Object.keys(state).forEach( (prop) => {
      this.$set(this, prop, state[prop]);
    })
  }
}

export function makeReduxStore(reducers, middlewares) {
  const reduces = combineReducers(reducers);
  let _middleware = undefined;
  if (middlewares && Array.isArray(middlewares)) {
    _middleware = applyMiddleware(...middlewares);
  }
  let store = createStore(reduces, _middleware);
  return store;
}
