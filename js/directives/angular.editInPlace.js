App.directive( 'editInPlace', function() {
  return {
    restrict: 'E',
    scope: { value: '=' },
    template: '<span class="todoName" ng-dblclick="edit()" ng-bind="value"></span><input class="todoField" ng-model="value"></input>',
    link: function ( $scope, element, attrs ) {
      // Pegando uma referência ao elemento input, pois precisaremos referenciar ele
      var inputElement = angular.element( element.children()[1] );

      // Adiciona classe para estilizar
      element.addClass( 'edit-in-place' );

      // Inicialmente não será editável
      $scope.editing = false;

      // ng-dblclick handler para ativar edit-in-place
      $scope.edit = function () {
        $scope.editing = true;

        // Controlamos através desta classe a edição (CSS)
        element.addClass( 'active' );

        // E nós precisamos focar o elemento
        // `angular.element()` disponibiliza uma array acessível, como o jQuery então podemos acessar funções nativas do DOM,
        // nós precisamos referencias o primeiro elemento na array
        inputElement.focus();
      };

      // Quando nós deixamos o input, finalizamos a edição
      inputElement.on("blur",function  () {
        $scope.editing = false;
        element.removeClass( 'active' );
      });
    }
  };
});