// 1. Personalized Greeting App -->
// let myH1 = document.getElementById("myH1");
// userName = window.prompt("Enter Name");
// myH1.textContent = `Hello ${userName}! Welcome to my app!`;



// 2. Basic Calculator
// let num1 = window.prompt("Enter first number");
// let num2 = window.prompt("Enter Second number");
// let operationType = prompt("Enter Operation");;
// let myH1 = document.getElementById("myH1")

// let Num1 = Number(num1);
// let Num2 = Number(num2);

// if(operationType == "+"){
//   myH1.textContent = (Num1 + Num2);
// }
// else if(operationType == "-"){
//   myH1.textContent = (Num1 - Num2);
// }
// else if(operationType == "*"){
//   myH1.textContent = (Num1 * Num2);
// }
// else if(operationType == "/"){
//   myH1.textContent = (Num1 / Num2);
// }



// 3. Age Calculator
// const currentDate = 2024;
// let myInput = document.getElementById("myInput");
// let myLabel = document.getElementById("myLabel");
// let myBtn = document.getElementById("myBtn");

// myBtn.onclick = function(){
//   let convertedInput = Number(myInput.value);

//   let computedAge = currentDate - convertedInput;

//   myLabel.textContent = `You are ${computedAge} years old!`
// }



// 4. Unit Converter
// let myCelciusInput = document.getElementById("myCelciusInput");
// let myCelciusBtn = document.getElementById("myCelciusBtn");
// let myCelciusLabel = document.getElementById("myCelciusLabel");

// let myFahrenheitInput = document.getElementById("myFahrenheitInput");
// let myFahrenheitBtn = document.getElementById("myFahrenheitBtn");
// let myFahrenheitLabel = document.getElementById("myFahrenheitLabel");

// myCelciusBtn.onclick = function(){
//   let convertedCelciusInput = Number(myCelciusInput.value);

//   let convertedCelciusToFahrenheit = (convertedCelciusInput * 9/5) + 32;

//   myCelciusLabel.textContent = convertedCelciusToFahrenheit;
  
// }

// myFahrenheitBtn.onclick = function(){
//   let convertedFahrenheitInput = Number(myFahrenheitInput.value);

//   let convertedFahrenheitToCelsius = (convertedFahrenheitInput - 32) * 5/9;

//   myFahrenheitLabel.textContent = convertedFahrenheitToCelsius;
  
// }



// 5. Simple Quiz App
// let answer1 = "joaquin";
// let answer2 = "abalo";
// let answer3 = "meroy";

// let myAnswer1 = prompt("What is your firstname")
// let myAnswer2 = prompt("What is your middlename")
// let myAnswer3 = prompt("What is your lastname")

// let myH1 = document.getElementById("myH1");

// let correctAnswerCount = 0;

// if(myAnswer1 === answer1){
//   correctAnswerCount++;
// }
// if(myAnswer2 === answer2){
//   correctAnswerCount++;
// }
// if(myAnswer3 === answer3){
//   correctAnswerCount++;
// }

// myH1.textContent = `You got ${correctAnswerCount} out of 3 correct!`



// 6. Shopping Cart Total
// const item1 = 100;
// const item2 = 50;
// const item3 = 80;

// let item1Total = document.getElementById("item1");
// let item2Total = document.getElementById("item2");
// let item3Total = document.getElementById("item3");

// let item1Quantity = prompt("Enter Quantity of first Item");
// let item2Quantity = prompt("Enter Quantity of second Item");
// let item3Quantity = prompt("Enter Quantity of third Item");

// item1Total.textContent = `Total Amount of First Item is ${item1 * item1Quantity}`;
// item2Total.textContent = `Total Amount of Second Item is ${item2 * item1Quantity}`;
// item3Total.textContent = `Total Amount of Third Item is ${item3 * item1Quantity}`;



// 7. Color Changer (Interactive UI)
// const color1 = "red";
// const color2 = "blue";
// const color3 = "yellow";

// let myBtn = document.getElementById("myBtn");

// let currentIndex = 1;

// myBtn.onclick = function(){
//   if(currentIndex === 1){
//     document.body.style.backgroundColor = color1;
//     currentIndex = 2;
//   }
//   else if(currentIndex === 2){
//     document.body.style.backgroundColor = color2;
//     currentIndex = 3;
//   }
//   else if(currentIndex === 3){
//     document.body.style.backgroundColor = color3;
//     currentIndex = 1;
//   }
// }







