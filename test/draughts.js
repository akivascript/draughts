(function () {
	'use strict';

	var _ = require ('underscore-contrib');
	var expect = require ('chai').expect;
	var draughts = require ('../src/draughts.js');
	var player1 = 1;
	var player1rows = [5, 6, 7];
	var player2 = 2;
	var player2rows = [0, 1, 2];
	var board;

	// -------------------------------------------------------------------------------
	describe ('draughts', function () {
		beforeEach (function () {
			board = draughts.createBoard ();
		});

	// -------------------------------------------------------------------------------
		describe ('board', function () {
			it ('should be 8x8', function () {
				expect (board, 'The board isn\'t 8 columns in width').to.have.length (8);
				expect (board [0], 'The board isn\'t 8 rows in height').to.have.length (8);
			});
		
	// -------------------------------------------------------------------------------
			it ('should set up board properly', function () {
				board = draughts.setupBoard (board);

				var walkBoard = function (player, row) {
					var col;
					var currSpace;
					var res = true;

					for (col = 0; col < 8; col++) {
						currSpace = examineSpace (board, row, col);

						if (isEven (row) &&
								((isOdd (col) && currSpace === player) ||
								 (isEven (col) && currSpace === 0))) {
							continue;
						} else if (isOdd (row) &&
											 ((isEven (col) && currSpace === player) ||
												(isOdd (col) && currSpace === 0))) {
							continue;
						} else {
							res = false;

							break;
						}
					}

					return res;
				};

				var p1res = _.reduce(player1rows, function (res, row) {
					return walkBoard (player1, row); }, true);
				var p2res = _.reduce(player2rows, function (res, row) {
					return walkBoard (player2, row); }, true);

				expect (p1res, 'Player 1\'s pieces are not set up properly').to.be.true;
				expect (p2res, 'Player 2\'s pieces are not set up properly').to.be.true;
			});
		});
	});

	// ---- Utility functions --------------------------------------------------------
	function isEven (num) {
		return num % 2 === 0;
	}

	function isOdd (num) {
		return !(isEven (num));
	}

	function examineSpace (board, row, col) {
		return board [row][col];
	}
} ());	
