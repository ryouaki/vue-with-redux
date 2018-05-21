<template>
  <div>
    <button @click="clickHandler1">直接发送Action对象</button>
    <button @click="clickHandler2">发送同步Action对象</button>
    <button @click="clickHandler3">发送异步Action对象</button>
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
    mapReduxState(state) {
      return {
        reduce: state.reduce
      }
    },
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
