import * as readline from "node:readline/promises";
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let com_number = Math.floor(Math.random() * 101);

console.log("\n\n\t\t\tNumber Guessing Game\n\n");
while(true){
    let input = await rl.question("(Enter \"exit\" for exit)\n \n Enter the Guess Number :-  ");
    if(input == "exit"){
        exit();
    }
    let user_nember:number = parseInt(input);
    if(isNaN(user_nember)){
        console.log("\n\n ======>>  Enter a number  <<=======\n\n");
    }
    else{
        if(user_nember == com_number){
            console.log("\n\n\t\tYou Win the game\n\n");
            exit();
        }
        else if(user_nember>com_number){
            console.log("\n\n==>> Hint :  nummber is Smaller then you Guess");
        }
        else {
            console.log("\n\n==>> Hint :  nummber is Greater then you Guess");
        }
    }
}

rl.close();