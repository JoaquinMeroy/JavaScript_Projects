"use strict";

// Day 1: Expense Tracker (Basic version)
const expenseList = [20, 50, 100, 200, 450];
const expenseInput = Number(prompt("Enter expense"));

const addNewExpense = function (expense) {
  expenseList.push(expense);
  let totalExpense = 0;

  for (let i = 0; i < expenseList.length; i++) {
    totalExpense = totalExpense + expenseList[i];
  }

  if (totalExpense > 1000) {
    return `Stop! you overspending your money! you've already spend ${totalExpense}`;
  } else {
    return `your spending is ${totalExpense}`;
  }
};

console.log(addNewExpense(expenseInput));

// Day 2: Simple Quiz App (Text Only)
