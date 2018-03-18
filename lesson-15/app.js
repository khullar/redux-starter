// Reducer composition pattern is so common in Redux that 
// there is a combineReducers function is provided by the Redux library.

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id, 
                text: action.text, 
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, 
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const { combineReducers } = Redux;

// combineReducers accepts an object which should contain the mapping
// of the state key with the corresponding reducer that handles the 
// part of the state under that key.

const todosApp = combineReducers({
    todos,
    visibilityFilter
});

// The reducer returned by combinedReducers() in the above code is
// equivalent to the reducer created by hand in the below code. 

// const todosApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos, 
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter, 
//             action
//         )
//     };
// };

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Implment MERN stack',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Implment MERN stack',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};


testAddTodo();
testToggleTodo();
console.log('All tests passed.');

const { createStore } = Redux;
const store = createStore(todosApp);

console.log('Initial state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching a ADD_TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
});

console.log('Current state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching a ADD_TODO');
store.dispatch({
    type: 'ADD_TODO',
    id: 1,
    text: 'Go Shopping'
});

console.log('Current state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching a TOGGLE_TODO');
store.dispatch({
    type: 'TOGGLE_TODO',
    id: 1,
});

console.log('Current state:');
console.log(store.getState());
console.log('---------------');

console.log('Dispatching a SET_VISIBILITY_FILTER');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED',
});

console.log('Current state:');
console.log(store.getState());
console.log('---------------');
