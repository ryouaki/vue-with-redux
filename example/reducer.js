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