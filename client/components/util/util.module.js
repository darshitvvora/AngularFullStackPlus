'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('c3App.util', [])
  .factory('Util', UtilService)
  .name;
