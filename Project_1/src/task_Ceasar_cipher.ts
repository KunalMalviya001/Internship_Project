import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let plain_text : string = await rl.question("\nEnter Your statement :- ");
let cipher_text : string = "";
let encrypt_code : number = 23;

for(let i=0; i<plain_text.length; i++){
    let cha : number = plain_text.charCodeAt(i);
    // console.log(cha);
    
    // a
    if(cha > 96 && cha < 123){
        if((cha + encrypt_code) > 122 ){
            let result = cha + encrypt_code;
            result = 97 + (result - 123);
            cipher_text = cipher_text + String.fromCharCode(result);
            // console.log(cipher_text);
        }
        else{
            cipher_text = cipher_text + String.fromCharCode(cha + encrypt_code);
        }
    }
    else if(cha > 64 && cha < 91){
        if((cha + encrypt_code) > 90 ){
            let result = cha + encrypt_code;
            result = 65 + (result - 90);
            cipher_text = cipher_text + String.fromCharCode(result);
            // console.log(cipher_text);
        }
        else{
            cipher_text = cipher_text + String.fromCharCode(cha + encrypt_code);
        }
    }
    else{
        cipher_text = cipher_text + plain_text.charAt(i);
    }
}
console.log(cipher_text);

rl.close();