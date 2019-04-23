/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/emailThreads              ->  index
 * POST    /api/emailThreads              ->  create
 * GET     /api/emailThreads/:id          ->  show
 * PUT     /api/emailThreads/:id          ->  upsert
 * PATCH   /api/emailThreads/:id          ->  patch
 * DELETE  /api/emailThreads/:id          ->  destroy
 */

'use strict';

import { EmailRecipient } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function index(req, res, next) {
  try {
    return res.sendStatus(200);
  } catch(err) {
    return next(err);
  }
}
