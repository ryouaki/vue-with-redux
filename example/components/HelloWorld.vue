<template>
  <div>
    <button @click="clickHandler1">Action Object</button>
    <button @click="clickHandler2">Sync Action</button>
    <button @click="clickHandler3">Async Action</button>
    <!-- <button @click="clickHandler4">shouldVueUpdate: {{shouldUpdate}}</button> -->
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
    clickHandler4() {
      this.shouldUpdate = false;
    },
    mapReduxState(state) {
      return {
        reduce: state.reduce
      }
    },
    shouldVueUpdate(newState, oldState) {
      // Undone 还没实现
      if (this.shouldUpdate) {
        return true;
      } else {
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
