# Vuex-Redux
[中文版](readmeCN.md)<br/>
This is a plugin for Vue to work with Redux. Redux is very popular with React.js. And Vuex-Redux provide a way for you to let Vue work with Redux. This will be a defferent experience.

# Start

First you can install this library from npm

```shell
  npm install -save vuex-redux
```

# How to run the demo

```shell
  git clone https://github.com/ryouaki/vuex-redux.git
  npm install
  npm run serve
```

# Usage

This is the sample you need to do on your entry JavaScript file:
```js
  // entry.js
  ... // some import you need
  import VuexRedux from 'vuex-redux';
  import { makeReduxStore } from 'vuex-redux';
  import reduces from 'YOUR-REDUCERS';
  import middlewares from 'REDUX-MIDDLEWARES';

  Vue.use(VuexRedux);

  let store = makeReduxStore(reduces, [middlewares]);

  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')
```

This is the action demo:
```js
  export function test() {
    return {
      type: 'TEST'
    }
  }

  export function asyncTest() {
    return (dispatch, getState) => {
      setTimeout( () => {
        console.log('New:', getState());
        dispatch({type: 'TEST'});
        console.log('Old', getState());
      }, 100);
    }
  }
```

_**Note**: You do not need redux-thunk for vuex-redux. it work with async code._

This is the reducer demo: 
```js
  function reduce (state = { count: 0 }, action) {
    switch(action.type) {
      case 'TEST':
        state.count++;
        return state;
      default:
        return state;
    }
  }

  export default {
    reduce
  };
```

This is the demo for Vue Component:
```js
  <template>
    <div>
      <button @click="clickHandler1">Action Object</button>
      <button @click="clickHandler2">Sync Action</button>
      <button @click="clickHandler3">Async Action</button>
      <p>{{reduce.count}}</p>
    </div>
  </template>

  <script>
  import { test, asyncTest } from './../actions';

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    // you must initial the statetree which you subscribe from redux in data().
    data() {
      return {
        reduce: {}
      }
    },
    methods: {
      clickHandler1() {
        this.dispatch({type: 'TEST'});
      },
      clickHandler2() {
        this.dispatch(test());
      },
      clickHandler3() {
        this.dispatch(asyncTest());
      },
      // you must declare a mapReduxState to let vuex-redux know what state should be subscribed.
      // the parameter [ state ] is the root state of redux.
      mapReduxState(state) { 
        return {
          reduce: state.reduce
        }
      },
    }
  }
  </script>
```