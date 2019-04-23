/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/attachments              ->  index
 * POST    /api/attachments              ->  create
 * GET     /api/attachments/:id          ->  show
 * PUT     /api/attachments/:id          ->  upsert
 * PATCH   /api/attachments/:id          ->  patch
 * DELETE  /api/attachments/:id          ->  destroy
 */

'use strict';

import { Attachment } from '../../conn/sqldb';

// Gets a single Thing from the DB
export function index(req, res, next) {
  try {
    return res.sendStatus(200);
  } catch(err) {
    return next(err);
  }
}
