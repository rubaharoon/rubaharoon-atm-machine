#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; // Dollar 
let myPin = 1234;
console.log(chalk.bold.rgb(255, 0, 0)(`\n \t\t <<<==================>>>`));
console.log(chalk.bold.rgb(255, 0, 0)(`<<<===========>>> ${chalk.bold.hex(`#00FFFF`)(`Welcome to my ATM Machine!`)} <<<===========>>>`));
console.log(chalk.bold.rgb(255, 0, 0)(`\t\t <<<==================>>>\n`));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.magenta("Enter your pin"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\n Pin is correct, Login successfully!!! \n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.cyanBright("Select an operation"),
            choices: ["withdraw Amount", "Check Balance"],
        }
    ]);
    if (operationAns.operation === "withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellowBright("Select a withdrawal method"),
                choices: ["Fast cash", "Enter Amount"],
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.magenta("Select an amount"),
                    choices: [2000, 5000, 10000, 20000, 50000],
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.blueBright(` ${fastCashAns.fastCash} withdraw successfully`));
                console.log(chalk.redBright(`Your Remaining balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.blue("Enter the amount to withdraw"),
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("Insufficient balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(chalk.red(`Your remaining balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.redBright(`Your Account balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!!!"));
}
