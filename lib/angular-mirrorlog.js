/* Copyright 2014 Alex Soncodi <asoncodi@gmail.com> */

(function(angular) {
  'use strict';

  var m = angular.module('angular-mirrorlog', []);

  m.provider('mirrorlog.svc', ['$provide', function($provide) {
    var fnAppend = null;

    $provide.decorator('$log', function($delegate) {
      ['log', 'info', 'warn', 'error', 'debug']
        .forEach(function(lvl) {
          var oldFn = $delegate[lvl];

          $delegate[lvl] = function() {
            oldFn.apply(null, arguments);

            if (fnAppend) {
              fnAppend.apply(null, arguments);
            }
          };
        });

      return $delegate;
    });

    return {
      $get: function() {
        return {
          hookAppend: function(fn) {
            fnAppend = fn;
          }
        };
      }
    };
  }]);

  m.directive('mirrorlog', ['mirrorlog.svc', function(logger) {
    return {
      restrict: 'AE',
      replace: true,
      template: '<div></div>',
      link: function(scope, ele) {
        logger.hookAppend(function() {
          ele.append([
            '<div>', JSON.stringify(arguments, null, 2), '</div>'
          ].join(''));
        });
      }
    };
  }]);

})(window.angular);
