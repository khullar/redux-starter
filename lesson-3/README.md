The pure functions are the functions whose returned value depends solely on the values of their arguments.

Pure functions do not have any observable side effects, such as network or database calls.

Also, pure functions do not modify the values passed to them.

On the opposite, impure functions may call the database or the network, they may have side effects, they may operate on the DOM, and they may override the values that you pass to them. 