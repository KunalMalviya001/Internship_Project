import * as readline from "node:readline/promises";
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
let input_cli = await rl.question("\n\nEnter a number (Between 0 to 3999) :- ");
let user_number:number = parseInt(input_cli);


if(isNaN(user_number)|| user_number > 3999 || user_number < 0){
    console.log("\n\nInvalid number\n\n");
}
else{
    let numeralCodes: string[][] = [["","I","II","III","IV","V","VI","VII","VIII","IX"],
                                    ["","X","XX","XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
                                    ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],
                                    ["","M","MM","MMM"]];        

    let numeral: string = "";
    let digits: string[] = user_number.toString().split('').reverse();
    
    for (let i=0; i < digits.length; i++){
        numeral = numeralCodes[i][parseInt(digits[i] as string)] + numeral;
    }
    console.log("\nRoman number for "+ user_number + " is \" " + numeral + " \"\n");
}

rl.close();