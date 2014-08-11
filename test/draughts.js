(function () {
	'use strict';

	var expect = require ('chai').expect;
	var draughts = require ('../src/draughts.js');
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
		});
	});
} ());	
