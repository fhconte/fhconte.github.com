/*!
** TODO CRUD COM ANGULARJS
** BY FLAVIO DE HOLANDA
** (deholanda.com.br)
**/
"use strict";

var App = angular.module("todo", ["ui.sortable", "LocalStorageModule"]);

App.controller("TodoCtrl", function ($scope, localStorageService) {

	// CRIA LISTA INICIAL
	$scope.init = function () {

		if (!localStorageService.get("todoList")) {
			$scope.model = [
				{
					name: "Lista To Do 1", list: [
						{ taskName: "Uma tarefa a ser executada 1", isDone: false },
						{ taskName: "Tarefa a ser executada 2", isDone: true },
						{ taskName: "Uma tarefa 3", isDone: false }
					]
				},
				{
					name: "To Do 2", list: [
						{ taskName: "Outra tarefa a ser executada 4", isDone: true },
						{ taskName: "Uma outra tarefa 5", isDone: false },
					]
				}
			];
		} else {
			$scope.model = localStorageService.get("todoList");
		}
		$scope.show = "All";
		$scope.currentShow = 0;
	};

	// FUNÇÃO DE ADICIONAR ITEM
	$scope.addTodo = function () {
		/*Prepend na array*/
		$scope.model[$scope.currentShow].list.splice(0, 0, {taskName: $scope.newTodo, isDone: false });
		/*Reseta o campo*/
		$scope.newTodo = "";
	};

	// FUNÇÃO DE DELETAR ITEM
	$scope.deleteTodo = function (item) {
		var index = $scope.model[$scope.currentShow].list.indexOf(item);
		$scope.model[$scope.currentShow].list.splice(index, 1);
	};

	// FUNÇÃO DE EDITAR ORDEM
	$scope.todoSortable = {
		containment: "parent", // Não deixa o usuário levar para fora da área
		cursor: "move", // Mudar o ícone do cursor ao arrastar
		tolerance: "pointer"// http://api.jqueryui.com/sortable/#option-tolerance
	};

	$scope.changeTodo = function (i) {
		$scope.currentShow = i;
	};

	// FILTROS: Todos | A Fazer | Finalizado
	$scope.showFn = function (todo) {
		if ($scope.show === "All") {
			return true;
		} else if (todo.isDone && $scope.show === "Complete") {
			return true;
		} else if (!todo.isDone && $scope.show === "Incomplete") {
			return true;
		} else {
			return false;
		}
	};

	// localStorageService
	$scope.$watch("model",function (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.add("todoList",angular.toJson(newVal));
		}
	},true);

});