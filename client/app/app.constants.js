'use strict';

import angular from 'angular';

export default angular.module('c3App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
