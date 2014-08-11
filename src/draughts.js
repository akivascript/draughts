(function () {
	'use strict';

	var _ = require ('underscore-contrib');

	function createBoard () {
		var board = _.repeat (8);

		_.each (board, function (el, idx, arr) {
			board [idx] = _.repeat (8, 0);
		});

		return board;
	}

	module.exports.createBoard = createBoard;
} ());
