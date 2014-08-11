(function () {
	'use strict';

	var _ = require ('underscore-contrib');
	var player1rows = [5, 6, 7];
	var player2rows = [0, 1, 2];

	// ---- Board Functions ----------------------------------------------------------
	function createBoard () {
		var board = _.repeat (8);

		_.each (board, function (el, idx, arr) {
			board [idx] = _.repeat (8, 0);
		});

		return board;
	}

	function setupBoard (board) {
		var b = board;
		var setupPieces = function (row) {
			var col = 0;

			if (isEven (row)) {
				for (col = 1; col < 8; col = col + 2) {
					if (isOdd (col)) { placePiece (b, player, row, col); }
				}
			} else {
				for (col = 0; col < 8; col = col + 2) {
					if (isEven (col)) { placePiece (b, player, row, col); }
				}
			}
		};

		var player = 1;
		_.each(player1rows, setupPieces);

		player =2;
		_.each(player2rows, setupPieces);

		return b;
	}

	function placePiece (board, player, row, col) {
		var b = board;
		var size = board.length;

		if (!isLegalSpace (b, row, col)) {
			throw new Error ('The destination space [' + row + '][' + col + '] ' +
											 'is beyond the boundaries of the board size of ' +
											 size + 'x' + size + '.');
		}

		b [row][col] = player;

		return b;
	}

	function isLegalSpace (board, row, col) {
		var size = board.length;

		if (row >= 0 && row < size &&
				col >= 0 && col < size) {
			return true;
		}

		return false;
	}

	// ---- Utility Functions --------------------------------------------------------
	function isEven (num) {
		return num % 2 === 0;
	}

	function isOdd (num) {
		return !isEven (num);
	}

	// ---- Exports ------------------------------------------------------------------
	module.exports.createBoard = createBoard;
	module.exports.setupBoard = setupBoard;
} ());
