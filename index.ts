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
//-----------------------------------------------,-------------------------------

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
    showStudent:'showSudent',
    addStudent: 'addStudent',
    removeStudent:'removeStudent',
    modifyStudent:'modifyStudent'
};

let smClasses = [
    {uqIdClassPk:  '2301',    classNo:  '1', yearNo: '2023'},
    {uqIdClassPk:  '2302',    classNo:  '2', yearNo: '2023'},
    {uqIdClassPk:  '2303',    classNo:  '3', yearNo: '2023'},
    {uqIdClassPk:  '2304',    classNo:  '4', yearNo: '2023'},
    {uqIdClassPk:  '2305',    classNo:  '5', yearNo: '2023'}
];

let smStudents = [
    {uqIdStudentPk:'230101',   name:   'Safoora Fatima',  uqIdClassFk:'2301'},
    {uqIdStudentPk:'230501',   name:   'Uzair Abbas',     uqIdClassFk:'2305'},
    {uqIdStudentPk:'230301',   name:   'Mohammad Haider', uqIdClassFk:'2303'},
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
        
        await inquirer.prompt([
            {
                type:   'list',
                name:   'classOption',
                message:'Select the class option',
                choices:[
                    {
                        name:   'Show class options',
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
    }
    else
    {
        console.log(chalk.redBright('No class is available'));
    }
};
async function showClassStudentFunc() {
    await inquirer.prompt([
        {
            type:   'list',
            name:   'classStudentOption',
            message:'Select the student class option',
            choices:[
                {
                    name:'Show the student in spcific class',
                    value: preDefinedStudentClass.showStudent
                },{
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
    inquirer.prompt([
        {
            type:   'input',
            name:   'studentName',
            message:'Enter the student name'
        },
        {
            type:   'list',
            name:   'studentClass',
            message:'Select the class',
            choices: smClasses.map((chose) => chose.classNo)
        },
        {
            type:   'list',
            name:   'studentYear',
            message:'Select the year',
            choices: [...new Set(smClasses.map((chose) => chose.yearNo))]
        },
        {
            type:   'confirm',
            name:   'confirm',
            message:'Are you sure that you want to add student data?',
            default: false
        }
    ]).then ((selected) =>{
        if (selected.confirm == true)
        {
            let newStudentID = newStudentIDFunc(selected.studentClass,selected.studentYear);
            smClasses.push();
        }
        else
        {
            console.log(chalk.redBright('You have cancelled the confirmation.'));
        }
    });
};

function newStudentIDFunc(sClass:any,sYear:any)
{
    let newId;
    if(sClass.length==1)
    { 
        sClass = '0'+sClass;
    }

    let makeId:string = sYear.slice(-2) + sClass ;
    let PKstudentData:any = smStudents.filter((lsData) => lsData.uqIdClassFk == makeId).map((lsData) => lsData.uqIdStudentPk);
    if(PKstudentData.length == 0 )
    {
        newId = makeId + '00';
    }
    else
    {
        newId = PKstudentData.slice(-1);
    }
    return parseInt(newId) + 1;
}

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
//await welcomeFunc(appName);y

await mainMenuFunc();