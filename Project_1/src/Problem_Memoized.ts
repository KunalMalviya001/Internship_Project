// import * as readline from "node:readline/promises";
// import { exit, stdin as input, stdout as output } from 'node:process';

// const rl = readline.createInterface({ input, output });
// let input_cli = await rl.question(" :- ");


let outerSum  = function (fn : string) {
    let fnName : string = fn;
    let action : string[] = [];
    let value : number[][] = [];
    // let value1 : number[] = [];
    let output : number[] = [] ;

    let have_in : number[][] = [];
    let have_in_single :number[] = []
    let get_count :number = 0;

    return function(a?:number, b?:number, show?:true){
        if(show == true && fnName == "sum"){
            display(fnName, action, value, output);
            return;
        }
        if(show == true){
            display(fnName, action, value, output);
            return;
        }
        if(a == null && b == null && fnName =="sum" ){
            action.push("getCallCount");
            value.push([]);
            output.push(get_count);
            // return get_count;
        }
        else if(a == null && b == null  ){
            action.push("getCallCount");
            value.push([]);
            output.push(get_count);
            // return get_count;
        }
        else if(fn == "sum"){
            if(have_in.some(row => row.includes(a as number)) && have_in.some(row => row.includes(b as number))){
                value.push([a as number, (b as number)]);
                action.push("call");
                output.push(a as number + (b as number));
                // return a as number + (b as number);
            }
            else{
                have_in.push(([a as number,b as number]));
                get_count++;
                value.push([a as number, (b as number)]);
                action.push("call");
                output.push(a as number + (b as number));
                // return a as number + (b as number)
            }
        }
        else if(fn == "factorial"){
            if(have_in_single.includes(a as number)){
                value.push([a as number]);
                action.push("call");
                output.push(factorial(a as number));
                // return factorial(a as number);
            }
            else {
                get_count++;
                have_in_single.push(a as number);
                value.push([a as number]);
                action.push("call");
                output.push(factorial(a as number));
                // return factorial(a as number);
            }
        }
        else if(fn == "fib"){
            if(have_in_single.includes(a as number)){
                value.push([a as number]);
                action.push("call");
                output.push(fib(a as number));
                // return fib(a as number);
            }
            else{
                get_count++;
                have_in_single.push(a as number);
                value.push([a as number]);
                action.push("call");
                output.push(fib(a as number));
                // return fib(a as number);
            }
        }
    }
}

function fib(n : number):number{
    if(n <= 1 ){
        return 1;
    }
    return (fib(n-1) + fib(n-2));
}

function factorial(n: number) : number{
    if(n<=1){
        return 1;
    }
    return n * factorial(n-1);
}

function display( fn:string, actions: string[], values: number[][] | [], output: number[]){
    console.log("fnName : " , fn);
    console.log("actions : " , actions);
    console.log("values : " , values);
    console.log("Output : " , output);
}


let add = outerSum("sum");
let fac = outerSum("factorial");
let fib1 = outerSum("fib");


let add_input = [[2,2],[2,2],[],[1,2],[]];
let fac_input = [[2],[3],[2],[],[3],[]];
let fib_input = [[5],[]];

console.log("\n====================================");
add_input.forEach(([a,b])=>{
    add(a,b);
})
add( 0, 0, true);

console.log("\n====================================");
fac_input.forEach(([a])=> {
    fac(a);
})
fac( 1, 1, true);


console.log("\n====================================");
fib_input.forEach(([a])=>{
    fib1(a);
})
fib1( 1, 1, true);


// rl.close();