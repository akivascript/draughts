(function () {
	'use strict';

	var _ = require ('lodash-contrib');
	var player1 = 1;
	var player1rows = [5, 6, 7];
	var player2 = 2;
	var player2rows = [0, 1, 2];

	// ---- Board Functions ----------------------------------------------------------
	function createBoard () {
		return _.map (_.repeat (8), function () { return _.repeat (8, 0); });
	}

	function setupBoard (board) {
		var col;
		var player;
		var setupPieces = function (row) {
			if (isEven (row)) {
				col = 1;
			} else {
				col = 0;
			}

			var f = _.partial (placePiece, board, player, row);

			return _.map (_.range (col, 8, 2), function (c) { f (c); });
		};

		player = 1;
		_.each (player1rows, setupPieces);

		player = 2;
		_.each (player2rows, setupPieces);

		return board;
	}

	function placePiece (board, player, row, col) {
		var size = board.length;

		if (!isLegalSpace (board, row, col)) {
			throw new Error ('The destination space [' + row + '][' + col + '] ' +
											 'is beyond the boundaries of the board size of ' +
											 size + 'x' + size + '.');
		}

		board [row][col] = player;

		return board;
	}

	function removePiece (board, row, col) {
		board [row][col] = 0;
		
		return board;
	}

	function examineSpace (board, row, col) {
		return board [row][col];
	}

	function isLegalSpace (board, row, col) {
		var size = board.length;

		if (row >= 0 && row < size &&
				col >= 0 && col < size) {
			return true;
		}

		return false;
	}

	// ---- Player Functions ---------------------------------------------------------
	function movePiece (board, player, row, col) {
		var dir;
		var startSpace;
		var destRow;
		var destSpace;

		if (player === player1) { dir = -1; } else { dir = 1; }

		startSpace = examineSpace (board, row, col);
		destRow = row + dir;
		
		if (startSpace !== player) {
			throw new Error ('Player ' + player + ' does not have a piece at [' +
											 row + '][' + col + ']');
		}

		if (!isLegalSpace (board, destRow, col)) {
			throw new Error ('Player ' + player + ' attempted to move a piece off ' +
											 'the board to [' + destRow + '][' + col + ']');
		}

		destSpace = examineSpace (board, destRow, col);

		if (destSpace !== 0) {
			throw new Error ('The destination space [' + destRow + '][' + col + 
											 '] is already occupied.');
		}

		board = removePiece (board, row, col);
		board = placePiece (board, player, destRow, col);
		
		return board;
	}

	function jumpPiece (board, player, row, col, dir) {
		var destRow;
		var destCol;
		var jumpRow;
		var jumpCol;
		var jumpSpace;
		var size;

		if (player === player1) {
			jumpRow = row - 1;
			destRow = row - 2;

			if (dir === 'left') {
				jumpCol = col - 1;
				destCol = col - 2;
			} else {
				jumpCol = col + 1;
				destCol = col + 2; }
		} else {
			jumpRow = row + 1;
			destRow = row + 2;

			if (dir === 'left') {
				jumpCol = col + 1;
				destCol = col + 2;
			} else {
				jumpCol = col - 1;
				destCol = col - 2;
			}
		}

		if (!isLegalSpace (board, destRow, destCol)) {
			size = board.length;
			
			throw new Error ('The destination space [' + destRow + '][' + destCol +
											 '] is beyond the boundaries of the board size of ' +
											 size + 'x' + size);
		}

		jumpSpace = examineSpace (board, jumpRow, jumpCol);

		if ((player === player1 && jumpSpace !== player2) ||
				(player === player2 && jumpSpace !== player1)) {
			throw new Error ('Player ' + player + ' attempted to jump from [' + row +
											 '][' + col + '] to [' + destRow + '][' + destCol +
											 '] when there was no opponent piece to jump over at [' +
											 jumpRow + '][' + jumpCol + ']');
		}

		board = removePiece (board, row, col);
		board = removePiece (board, jumpRow, jumpCol);
		board = placePiece (board, player, destRow, destCol);

		return board;
	}

	// ---- Utility Functions --------------------------------------------------------
	function isEven (num) {
		return num % 2 === 0;
	}

//	function isOdd (num) {
//		return !isEven (num);
//	}

	// ---- Exports ------------------------------------------------------------------
	module.exports.createBoard = createBoard;
	module.exports.setupBoard = setupBoard;
	module.exports.movePiece = movePiece;
	module.exports.placePiece = placePiece;
	module.exports.jumpPiece = jumpPiece;
} ());
