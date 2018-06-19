import { createStore, combineReducers, applyMiddleware } from 'redux';

export default {
  install: (Vue) => {
    Vue.mixin({
      beforeCreate: reduxMixin
    })
  }
};

function reduxMixin() {
  const store = this.$root.$options;
  if (store) {
    const computeds = this.$options.computeds;
    const newState = this.mapReduxState(store.getState());
    
    this.dispatch = (action) => {
      let getState = store.getState;
      let dispatch = store.dispatch;
      if (typeof action === 'function') {
        action(this.dispatch.bind(this), getState);
      } else {
        dispatch(action);
        const newState = this.mapReduxState(getState());
        Object.keys(newState).forEach( (prop) => {
          this[prop] = newState[prop];
        })
      }
    };
    updateState.call(this);
  } 
}

function updateState() {
  if (this.mapReduxState && typeof this.mapReduxState === 'function') {
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
