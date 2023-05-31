// SELECTORS
const $game = document.querySelector('#game');
const $btn = document.querySelector('#btn');
const $gameSize = document.querySelector('#gameSize');
const $select = document.querySelector('select');
const $winnerBox = document.querySelector('.winnerBox');
const $container = document.querySelector('.container');
const $winner = document.querySelector('#winner');
const $drawBox = document.querySelector('.drawBox');
const $audioWin = document.querySelector('#audioWin');
const $audioClick = document.querySelector('#audioClick');
let flag = true;
 
// EVENTS
$btn.addEventListener('click', startGameFunction);
$gameSize.addEventListener('change', createFieldFunction);
$game.addEventListener('click', drawSimbols);


{
	$game.innerHTML = '';
	let num = +$select.value;
	gameZone(num);
}

// FUNCTIONS
function createFieldFunction(event) {
	$game.innerHTML = '';
	let num = +event.target.value;
	gameZone(num);
}

function startGameFunction(event) {
	event.preventDefault();
	$game.innerHTML = '';
	gameZone(+$select.value);
}

function gameZone(num) {
	for (let i = 0; i < num; i++) {
		let $row = document.createElement('div');
		$row.classList.add('row');
		for (let j = 0; j < num; j++) {
			let $item = document.createElement('div');
			$item.classList.add('item');
			$row.append($item);
		}
		$game.append($row);
	}
}

function drawSimbols(event) {
	if (event.target.className == 'item' && event.target.innerHTML == '') {
		event.target.innerHTML = flag ? 'X' : 'O';
		$audioClick.play();
	}
	//event.target.setAttribute('disabled', 'true');   // this don't work
	flag = !flag;

	checkWinner();
}

function checkWinner() {

	let $items = document.querySelectorAll('.item');
	let arrItems = [];

	for (let i = 0, k = 0; i < +$select.value; i++) {
		arrItems.push([]);

		for (let j = 0; j < +$select.value; j++, k++) {
			arrItems[i].push($items[k].innerHTML);
		}
	}

	for (let i = 0; i < arrItems.length; i++) {       // հորիզոնական տողի համար
		if (checker(arrItems[i])) return;
	}

	for (let i = 0; i < arrItems.length; i++) {
		let arr = [];
		for (let j = 0; j < arrItems.length; j++) {
			arr.push(arrItems[j][i]);          // ուղղահայաց սյան համար
		}
		if (checker(arr)) return;
	}

	{
		let arr = [];
		for (let i = 0; i < arrItems.length; i++) {
			for (let j = 0; j < arrItems.length; j++) {
				if (i == j) arr.push(arrItems[i][j]);   //first diagonal
			}
		}
		if (checker(arr)) return;
	}

	{
		let arr = [];
		for (let i = 0; i < arrItems.length; i++) {
			for (let j = arrItems.length - 1 - i; j >= 0; j--) {
				arr.push(arrItems[i][j]);                  //second diagonal
				break;
			}
		}
		if (checker(arr)) return;
	}

	drawCase(arrItems);
}

function checker(arr) {
	if (!arr.every(elem => elem !== '')) return false;

	if (arr.every(elem => elem === 'X')) {
		locationReload();

		$winnerBox.style.display = 'flex';
		$winner.textContent = ' X ';
		$container.style.opacity = '0.2';
		$audioWin.play();
		return true;
	}

	if (arr.every(elem => elem === 'O')) {
		locationReload();

		$winnerBox.style.display = 'flex';
		$winner.textContent = ' O ';
		$container.style.opacity = '0.2';
		$audioWin.play();
		return true;
	}
}

function drawCase(arr) {
	let flag = true;
	label:
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (arr[i][j] == '') {
				flag = false;
				break label;
			}
		}
	}
	if (flag) {
		$drawBox.style.display = 'flex';
		$container.style.opacity = '0.2';
		locationReload();
	}
}

function locationReload() {
	setTimeout(function () {
		location.reload();
	}, 4000);
}


