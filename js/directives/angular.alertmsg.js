App.directive('alertmsg', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    controller: ['$scope', function ($scope) {
      $scope.alertmsg = {
        status: 'hide',
        type: 'success',
        message: 'Item excluído com sucesso!'
      };
    }],
    link: function(scope, element, attrs) {
      // assistindo por mudanças
      attrs.$observe('alertmsg', function (value) {
        if (value === 'show') {
          // mostra mensagem
          $(element).show();
          // e após segundos
          $timeout(function () {
            // esconde mensagem
            $(element).hide();
            // e atualiza o status da propriedade
            scope.alertmsg.status = 'hide';
          }, 2500);
        }
      });
    }
  };
}]);