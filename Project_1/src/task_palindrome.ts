import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
console.log('\n\n\t\tPalindrome Cheaker\n\n');
let str = await rl.question("Enter Value :- ");
str.trim();
let rev = str.split("").reverse();
let rev1 = rev.toString().replaceAll("," , "");
console.log(rev1);

if(str == rev1){
    console.log("Value is palindrome\n");
}
else{
    console.log("Value is not palindrome\n");
}

rl.close();