interface object1 {
    t:number;
    resolve?: number[]; 
    reject?:string;
}

let functions = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 150)),
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 50)),
    () => new Promise(resolve => setTimeout(() => resolve(10), 200)), 
    () => new Promise(resolve => setTimeout(() => resolve(16), 100))
]

let result1 : object1 = {t:1, resolve:[]};
Promise.allSettled(functions.map(async function (f){
    const start = performance.now();
     let  ans = await f().catch((e)=>{
         const end = performance.now();
         let t = Math.floor(end-start);
         throw Error(t.toString());
     });
     const end = performance.now();
     let t = Math.floor(end-start);
    return [t , ans]
    }
)).then((arr)=>{
    arr.forEach((x: {status : string , reason?:string, value? : any})=> {
        if(x.status == "rejected"){
            throw new Error(x.reason);
        }
        
        console.log(typeof x.value);
        let a: number = Number(x.value[1]);
        result1.t = Math.max(x.value[0], result1.t);
        result1.resolve?.push(a);
    } )
}).then(()=> console.log(result1)).catch((e)=> {
            let result1 : object1 = {t:1, reject:""};
            let t  = e.message.split(" ");
            t = Number(t[1]);
            result1.t = Number(t);
            result1.reject="Error";
            console.log(result1);
})




// let functions = [
//     () => new Promise(resolve => setTimeout(() => resolve([5,150]), 150)),
//     // () => new Promise((resolve, reject) => setTimeout(() => reject(["Error",100]), 100)),
//     () => new Promise(resolve => setTimeout(() => resolve([10,200]), 200)), 
//     () => new Promise(resolve => setTimeout(() => resolve([16,100]), 100))
// ]


// let result : object1 = {}
// function outer(fun){
//     let start : number = performance.now();
//     return fun().then((e)=>{
//         let end: number = performance.now();
//         let total = Math.floor(end-start);
//         result.t = total;
//         console.log(e);
//     })
//     .catch((err)=>{
//         let end = performance.now();
//         console.log(Math.floor(end-start));
//         console.log(err);
//     }) ;
// }

// let result : object1= {t:1, resolve:[]};

// functions.forEach((e)=>{ 
//     outer(e)
// });

