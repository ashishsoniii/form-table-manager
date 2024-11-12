export type FormData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender: string;
  message: string;
  age: number;
};





/*
Notes 
type is a way to define the shape or structure of a value

type is a keyword in TypeScript that we can use to define the shape of data

type ErrorCode = string | number;
either string or number



see -> type vs interface
interface, similar to a type in terms of functionality but provides additional features like extension and implementation with classes.



Declaration Merging:

Interface allows declaration merging, meaning you can declare the same interface multiple times, and TypeScript will merge them into one.
Type does not support declaration merging. If you try to declare the same type multiple times, TypeScript will throw an error.
Example of Declaration Merging with Interface:

ts

interface User {
  name: string;
}

interface User {
  age: number;
}

// Merged into a single interface:
// interface User {
//   name: string;
//   age: number;
// }




interface can be extendede

interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}



// typoe can also be extend

type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
};




// we can combine class + interface

interface Person {
  name: string;
}

class Employee implements Person {
  name: string;
  employeeId: number;

  constructor(name: string, employeeId: number) {
    this.name = name;
    this.employeeId = employeeId;
  }
}



// when to use type vs interface

Use Interface when -
  1. Working with classes
  2. Extending and Merging
  3. Obejct-oriented design


Use type when 
  1. Working with multiple types |
  2. When I don’t need the declaration merging feature





*/