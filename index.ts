#! /usr/bin/env node

console.clear();

//------------------------------------------------------------------------------
//IMPORTS HERE
//------------------------------------------------------------------------------

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

//------------------------------------------------------------------------------
//CLASSES/CONSTRUCTORS/OOPs HERE
//------------------------------------------------------------------------------

const stopTime = ()=>{
    return new Promise((res:any)=>{
        setTimeout(res,3500);
    })
};

const preDefinedMain = {
    showClass:  "showClass",
    addClass:   "addClass",
    Bye:        "bye"
};

//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------

async function welcomeFunc(welcomeMessage:string ) {
    let rainbowTitle = chalkAnimation.neon(chalk.blueBright("Welcome To "+ welcomeMessage +" App!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
};

async function mainMenuFunc(){

    await inquirer.prompt([
        {
            type:   'list',
            name:   'option',
            choices:[
                {
                    name:   "Show all classes",
                    value:  preDefinedMain.showClass
                },
                {
                    name:   "Add a class",
                    value:  preDefinedMain.addClass
                },
                {
                    name:   "Bye",
                    value:  preDefinedMain.Bye
                }   
            ]   
        }
        
    ]).then((selected) => {
        if (selected.option == preDefinedMain.showClass)
        {
            showClassFunc();
        }
        else if(selected.option == preDefinedMain.addClass)
        {
            addClassFunc();
        }
        else
        {
            console.log(preDefinedMain.Bye);
        }
    });

};

async function showClassFunc() {
    
};

async function addClassFunc() {
    
};

//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------

let appName:string = "Student Management System";
await welcomeFunc(appName);

await mainMenuFunc();