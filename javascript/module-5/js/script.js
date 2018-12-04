'use strickt'
const users = [
  {
    id: '701b29c3-b35d-4cf1-a5f6-8b12b29a5081',
    name: 'Moore Hensley',
    email: 'moorehensley@indexia.com',
    eyeColor: 'blue',
    phone: '+1 (848) 556-2344',
    friends: ['Sharron Pace'],
    isActive: false,
    balance: 2811,
    skills: ['ipsum', 'lorem'],
    gender: 'male',
    age: 37,
  },
  {
    id: '7a3cbd18-57a1-4534-8e12-1caad921bda1',
    name: 'Sharlene Bush',
    email: 'sharlenebush@tubesys.com',
    eyeColor: 'blue',
    phone: '+1 (855) 582-2464',
    friends: ['Briana Decker', 'Sharron Pace'],
    isActive: true,
    balance: 3821,
    skills: ['tempor', 'mollit', 'commodo', 'veniam', 'laborum'],
    gender: 'female',
    age: 34,
  },
  {
    id: '88beb2f3-e4c2-49f3-a0a0-ecf957a95af3',
    name: 'Ross Vazquez',
    email: 'rossvazquez@xinware.com',
    eyeColor: 'green',
    phone: '+1 (814) 593-3825',
    friends: ['Marilyn Mcintosh', 'Padilla Garrison', 'Naomi Buckner'],
    isActive: false,
    balance: 3793,
    skills: ['nulla', 'anim', 'proident', 'ipsum', 'elit'],
    gender: 'male',
    age: 24,
  },
  {
    id: '249b6175-5c30-44c6-b154-f120923736f5',
    name: 'Elma Head',
    email: 'elmahead@omatom.com',
    eyeColor: 'green',
    phone: '+1 (909) 547-2687',
    friends: ['Goldie Gentry', 'Aisha Tran'],
    isActive: true,
    balance: 2278,
    skills: ['adipisicing', 'irure', 'velit'],
    gender: 'female',
    age: 21,
  },
  {
    id: '334f8cb3-eb04-45e6-abf4-4935dd439b70',
    name: 'Carey Barr',
    email: 'careybarr@nurali.com',
    eyeColor: 'blue',
    phone: '+1 (956) 512-2693',
    friends: ['Jordan Sampson', 'Eddie Strong'],
    isActive: true,
    balance: 3951,
    skills: ['ex', 'culpa', 'nostrud'],
    gender: 'male',
    age: 27,
  },
  {
    guid: '150b00fb-dd82-427d-9faf-2879ea87c695',
    name: 'Blackburn Dotson',
    email: 'blackburndotson@furnigeer.com',
    eyeColor: 'brown',
    phone: '+1 (876) 411-2433',
    friends: ['Jacklyn Lucas', 'Linda Chapman'],
    isActive: false,
    balance: 1498,
    skills: ['non', 'amet', 'ipsum'],
    gender: 'male',
    age: 38,
  },
  {
    id: 'e1bf46ab-7168-491e-925e-f01e21394812',
    name: 'Sheree Anthony',
    email: 'shereeanthony@kog.com',
    eyeColor: 'brown',
    phone: '+1 (979) 504-2554',
    friends: ['Goldie Gentry', 'Briana Decker'],
    isActive: true,
    balance: 2764,
    skills: ['lorem', 'veniam', 'culpa'],
    gender: 'female',
    age: 39,
  },
];
/*
 * Используя массив (users) объектов пользователей, напишите функции которые с помощью 
 * функциональных методов массивов (никаких for, splice и т.д.) выполняют указанные операции.
 */

/**1
 * Получить массив имен (поле name) всех пользователей
 */
const getAllNames = arr => { return arr.map(curr => { return curr.name }) };
console.log('=================1================');
console.log(getAllNames(users)); 
// [ 'Moore Hensley', 'Sharlene Bush', 'Ross Vazquez', 'Elma Head', 'Carey Barr', 'Blackburn Dotson', 'Sheree Anthony' ]

                            
/**2
 * Получить массив объектов пользователей по цвету глаз (поле eyeColor)
 */
