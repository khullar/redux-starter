const counter = (state = 0, action) => {

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

//This is our own implementation of the Redux Store.
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  dispatch({});

  return { getState, dispatch, subscribe };

}

//The store binds together the three principles of Redux. 
//It holds the current application's state object. 
//It lets you dispatch actions. 
//When you create it, you need to specify the reducer that tells how state is updated with actions.
store = createStore(counter);


//The store has three important methods.
//getState --> Retrieves the current state of the Redux store.
//dispatch --> Lets you dispatch actions to change the state of your application.
//subscribe --> Lets you register a callback that the Redux store will call any time an action has been dispatched.

const render = () => {
    document.body.innerText = store.getState();
};

store.subscribe(render);

document.addEventListener('DOMContentLoaded', render);

document.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
});
