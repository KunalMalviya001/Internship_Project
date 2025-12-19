import * as readline from "node:readline/promises";
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// 0 = Rock
// 1 = Paper
// 2 = scissor

console.log("\n===========================================\n\tRock Paper Scissor Game\n===========================================\n\n");
while(true){
    let com_number: number = Math.floor(Math.random() * 3) + 1;
    console.log("\nOption :- ");
    console.log("\n1.\t Rock ");
    console.log("2.\t Paper ");
    console.log("3.\t Scissor \n");

    let input = await rl.question('(Enter \"exit\" for exit)\n \nEnter Your Choise :- ');
    if(input == "exit"){
        exit();
    }
    let user_nember:number = parseInt(input);
    if(isNaN(user_nember)){
        console.log("\n\n ======>>  Enter a number  <<=======\n\n");
    }

    // Match Tie
    if( user_nember == com_number ){
        console.log("\n\n ======>>  Game Tie  <<=======\n\n");
    }

    // User == 1
    if(user_nember == 1 && com_number == 2 || user_nember == 2 && com_number == 3 || user_nember == 3 && com_number == 1){
        console.log("\n\n ======>>  You loss  <<=======\n\n");
    }
    if(user_nember == 1 && com_number == 3 || user_nember == 2 && com_number == 1 || user_nember == 3 && com_number == 2){
        console.log("\n\n ======>>  You Win  <<=======\n\n");
    }
}
rl.close();