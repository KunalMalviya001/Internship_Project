import * as readline from 'node:readline/promises';
import { exit, stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

// const answer = await rl.question('What do you think of Node.js? ');

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.close();

let list: string[]= [];
while(true){
    console.log("\t\t WellCome to Task Manager");
    console.log("Choise Option :- ");
    console.log("1. List Task ");
    console.log("2. Add Task ");
    console.log("3. Upgrade Task ");
    console.log("4. Remove Task ");
    console.log("5. Exit ");

    let ch = await rl.question('');

    let choise : number = +ch;

    if( choise == 1 || choise == 2 || choise == 3 || choise == 4 || choise == 5 ){
        switch(choise){
            case 1:{
                if(list.length == 0 ){
                    console.log("\n\nNo Task\n\n"); 
                 }
                 else{ 
                    list.forEach((e, index)=> console.log(index + ".\t" + e));
                 }
            }break;

            case 2:{
                let newTask = await rl.question('New Task :- ');
                list.push(newTask);
                console.log("Task Added");
            }break;

            case 3:{
                if(list.length == 0 ){
                    console.log("\n\nNo Task to update\n\n");
                    break; 
                 }

                let newTaskIndex = await rl.question('Eenter Index of task :- ');
                let newTaskIndex1 = Number(newTaskIndex);

                let newTask = await rl.question('Enter Task to update :- ');

                list[newTaskIndex1] = newTask;
                console.log("update");
            }break;

            case 4:{
                if(list.length == 0 ){
                    console.log("\n\nNo Task to remove5\n\n");
                    break; 
                }

                let removeTaskIndex = await rl.question('Enter Index of task to delete :- ');
                let removeTaskIndex1 = +removeTaskIndex;

                list.splice(removeTaskIndex1);
                console.log("update");
            }break;
            case 5:{
                exit();
            }break;
            default:{
                console.log("enter valid input");
            }
        }
    }
    else{
        console.log("enter valid Option");
    }
    // break;
}

rl.close();