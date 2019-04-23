/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/threads              ->  index
 * POST    /api/threads              ->  create
 * GET     /api/threads/:id          ->  show
 * PUT     /api/threads/:id          ->  upsert
 * PATCH   /api/threads/:id          ->  patch
 * DELETE  /api/threads/:id          ->  destroy
 */

'use strict';

import { Thread } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function index(req, res, next) {
  try {
    return res.sendStatus(200);
  } catch(err) {
    return next(err);
  }
}
