// function add (a, b) {
//     return a + b;
// }

// console.log(add(3, 4));

// var toAdd=[9, 5];

// console.log(add(...toAdd));

// var groupA = ['Jen', 'Cory'];

// var groupB = ['Vikram'];

// var final = [3, ...groupA, ...groupB];

// console.log(final)

var person = ['Andrew', 25];
var personTwo = ['Jen', 29];

function Greeter (name , age) {
    console.log('Hi ' + name + '. You are ' + age);
}

Greeter(...person);

var names = ['Dung', 'Man'];
var final = ['Andrew', ...names];

final.forEach((name) => {
    console.log('Hi ' + name );
})