const getUsersByEyeColor = (arr, color) => { return arr.filter(curr => { return curr.eyeColor === color }) };
console.log('=================2================');
console.log(getUsersByEyeColor(users, 'blue')); // [объект Moore Hensley, объект Sharlene Bush, объект Carey Barr]

                                            
/**3
 * Получить массив имен пользователей по полу (поле gender)
 */
const getUsersByGender = (arr, gender) => { return arr.filter(curr => { return curr.gender === gender }) };
console.log('=================3================');
console.log(getUsersByGender(users, 'male')); // [ 'Moore Hensley', 'Ross Vazquez', 'Carey Barr', 'Blackburn Dotson' ]

/**4
 * Получить массив только неактивных пользователей (поле isActive)
 */
const getInactiveUsers = arr => { return arr.filter(curr => { return !curr.isActive }) };
console.log('=================4================');
console.log(getInactiveUsers(users)); // [объект Moore Hensley, объект Ross Vazquez, объект Blackburn Dotson]
                      
/**5
 * Получить пользоваля (не массив) по email (поле email, он уникальный)
 */
const getUserByEmail = (arr, email) => { return arr.find(curr => { return curr.email === email }) };
console.log('=================5================');
console.log(getUserByEmail(users, 'shereeanthony@kog.com')); // {объект пользователя Sheree Anthony}
console.log(getUserByEmail(users, 'elmahead@omatom.com')); // {объект пользователя Elma Head}

/**6
 * Получить массив пользователей попадающих в возрастную категорию от min до max лет (поле age)
 */
const getUsersWithAge = (arr, min, max) => { return arr.filter(curr => { return (curr.age > min && curr.age < max) }) };
console.log('=================6================');
console.log(getUsersWithAge(users, 20, 30)); // [объект Ross Vazquez, объект Elma Head, объект Carey Barr]

console.log(getUsersWithAge(users, 30, 40));
// [объект Moore Hensley, объект Sharlene Bush, объект Blackburn Dotson, объект Sheree Anthony]
                              
                                 
/**7
 * Получить общую сумму баланса (поле balance) всех пользователей
 */
const getTotalBalance = arr => { return arr.reduce((acc, curr) => { return (acc + curr.balance) }, 0) };
console.log('=================7================');
console.log(getTotalBalance(users)); // 20916


/**8
 * Массив имен всех пользователей у которых есть друг с указанным именем
 */
const getUsersByFriend = (arr, name) => {
  return arr.filter(curr => { return curr.friends.includes(name) })
    .map(curr => curr.name)
};
console.log('=================8================');
console.log(getUsersByFriend(users, 'Briana Decker')); // [ 'Sharlene Bush', 'Sheree Anthony' ]
console.log(getUsersByFriend(users, 'Goldie Gentry')); // [ 'Elma Head', 'Sheree Anthony' ]

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
*/
                                         
/**9
* Получить массив всех скиллов всех пользователей (поле skills), при этом не должно быть
* повторяющихся скиллов и они должны быть отсортированы в алфавитном порядке
*/
const getAllUniqueSkills = arr => {
  return arr.reduce((acc, curr) => {
    acc.push(curr.skills)
    return acc
  }, [])
    .reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, [])
    .sort()
};
console.log('=================9================');
console.log(getAllUniqueSkills(users));
// [ 'adipisicing', 'amet', 'anim', 'commodo', 'culpa', 'elit', 'ex', 'ipsum', 'irure', 'laborum', 'lorem', 'mollit', 'non', 'nostrud', 'nulla', 'proident', 'tempor', 'velit', 'veniam' ]

                             
/**10
* Массив имен (поле name) людей, отсортированных в зависимости от количества их друзей (поле friends)
*/
//console.log('users=',users);
const getUserNamesSortedByFriendsCount = arr => {
  let newArr = arr.map(curr => curr);
  return newArr.sort((a, b) => {
    return a.friends.length - b.friends.length
  })
    .map(curr => { return curr.name })
};
console.log('=================10================');
//console.log('users=',users);
console.log(getUserNamesSortedByFriendsCount(users)); 
// [ 'Moore Hensley', 'Sharlene Bush', 'Elma Head', 'Carey Barr', 'Blackburn Dotson', 'Sheree Anthony', 'Ross Vazquez' ]
