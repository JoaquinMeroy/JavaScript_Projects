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
let questions = [
  { question: "What is your name?", answer: "joaquin" },
  { question: "What is your age?", answer: 23 },
  { question: "What is your gender?", answer: "male" },
];

for (let i = 0; i < questions.length; i++) {
  let usersAnswerprompt = prompt(questions[i].question);
  console.log(usersAnswerprompt);
}

// let questions = {
//   question1: prompt("What is your name?"),
//   question2: Number(prompt("What is your age?")),
//   question3: prompt("What is your gender?"),
// };

// let score = 0;
// if (questions.question1 == "joaquin") {
//   score++;
// }

// if (questions.question2 == 23) {
//   score++;
// }

// if (questions.question3 == "male") {
//   score++;
// }

// window.alert(`Score is ${score}`);
