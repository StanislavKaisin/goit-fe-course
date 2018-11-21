/*
  Написать следующий скрипт:
  
    - При загрузке страницы пользователю предлагается ввести через prompt число. 
      Число введенное пользователем записывается в массив чисел.
      
    - Операция ввода числа пользователем и сохранение в массив продолжается до
      тех пор, пока пользователь не нажмет Cancel в prompt. Используйте цикл do...while.
      
    - После того как пользователь прекратил ввод нажав Cancel, необходимо взять 
      массив введенных чисел, сложить общую сумму всех элементов массива и 
      записать ее в переменную. Используйте цикл for или for...of.
      
    - По окончанию ввода, если массив не пустой, вывести alert с текстом `Общая сумма чисел равна ${сумма}`
      
  🔔 PS: Делать проверку того, что пользователь ввел именно число, а не произвольный набор 
      символов, не обязательно. Если хотите, в случае некорректного ввода покажите alert с текстом 
      'Было введено не число, попробуйте еще раз', при этом результат prompt записывать 
      в массив чисел не нужно, после чего снова пользователю предлагается ввести число в prompt.
*/
"use strict";
let userInput;
const numbers = [];
let total = 0;
do {
  userInput = prompt('Введите число');
  //alert(userInput);
  if (Number.isNaN(Number(userInput))||userInput === "") { alert('Было введено не число, попробуйте еще раз') }
  else {
    if (userInput !== null && userInput !== "") { numbers.push(Number(userInput)) };
  };
} while (userInput !== null);
//console.log(numbers);
for (let i = 0, max = numbers.length; i < max; i += 1) {
  total = total + numbers[i];
}
//console.log(numbers.length);
//console.log(total);
if (numbers.length !== 0) { alert(`Общая сумма чисел равна ${total}`) }
else { alert(`Длина массива равна ${numbers.length}`) };