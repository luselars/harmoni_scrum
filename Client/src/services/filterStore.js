function Store(initialState = {}) {
  this.state = initialState;
}
Store.prototype.mergeState = function(partialState) {
  Object.assign(this.state, partialState);
};
Store.prototype.getState = function() {
  return this.state;
};

let filterStore = new Store();
export default filterStore;

/*
Brukes slik:

ReactDOM.render(
  <FirstComponent mergeState={filterStore.mergeState.bind(filterStore)} />,
  firstElement
  );


 */
