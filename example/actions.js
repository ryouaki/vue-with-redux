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
