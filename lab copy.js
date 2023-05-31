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
let res = [];
let i, j;

 
// EVENTS
$btn.addEventListener('click', startGameFunction);
$gameSize.addEventListener('change', createFieldFunction);
$game.addEventListener('click', drawSimbols);

startGameFunction();

// FUNCTIONS
function createFieldFunction(event) {
	$game.innerHTML = '';
	let num = +event.target.value;
	gameZone(num);
}

function startGameFunction() {
	$game.innerHTML = '';
	gameZone(+$select.value);
}

function gameZone(num) {
	for (let i = 0; i < num; i++) {
		let $row = document.createElement('div');
		$row.classList.add('row');
		res[i] = [];

		for (let j = 0; j < num; j++) {
			let $item = document.createElement('div');
			$item.classList.add('item');
			$item.setAttribute('data-val', i + '-' + j);
			res[i][j] = '';
			$row.append($item);
		}
		$game.append($row);
	}

}

function drawSimbols(event) {
	if (event.target.dataset.val) {
		let index = event.target.dataset.val.split('-'); // [1, 2]
		i = +index[0];
		j = +index[1];
		res[i][j] = 'X';
		if (event.target.textContent == '') event.target.textContent = 'X';
		else return;

		if (checkWinner()) return;

		setTimeout(() => {
			if (res[i]?.[j + 1] === '') {
				document.querySelector(`[data-val = "${i}-${j + 1}"]`).textContent = 'O';
				res[i][j + 1] = 'O';
				j = j + 1;
			}
			else if (res[i + 1]?.[j] === '') {
				document.querySelector(`[data-val = "${i + 1}-${j}"]`).textContent = 'O';
				res[i + 1][j] = 'O';
				i = i + 1;
			}
			else if (res[i]?.[j - 1] === '') {
				document.querySelector(`[data-val = "${i}-${j - 1}"]`).textContent = 'O';
				res[i][j - 1] = 'O';
				j = j - 1;
			}
			else if (res[i - 1]?.[j] === '') {
				document.querySelector(`[data-val = "${i - 1}-${j}"]`).textContent = 'O';
				res[i - 1][j] = 'O';
				i=i-1;
			}
			else if (res[i - 1]?.[j - 1] === '') {
				document.querySelector(`[data-val = "${i - 1}-${j - 1}"]`).textContent = 'O';
				res[i - 1][j - 1] = 'O';
				i = i - 1;
				j=j-1;
			}
			else if (res[i + 1]?.[j + 1] === '') {
				document.querySelector(`[data-val = "${i + 1}-${j + 1}"]`).textContent = 'O';
				res[i + 1][j + 1] = 'O';
				i = i + 1;
				j = j + 1;
			}
			else random();

			checkWinner();
		}, 500);
		$audioClick.play();
	}
	
}

function random() {	
	for (let m = 0; m < res.length; m++) {
		for (let k = 0; k < res.length; k++) {
			if (res[m][k] === '') {
				document.querySelector(`[data-val = "${m}-${k}"]`).textContent = 'O';
				i = m;
				j = k;
				res[m][k] = 'O'; 
				return;
			}
		}
	}
}

function checkWinner(){

	if(checker(res[i])) {
		win(checker(res[i]));
		return true;
	}

	{
		let arr = [];
		for(let i = 0; i< res.length; i++){
			arr.push(res[i][j]);
		}
		if(checker(arr)) {
			win(checker(arr));
			return true;
		}
	}

	{                                   // ankyunagic glxavor
		let arr = [];
		let k = i;
		let m = j;
		while (k >= 0) {
			arr[k] = res[k]?.[m];
			k--;
			m--;
		}
		k = i;
		m = j;

		while (m < res.length) {
			arr[k] = res[k]?.[m];
			k++;
			m++;
		}

		if (checker(arr)) {
			win(checker(arr));
			return true;
		}
	}

	{                                   // ankyunagic erkrordakan
		let arr = [];
		let k = i;
		let m = j;
		while (m < res.length) {
			arr[k] = res[k]?.[m];
			k--;
			m++;
		}
		k = i;
		m = j;
		while (k < res.length) {
			arr[k] = res[k]?.[m];
			k++;
			m--;
		}

		if (checker(arr)) {
			win(checker(arr));
			return true;
		}
	}

	drawCase(res);

}

function checker(arr) {
	let count = 1;
	let maxCount = 1;
	let winner;
	for (let k = 0; k < arr.length; k++) {
		if (arr[k] === arr[k + 1] && arr[k] !== '') {
			count++;
		}
		else if (count > maxCount) {
			maxCount = count;
			winner = arr[k - 1];
			count = 1;
		}
		else count = 1;
	}
	console.log(res[i]);
	if(+$select.value <=5) return maxCount >= 3 ? winner : false;
	else return maxCount >= 5 ? winner : false;
}



function win(content) {
	$winnerBox.style.display = 'flex';
	$winner.textContent = content;
	$container.style.opacity = '0.2';
	$audioWin.play();
	locationReload();
	return true;
}

function drawCase(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length; j++) {
			if (arr[i][j] == '') {
				return false;
			}
		}
	}
	$drawBox.style.display = 'flex';
	$container.style.opacity = '0.2';
	locationReload();
	return true;
}

function locationReload() {
	setTimeout(function () {
		location.reload();
	}, 4000);
}


