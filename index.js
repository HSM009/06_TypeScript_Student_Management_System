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
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
const preDefinedMain = {
    showClass: "showClass",
    addClass: "addClass",
    removeClass: 'removeClass',
    Bye: "bye"
};
const preDefinedClass = {
    return: 'returnToMain',
    showClassStudent: 'showClassStudent',
};
const preDefinedStudentClass = {
    return: 'returnToClass',
    showStudent: 'showSudent',
    addStudent: 'addStudent',
    removeStudent: 'removeStudent',
    modifyStudent: 'modifyStudent'
};
let smClasses = [
    { uqIdClassPk: '2301', classNo: '1', yearNo: '2023' },
    { uqIdClassPk: '2302', classNo: '2', yearNo: '2023' },
    { uqIdClassPk: '2303', classNo: '3', yearNo: '2023' },
    { uqIdClassPk: '2304', classNo: '4', yearNo: '2023' },
    { uqIdClassPk: '2305', classNo: '5', yearNo: '2023' }
];
let smStudents = [
    { uqIdStudentPk: '230101', name: 'Safoora Fatima', uqIdClassFk: '2301' },
    { uqIdStudentPk: '230501', name: 'Uzair Abbas', uqIdClassFk: '2305' },
    { uqIdStudentPk: '230301', name: 'Mohammad Haider', uqIdClassFk: '2303' },
];
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------
async function welcomeFunc(welcomeMessage) {
    let rainbowTitle = chalkAnimation.neon(chalk.blueBright("Welcome To " + welcomeMessage + " App!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
}
;
async function mainMenuFunc() {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Select the main option',
            choices: [
                {
                    name: "Show all classes",
                    value: preDefinedMain.showClass
                },
                {
                    name: "Add a class",
                    value: preDefinedMain.addClass
                },
                {
                    name: "Remove a class",
                    value: preDefinedMain.removeClass
                },
                {
                    name: "Bye",
                    value: preDefinedMain.Bye
                }
            ]
        }
    ]).then((selected) => {
        if (selected.option == preDefinedMain.showClass) {
            showClassFunc();
        }
        else if (selected.option == preDefinedMain.addClass) {
            addClassFunc();
            //mainMenuFunc();
        }
        else if (selected.option == preDefinedMain.removeClass) {
            removeClassFunc();
            mainMenuFunc();
        }
        else {
            console.log(preDefinedMain.Bye);
        }
    });
}
;
async function showClassFunc() {
    if (smClasses.length > 0) {
        console.log(smClasses);
        await inquirer.prompt([
            {
                type: 'list',
                name: 'classOption',
                message: 'Select the class option',
                choices: [
                    {
                        name: 'Show class options',
                        value: preDefinedClass.showClassStudent
                    },
                    {
                        name: 'Return to Main option',
                        value: preDefinedClass.return
                    }
                ]
            }
        ]).then((selected) => {
            if (selected.classOption == preDefinedClass.showClassStudent) {
                showClassStudentFunc();
            }
            else {
                mainMenuFunc();
            }
        });
    }
    else {
        console.log(chalk.redBright('No class is available'));
    }
}
;
async function showClassStudentFunc() {
    await inquirer.prompt([
        {
            type: 'list',
            name: 'classStudentOption',
            message: 'Select the student class option',
            choices: [
                {
                    name: 'Show the student in spcific class',
                    value: preDefinedStudentClass.showStudent
                }, {
                    name: 'Add the student',
                    value: preDefinedStudentClass.addStudent
                },
                {
                    name: 'Remove the student',
                    value: preDefinedStudentClass.removeStudent
                },
                {
                    name: 'Modify the student',
                    value: preDefinedStudentClass.modifyStudent
                },
                {
                    name: 'Return to Class option',
                    value: preDefinedStudentClass.return
                }
            ]
        }
    ]).then((selected) => {
        if (selected.classStudentOption == preDefinedStudentClass.showStudent) {
            showStudentFunc();
            showClassStudentFunc();
        }
        else if (selected.classStudentOption == preDefinedStudentClass.addStudent) {
            addStudentFunc();
            showClassStudentFunc();
        }
        else if (selected.classStudentOption == preDefinedStudentClass.removeStudent) {
            removeStudentFunc();
            showClassStudentFunc();
        }
        else if (selected.classStudentOption == preDefinedStudentClass.modifyStudent) {
            modifyStudentFunc();
            showClassStudentFunc();
        }
        else {
            showClassFunc();
        }
    });
}
;
async function showStudentFunc() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'classNo',
            message: 'Select the class ',
            choices: smClasses.map((chose) => chose.classNo)
        },
        {
            type: 'list',
            name: 'classYear',
            message: 'Select the year',
            choices: [...new Set(smClasses.map((chose) => chose.yearNo))]
        }
    ]).then((selected) => {
        let classId;
        if (selected.classNo.length == 1) {
            classId = '0' + selected.classNo;
        }
        classId = selected.classYear.substring(2, 4) + classId;
        const message = smStudents.filter((dataValue) => dataValue.uqIdClassFk == classId);
        console.log(message);
    });
}
;
async function addStudentFunc() {
    console.log(preDefinedStudentClass.addStudent);
    inquirer.prompt([
        {
            type: 'input',
            name: 'studentName',
            message: 'Enter the student name'
        },
        {
            type: 'list',
            name: 'studentClass',
            message: 'Select the class',
            choices: smClasses.map((chose) => chose.classNo)
        },
        {
            type: 'list',
            name: 'studentYear',
            message: 'Select the year',
            choices: [...new Set(smClasses.map((chose) => chose.yearNo))]
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure that you want to add student data?'
        }
    ]).then((selected) => {
        if (selected.confirm == true) {
            let newClassId = newClassIdFunc(selected.studentClass, selected.studentYear);
            const newObj = { uqIdStudentPk: newClassId.toString(), name: selected.studentName, uqIdClassFk: newClassId.toString().substring(0, 4) };
            smStudents.push(newObj);
            console.log(newObj);
            console.log(chalk.bgGreenBright('New student is added succesffully.\n'));
        }
        else {
            console.log(chalk.bgRedBright('You have cancelled the confirmation.\n'));
        }
    });
}
;
function newClassIdFunc(sClass, sYear) {
    let newId;
    if (sClass.length == 1) {
        sClass = '0' + sClass;
    }
    let makeId = sYear.slice(-2) + sClass;
    let PKstudentData = smStudents.filter((lsData) => lsData.uqIdClassFk == makeId).map((lsData) => lsData.uqIdStudentPk);
    if (PKstudentData.length == 0) {
        newId = makeId + '00';
    }
    else {
        newId = PKstudentData.slice(-1);
    }
    return parseInt(newId) + 1;
}
async function removeStudentFunc() {
    console.log(preDefinedStudentClass.removeStudent);
}
;
async function modifyStudentFunc() {
    console.log(preDefinedStudentClass.modifyStudent);
}
;
async function addClassFunc() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'classYear',
            message: 'Enter the class year',
            validate(value) {
                if (!isNaN(value)) {
                    if (value.length != 4) {
                        return chalk.bgRedBright('Enter year format yyyy.');
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return chalk.bgRedBright('Must enter number input.');
                }
            }
        },
        {
            type: 'input',
            name: 'classNo',
            message: 'Enter the class number ',
            validate(value) {
                if (!isNaN(value)) {
                    if (value.length == 0) {
                        return chalk.bgRedBright('Must enter atleast 1 digit.');
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return chalk.bgRedBright('Must enter number input.');
                }
            }
        }
    ]).then((selected) => {
        let newClassNo = smClasses.find((val) => val.classNo == selected.classNo && val.yearNo == selected.classYear);
        console.log(newClassNo);
        if (newClassNo == undefined) {
            let newClassId;
            if (selected.classNo.length == 1) {
                newClassId = '0' + newClassId;
            }
            newClassId = selected.classYear.slice(-2) + newClassId;
            const newObj = { uqIdClassPk: newClassId.toString().substring(0, 4), classNo: selected.classNo, yearNo: newClassId };
            console.log(newObj);
            smClasses.push(newObj);
            return chalk.bgRedBright('Class added.');
        }
        else {
            return chalk.bgRedBright('Class already exist.');
        }
    });
}
;
async function removeClassFunc() {
    console.log(preDefinedMain.removeClass);
}
;
//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------
//let appName:string = "Student Management System";
//await welcomeFunc(appName);y
await mainMenuFunc();
