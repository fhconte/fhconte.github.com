"use strict";

App.directive("ngEnter",function  () {
	return function  (scope,elem) {
		$(elem).keyup(function  (e) {
			// Código do enter > 13
			if (e.keyCode === 13) {
				/* Também atualiza o Cycle do AngularJS */
				scope.$apply(function  () {
					scope.addTodo(); // todos addTodo definidos dentro da controller
				});
			}
		});
	};
});