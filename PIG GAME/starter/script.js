'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//aktivan igrac
const aktivan = document.querySelector('.player--active');

//trenutni skor Prvog igraca:
const current0 = document.querySelector('#current--0');

//trenutni skor Drugog igraca:
const current1 = document.querySelector('#current--1');

//prvi nacin pristupanju IDja
const score0 = document.querySelector('#score--0');
//drugi nacin pristupanju IDja
const score1 = document.getElementById('score--1');
//pristupanje kocki
const kocka = document.querySelector('.dice');

//roll kocka dugme
const rollKocka = document.querySelector('.btn--roll');

//new game dugme
const newGameButton = document.querySelector('.btn--new');

//hold dugme
const holdDugme = document.querySelector('.btn--hold');

//postavljanje inicijalnih vrednosti
score0.textContent = 0;
score1.textContent = 0;
//skrivanje kocke
kocka.classList.add('hidden');

//user baca kockicu

let trenutniSkor = 0;
let aktivniIgrac = 0;
const scores = [0, 0];

//ROLL DICE DUGME!!!
const bacanjeKockice = function () {
  const broj = Math.trunc(Math.random() * 6) + 1;

  if (broj !== 1) {
    trenutniSkor += broj;
    document.getElementById(`current--${aktivniIgrac}`).textContent =
      trenutniSkor;
    pobeda();
  } else {
    //moramo da resetujemo trenutni skor na 0
    trenutniSkor = 0;

    //current score aktvnog igraca se postavlja na 0
    document.getElementById(`current--${aktivniIgrac}`).textContent = 0;

    //ako je aktivni igrac bio 0, onda promeni na 1, u suprotnom promeni na 0
    promenaIgraca();
  }

  kocka.classList.remove('hidden');
  kocka.src = `dice-${broj}.png`;
};
document.querySelector('.btn--roll').addEventListener('click', bacanjeKockice);

//user holduje trenutni skor

const holdovanje = function () {
  trenutniSkor = 0;
  document.getElementById(`score--${aktivniIgrac}`).textContent =
    Number(document.getElementById(`score--${aktivniIgrac}`).textContent) +
    Number(document.getElementById(`current--${aktivniIgrac}`).textContent);

  document.getElementById(`current--${aktivniIgrac}`).textContent = 0;
  pobeda();
  promenaIgraca();
};

document.querySelector('.btn--hold').addEventListener('click', holdovanje);

//user resetuje igru

const newGame = function () {
  document.querySelector(
    '.game-title'
  ).textContent = `Welcome to the Pig game, First to 30 wins! 🐷`;
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  document.querySelector('.player--active').textContent;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

document.querySelector('.btn--new').addEventListener('click', newGame);

//promena igraca
const promenaIgraca = function () {
  aktivniIgrac = aktivniIgrac === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//pobednik
const pobeda = function () {
  let totalniSkorTrenutnog = document.getElementById(
    `score--${aktivniIgrac}`
  ).textContent;
  if (totalniSkorTrenutnog >= 30) {
    if (aktivniIgrac === 0) {
      document.querySelector(`.player--0`).classList.add('player--winner');
      document.querySelector(`.player--0`).classList.remove('player--active');
      document.querySelector(
        '.game-title'
      ).textContent = `Congratulations, Player 1 has won the game! 🏆`;
      kocka.classList.add('hidden');
    } else {
      document.querySelector(`.player--1`).classList.add('player--winner');
      document.querySelector(`.player--1`).classList.remove('player--active');
      document.querySelector(
        '.game-title'
      ).textContent = `Congratulations, Player 2 has won the game! 🏆`;
      kocka.classList.add('hidden');
    }
  }
};
