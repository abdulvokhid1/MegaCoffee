/*
H-TASK: 

shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni olib string holatda return qilsin
MASALAN: getPositive([1, -4, 2]) return qiladi "12" 
  */

function getPositive(arr: number[]) {
  const positive: string[] = arr
    .filter((num) => Number.isInteger(num) && num > 0)
    .map((num) => num.toString());

  const result: string = positive.join("");
  return result;
}
console.log(getPositive([1, -4, 2]));

/*
Project Standarts:
-Logging Standarts
-Naming Standarts :
  function, method, variable => CAMEL;
  class => PASCAL;
  folder, file => KEBAB;
  css => SNAKE;
-Error Handling
    
*/
 
/* API => Application Programming Interface:

Traditional Api
Rest Api
GrapQL Api
*/


/* I-TASK: 

Shunday function tuzing, unga string argument pass bolsin. Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
MASALAN: getDigits("m14i1t") return qiladi "141" */


function getDigits(){

}
getDigits() 