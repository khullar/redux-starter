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

const { createStore } = Redux;

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
