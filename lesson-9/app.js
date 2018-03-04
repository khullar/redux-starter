const addCounter = (list) => {

  //Using push mutates list. This should be avoided
  //as this is side-effect making the reducer an impure function
  //list.push(0);
  //return list;

  //Instead of push, contact can be used as below.
  //Array.prototype.contact() returns a new array without modifying 
  //the original array.
  //return list.concat([0]);

  //Another option is to use the ES6 spread operator leading to more
  //consise syntax.
  return [...list, 0];
};

const removeCounter = (list, index) => {

  //Splice is a mutating method. So, should not be used 
  //in this scenario.
  //list.splice(index, 1);
  //return list;

  //One alternative is to use the slice() method
  //return list
  //  .slice(0, index)
  //  .concat(list.slice(index + 1));

  //The code above can be written more consisely
  //removing the function chain and using the 
  //ES6 spread operator as below.
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index) => {

  //Directly setting the incremented works 
  //but is mutable.
  //list[index]++;
  //return list;

  //With ES6 spread operator and slice, we can 
  //rewrite the array operations to be immutable.
  return [
    ...list.slice(0, index),
    ++list[index],
    ...list.slice(index + 1)
  ];
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);
  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [10, 20, 15];
  const listAfter = [10, 15];

  deepFreeze(listBefore);
  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
}

const testIncrementCounter = () => {
  const listBefore = [10, 15, 20];
  const listAfter = [10., 15, 21];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 2)
  ).toEqual(listAfter);
}

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed.');
