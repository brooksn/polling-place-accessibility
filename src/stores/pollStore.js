const store = {};

store.values = {
  ppid: null,
  userPpid: null,
  ppLat: null,
  ppLong: null,
  ppName: null,
  ppAddress: null
};

store.countObservers = 0;

store.observers = new Set();

store.setPPID = function(p) {
  store.values.ppid = p;
  this.onChange();
};
store.setVals = function(o) {
  for (var key in o) {
    if (store.hasOwnProperty(key)) store[key] = o[key];
  }
  this.onChange();
};

store.observeChanges = function(fn){
  this.observers.add(fn);
};
store.unobserveChanges = function(fn){
  this.observers.delete(fn);
};

store.onChange = function(){
  this.observers.forEach(function(observer){
    observer(store.values);
  });
};

export default store;
