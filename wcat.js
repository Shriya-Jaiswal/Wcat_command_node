#!/usr/bin/env node
let fs = require("fs");
// ------> manage input or take input
let inputArr = process.argv.slice(2);
// console.log(inputArr);

// ---------> options
let optionsArr = [];
let fileArr = [];

// --------->>> identify---> options
for(let i=0; i<inputArr.length; i++){
   let firatChar = inputArr[i].charAt(0);
   if(firatChar == '-'){
       optionsArr.push(inputArr[i]);
   }
   else{
       fileArr.push(inputArr[i]);
   }
}

// options check
let isBothPresent =  optionsArr.includes("-b") && optionsArr.includes("-n");
if(isBothPresent == true){
    console.log("Either enter -n or -b option");
    return;
}

// existence
for(let i=0; i<fileArr.length; i++){
    let isPresent = fs.existsSync(fileArr[i]);
    if(isPresent == false){
        console.log((`file ${fileArr[i]} is not present `));
        return;
    }
}


// --------->>> read file's content
let content = "";
for(let i=0; i<fileArr.length; i++){
    //buffer
    let bufferContent = fs.readFileSync(fileArr[i]); //data are coming in buffer
    content+=bufferContent + "\r\n";
}
// console.log(content);

// ==========> identify the blank or extra lines
let contentArr = content.split("\r\n");
// console.log(contentArr);


// identify the first option

// ------> -s
// ================>>> Identify and Remove extra spaces in the files
let isSpresent =  optionsArr.includes("-s");
if(isSpresent == true){
    for(let i=1; i < contentArr.length;  i++){
        if(contentArr[i] == "" && contentArr[i-1]==""){
            contentArr[i] = null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0; i < contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr =tempArr;
}

console.log("---------------------------------------------------------------");
// console.log(contentArr.join("\n"));



// ------------>>> identify -n OR implementes -n 
// ----------->>> -n means print the numbers in all lines even there contents are not present .i.e. print number in each and every line in file
let isNpresent = optionsArr.includes("-n");
if(isNpresent == true){
    for(let i=0; i<contentArr.length; i++) {
        contentArr[i] =`${i + 1}  ${contentArr[i]} `;
    }
}
// console.log(contentArr.join("\n"));




// ==============>>> identify OR IMPLEMENT -b
// ------------->>> -b means print the number where the content is present .
let isBpresent = optionsArr.includes("-b");
if(isBpresent == true){

    let counter =1;
    for(let i=0; i<contentArr.length; i++) {
        if(contentArr[i]!=""){
            // contentArr[i] =`${i + 1}  ${contentArr[i]} `;
            contentArr[i] =`${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}

console.log(contentArr.join("\n"));
