// let arr  = [1,2,3,'a','a',3,];

// let arr1 = new Set(arr);

// console.log(arr1);

import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
console.log('\n\n\t\tDuplicate Remove\n\n');
let str = await rl.question("Enter Array (Give space or \",\" between Element) :- ");
str.trim();
let com_str: boolean = str.includes(",");

if(com_str){
    let str1 = str.split(",");
    let set2 = new Set(str1);
    console.log("After remove Duplicate:- ");
    console.log(set2);
}
else{
    let str1 = str.split(" ");
    let set2 = new Set(str1);
    console.log("After remove Duplicate:- ");
    console.log(set2);
}

rl.close();