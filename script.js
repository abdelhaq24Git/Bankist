'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*for (const mouvement of movements) {
  if (mouvement > 0) {
    console.log(`You deposited ${mouvement}`);
  } else {
    console.log(`You withdrew ${Math.abs(mouvement)}`);
  }
}*/
const displayMouvements = function (mouvements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? mouvements.slice().sort((a, b) => a - b) : mouvements;
  movs.forEach(function (mouvement, i) {
    const type = mouvement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mouvement}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMouvements(account1.movements);
const createUsername = function (user) {
  const username = user
    .split(' ')
    .map(element => element[0])
    .join('');
  return username.toLowerCase();
};
const createUsernames = function (accs) {
  accs.forEach(function (account) {
    account.username = account.owner
      .split(' ')
      .map(element => element[0])
      .join('')
      .toLowerCase();
  });
};
/*const user = 'Steven Thomas Williams';
console.log(createUsername(user));
createUsernames(accounts);
console.log(accounts);*/
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
const balance = movements.reduce(function (acc, curr) {
  acc = acc + curr;
  return acc;
});
const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce((acc, current) => acc + current, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance}`;
};
const bal = calcPrintBalance(account1);
const julia = [5, 2, 4, 1, 15, 8, 3];
const kate = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHuman = function (dogs) {
  const human = dogs.map(function (dog, i) {
    if (dog <= 2) {
      return 2 * dog;
    } else {
      return 16 + dog * 2;
    }
  });
  const legit = human.filter(function (age) {
    return age >= 18;
  });
  const average =
    legit.reduce(function (acc, current) {
      return acc + current;
    }) / legit.length;
  console.log(human);
  console.log(legit);
  console.log(average);
};
const totalDeposits = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * 1.1;
  })
  .reduce((acc, mov) => acc + mov, 0);
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}`;
  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interest) / 100)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = interest;
};
//Event handlers
createUsernames(accounts);
console.log(accounts);
const updateUI = function (acc) {
  // desplay movements
  displayMouvements(acc.movements);
  //display balance
  calcPrintBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and message
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear fields
    inputCloseUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAccount);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});
//createUsernames(accounts);
btnLoan.addEventListener('click', function (e) {
  console.log(currentAccount.movements);
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  /*currentAccount = accounts.find(acc => acc.username === inputCloseUsername);*/
  if (
    Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMouvements(currentAccount.movements, true);
});
console.log(1000n + 1000n);
const huge = 13545631083515151364510351n;
const regular = 23;
console.log(huge * BigInt(regular));
