(function () {
	'use strict';

	var paths = {
		js: ['*.js', 'src/*.js', 'test/*.js']
	};

	module.exports = function (grunt) {
		require ('load-grunt-tasks') (grunt);

		grunt.registerTask ('default', ['jshint', 'mochacli']);
		grunt.registerTask ('test', ['env:test', 'jshint', 'mochacli']);

		grunt.initConfig ({
			pkg: grunt.file.readJSON ('package.json'),
			watch: {
				js: {
					files: paths.js,
					tasks: ['jshint'],
					options: {
						livereload: true
					}
				}
			},
			jshint: {
				all: {
					src: paths.js,
					options: {
						jshintrc: true
					}
				}
			},
			mochacli: {
				options: {
					reporter: 'spec',
					bail: true
				},
				all: ['test/*.js']
			},
			env: {
				test: {
					NODE_ENV: 'test'
				}
			}
		});
	};
} ());
