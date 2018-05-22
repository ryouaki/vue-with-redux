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
      let getState = this.$root.$options.store.getState;
      let dispatch = this.$root.$options.store.dispatch;
      if (typeof action === 'function') {
        action(this.dispatch.bind(this), getState);
      } else {
        // const oldState = this.mapReduxState(getState());
        dispatch(action);
        const newState = this.mapReduxState(getState());
        // if ((this.shouldVueUpdate && 
        //   typeof this.shouldVueUpdate === 'function' && 
        //   this.shouldVueUpdate(newState, oldState)) || !this.shouldVueUpdate) {
        //   updateState.call(this);
        // } else {
          Object.keys(newState).forEach( (prop) => {
            this[prop] = newState[prop];
          })
        // }
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
