"use strict";

// Day 1: Expense Tracker (Basic version 1)
/*let expenseList = [];

function sumTotalExpense(expenseList) {
  let totalExpense = 0;
  for (let i = 0; i < expenseList.length; i++) {
    totalExpense = totalExpense + expenseList[i];
  }
  return totalExpense;
}

while (sumTotalExpense(expenseList) !== 1000) {
  let currentTotal = sumTotalExpense(expenseList);

  let enterNumber = Number(
    prompt(`Total expense: (${currentTotal})
Enter expense: `)
  );
  expenseList.push(enterNumber);

  currentTotal = sumTotalExpense(expenseList);

  if (currentTotal >= 1000) {
    window.alert(`Stop! your expense is ${currentTotal}. limit reached.`);
    break;
  }
}*/

// Day 2: Simple Quiz App (Text Only)
/*let questions = [
  { question: "What is your name?", answer: "joaquin" },
  { question: "What is your age?", answer: 23 },
  { question: "What is your gender?", answer: "male" },
];

let score = 0;

for (let i = 0; i < questions.length; i++) {
  let usersAnswerprompt = prompt(questions[i].question);

  if (usersAnswerprompt == questions[i].answer) {
    score++;
  }
}

console.log(score);*/
// Day 3: Grocery List Manager
const groceryList = [];

let i = 0;

let enteredAction = prompt(
  "What do you want to do? Add an item?, Remove an item?, or Check an item?"
);

if (enteredAction === "Add an item") {
  while (i <= groceryList.length) {
    let enteredItem = prompt(`${groceryList} Add Item`);

    if (enteredAction == "Done") {
      enteredAction;
    } else {
      addItem(enteredItem);
      i++;
    }
  }
}

// Add Function
function addItem(enteredItem) {
  groceryList.push(enteredItem);

  return groceryList;
}

// Remove First Item Function
function removeLastItem(groceryList) {
  groceryList.pop();
}

// Remove Last Item Function
function removeLastItem(groceryList) {
  groceryList.shift();
}
