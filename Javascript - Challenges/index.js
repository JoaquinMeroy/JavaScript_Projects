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

while (true) {
  let enteredaction = prompt(
    "What do you want to do? Add Item?, Remove Item?, Show List?, or Check Item?"
  );

  if (enteredaction === "Add Item") {
    while (true) {
      let enteredItem = prompt("Enter an item");
      if (enteredItem === "Done") break;

      addItem(enteredItem);
    }
  } else if (enteredaction === "Show List") {
    alert(groceryList);
  }
}

function addItem(enteredItem) {
  return groceryList.push(enteredItem);
}
