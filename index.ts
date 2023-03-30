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
    removeClass:'removeClass',
    Bye:        "bye"
};

const preDefinedClass = {
    return: 'returnToMain',
    showClassStudent: 'showClassStudent',
};
const preDefinedStudentClass = {
    return: 'returnToClass',
    addStudent: 'addStudent',
    removeStudent:'removeStudent',
    modifyStudent:'modifyStudent'
};

let smClasses = [
    {name:  'Class 1', year: '2023'},
    {name:  'Class 2', year: '2023'},
    {name:  'Class 3', year: '2023'},
    {name:  'Class 4', year: '2023'},
    {name:  'Class 5', year: '2023'}
];

let smStudents = [
        {name:   'Uzair Abbas',     year: '2023',  class: 'Class 5'},
        {name:   'Safoora Fatima',  year: '2023',  class: 'Class 1'},
        {name:   'Mohammad Haider', year: '2023',  class: 'Class 3'},
];

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
            message:'Select the main option',
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
                    name:   "Remove a class",
                    value:  preDefinedMain.removeClass
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
        else if(selected.option == preDefinedMain.removeClass)
        {
            removeClassFunc();
        }
        else
        {
            console.log(preDefinedMain.Bye);
        }
    });

};

async function showClassFunc() {
    if(smClasses.length > 0)
    {
        console.log(smClasses);
    }
    else
    {
        console.log(chalk.redBright('No class is available'));
    }

    await inquirer.prompt([
        {
            type:   'list',
            name:   'classOption',
            message:'Select the class option',
            choices:[
                {
                    name:   'Show class students',
                    value:  preDefinedClass.showClassStudent
                },
                {
                    name:   'Return to Main option',
                    value:  preDefinedClass.return
                }
            ]
        }
    ]).then((selected) => {
        if (selected.classOption == preDefinedClass.showClassStudent)
        {
            showClassStudentFunc();
        }
        else
        {
            mainMenuFunc();
        }
    });

};
async function showClassStudentFunc() {
    await inquirer.prompt([
        {
            type:   'list',
            name:   'classStudentOption',
            message:'Select the student class option',
            choices:[
                {
                    name:'Add the student',
                    value: preDefinedStudentClass.addStudent
                },
                {
                    name:'Remove the student',
                    value: preDefinedStudentClass.removeStudent
                },
                {
                    name:'Modify the student',
                    value: preDefinedStudentClass.modifyStudent
                },
                {
                    name:'Return to Class option',
                    value: preDefinedStudentClass.return
                }
            ]
        }
    ]).then((selected) => {
        if(selected.classStudentOption == preDefinedStudentClass.addStudent)
        {
            addStudentFunc();
        }
        else if(selected.classStudentOption == preDefinedStudentClass.removeStudent)
        {
            removeStudentFunc();
        }
        else if(selected.classStudentOption == preDefinedStudentClass.modifyStudent)
        {
            modifyStudentFunc();
        }
        else
        {
            showClassFunc();
        }
        
    });
};

async function addStudentFunc() {
    console.log(preDefinedStudentClass.addStudent);
};

async function removeStudentFunc() {
    console.log(preDefinedStudentClass.removeStudent);
};

async function modifyStudentFunc() {
    console.log(preDefinedStudentClass.modifyStudent);
};

async function addClassFunc() {
    console.log(preDefinedMain.addClass);
};
async function removeClassFunc() {
    console.log(preDefinedMain.removeClass);
};

//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------

//let appName:string = "Student Management System";
//await welcomeFunc(appName);

await mainMenuFunc();