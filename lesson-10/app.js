const toggleTodo = (todo) => {
    // This is the mutating version of the implemetation
    // and should be avoided.
    //todo.completed = !todo.completed;
    //return todo;

    // One way around the mutation is to create a new object
    // copying all properties and flipping the completed key.
    // However, this way is inefficient - what if more keys are
    // added to the object later on?
    //return {
    //    id: todo.id,
    //    text: todo.text,
    //    completed: !todo.completed
    //};

    // A better option is to use the Object.assign method which
    // is new to ES6. This will let you assign properties of several 
    // objets to a target object.
    //return Object.assign(
    //    {},
    //    todo,
    //    {
    //        completed: !todo.completed
    //    }
    //);

    // A slight variation on the above approach is to use the 
    // ...Object spread operator. This is not in ES6 but nominated
    // for ES7 and is supported by Babel with the relevant preset.
    return {
        ...todo,
        completed: !todo.completed
    };
};

const testToggleTodo = () => {

    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };

    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };

    deepFreeze(todoBefore);

    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
