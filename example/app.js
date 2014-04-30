(function(angular) {
  'use strict';

  var m = angular.module('app', ['angular-mirrorlog']);

  m.run(function($timeout, $log) {
    var obj = {
      message: 'a message'
    };

    $log.log('log message', obj);
    $log.info('info message', obj);
    $log.warn('warning message', obj);
    $log.error('error message', obj);

    $timeout(function() {
      $log.log('log message', obj);
      $log.info('info message', obj);
      $log.warn('warning message', obj);
      $log.error('error message', obj);
    });
  });

})(window.angular);
