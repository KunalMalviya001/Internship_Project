import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

console.log("\n\nUS Number Validater\n");
let num : string = await rl.question("Enter Number :- ");

let reg = new RegExp(/^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/);
if(num.match(reg)){
    console.log("Varified US number");
}
else{
    console.log("Invalid US number");
}

rl.close();